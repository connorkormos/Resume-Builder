"""Custom section types stay stable on save; label-based classification is explicit."""

from copy import deepcopy
import os
from pathlib import Path
import sys
import unittest

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app, db
from models import Container, Field, Resume, Section, Subsection, User
from services.resume_updater import normalize_generic_section_types, update_resume_with_form_data


class ResumeSectionTypeNormalizationTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        user = User(first_name="Owner", email="owner@example.test", password_hash="unused")
        self.resume = Resume(user=user, title="Test", containers=[Container(position=0)])
        db.session.add(self.resume)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def section(self, section_type, label, position=0, container=None):
        section = Section(
            container=container or self.resume.containers[0], type=section_type, label=label,
            position=position, styling={"color": "purple"}, layout={"display": "grid"},
            value=[{"type": "heading", "children": [{"text": "Keep heading"}]}],
        )
        for index in range(2):
            subsection = Subsection(
                section=section, position=index,
                label=f"Keep subsection {index}", styling={"fontSizeOffset": 2},
            )
            Field(
                subsection=subsection, label="Keep field", position=0,
                value=[{"type": "paragraph", "children": [{"text": "Keep content", "bold": True}]}],
            )
        db.session.add(section)
        db.session.commit()
        return section

    def payload(self):
        data = {key: {"byId": {}} for key in ("containers", "sections", "subsections", "fields")}
        for container in self.resume.containers:
            data["containers"]["byId"][str(container.id)] = container.to_dict()
            for section in container.sections:
                data["sections"]["byId"][str(section.id)] = section.to_dict()
                for subsection in section.subsections:
                    data["subsections"]["byId"][str(subsection.id)] = subsection.to_dict()
                    for field in subsection.fields:
                        data["fields"]["byId"][str(field.id)] = field.to_dict()
        return deepcopy(data)

    def save(self, data=None):
        update_resume_with_form_data(self.resume.id, data if data is not None else self.payload())
        db.session.commit()
        db.session.expire_all()

    def normalize(self):
        normalize_generic_section_types(self.resume.id)
        db.session.commit()
        db.session.expire_all()

    def test_save_preserves_custom_type_when_label_matches_a_specialized_type(self):
        section = self.section("custom", "Notes")
        before = deepcopy(section.to_dict())
        data = self.payload()
        data["sections"]["byId"][str(section.id)]["label"] = "Skills"
        self.save(data)
        self.assertEqual(section.type, "custom")
        self.assertEqual(section.label, "Skills")
        self.assertEqual(section.to_dict()["subsections"], before["subsections"])
        self.save()
        self.assertEqual(section.type, "custom")

    def test_save_preserves_multiple_custom_sections_with_matching_labels(self):
        first = self.section("custom", "Skills", position=0)
        second = self.section("custom", "Skills", position=1)
        self.save()
        self.assertEqual([first.type, second.type], ["custom", "custom"])

    def test_explicit_normalization_converts_custom_labels_and_preserves_content(self):
        for source_type, label, target_type in (
            ("custom", " SKILLS ", "skills"),
            ("custom", "HeAdEr", "header"),
            ("custom", " W o r k-HiStOrY! 123\t\n", "workHistory"),
        ):
            with self.subTest(source_type=source_type):
                section = self.section(source_type, label)
                before = deepcopy(section.to_dict())
                self.normalize()
                after = section.to_dict()
                self.assertEqual(after["type"], target_type)
                for attribute in ("id", "label", "value", "styling", "layout", "position"):
                    self.assertEqual(after[attribute], before[attribute])
                for old, new in zip(before["subsections"], after["subsections"]):
                    self.assertEqual(new, old)
        self.save()
        self.assertEqual(Section.query.count(), 3)
        self.assertEqual(Field.query.count(), 6)

    def test_existing_type_in_another_container_blocks_explicit_conversion_ignoring_case(self):
        generic = self.section("custom", "Skills")
        container = Container(resume=self.resume, position=1)
        db.session.add(container)
        db.session.commit()
        self.section("SKILLS", "Existing", container=container)
        self.normalize()
        self.assertEqual(generic.type, "custom")

    def test_explicit_normalization_only_assigns_type_to_first_custom_section_in_display_order(self):
        later = self.section("custom", "Skills", position=1)
        first = self.section("custom", "Skills", position=0)
        self.normalize()
        self.assertEqual(first.type, "skills")
        self.assertEqual(later.type, "custom")

    def test_normalized_existing_type_blocks_conversion(self):
        generic = self.section("custom", "Work_History!")
        self.section("Work History!", "Existing", position=1)
        self.normalize()
        self.assertEqual(generic.type, "custom")

    def test_conflict_check_uses_incoming_types_and_labels(self):
        generic = self.section("custom", "Notes")
        existing = self.section("education", "Existing", position=1)
        data = self.payload()
        data["sections"]["byId"][str(generic.id)]["label"] = "Skills"
        data["sections"]["byId"][str(existing.id)]["type"] = "skills"
        self.save(data)
        self.normalize()
        self.assertEqual(generic.type, "custom")
        self.assertEqual(existing.type, "skills")

    def test_explicit_normalization_ignores_deleted_sections(self):
        existing = self.section("skills", "Existing")
        generic = self.section("custom", "Skills", position=1)
        data = self.payload()
        del data["sections"]["byId"][str(existing.id)]
        for subsection in existing.subsections:
            del data["subsections"]["byId"][str(subsection.id)]
            for field in subsection.fields:
                del data["fields"]["byId"][str(field.id)]
        self.save(data)
        self.assertEqual(generic.type, "custom")
        self.normalize()
        self.assertEqual(generic.type, "skills")
        self.assertEqual(Section.query.count(), 1)

    def test_moved_subsection_uses_final_parent(self):
        target = self.section("skills", "Skills")
        other = self.section("custom", "Notes", position=1)
        moved = other.subsections[0]
        data = self.payload()
        data["subsections"]["byId"][str(moved.id)]["sectionId"] = target.id
        self.save(data)
        self.assertEqual(moved.section_id, target.id)
        self.assertEqual(moved.section.type, "skills")

    def test_legacy_subsection_type_in_save_payload_is_ignored(self):
        section = self.section("custom", "Notes")
        data = self.payload()
        for subsection in data["subsections"]["byId"].values():
            subsection["type"] = "workHistory"
        self.save(data)
        for subsection in section.subsections:
            self.assertFalse(hasattr(subsection, "type"))
            self.assertNotIn("type", subsection.to_dict())
            self.assertEqual(subsection.section.type, "custom")

    def test_unknown_labels_and_nongeneric_sections_stay_unchanged(self):
        cases = [
            self.section("custom", "Other"),
            self.section("custom", None, position=1),
            self.section("summary", "Skills", position=2),
            self.section("custom", "123 !@#", position=3),
        ]
        self.normalize()
        self.assertEqual([section.type for section in cases], ["custom", "custom", "summary", "custom"])

    def test_type_used_in_another_resume_does_not_block_conversion(self):
        generic = self.section("custom", "Skills")
        other_resume = Resume(user_id=self.resume.user_id, title="Other", containers=[Container(position=0)])
        db.session.add(other_resume)
        db.session.commit()
        self.section("skills", "Skills", container=other_resume.containers[0])
        self.normalize()
        self.assertEqual(generic.type, "skills")


if __name__ == "__main__":
    unittest.main()
