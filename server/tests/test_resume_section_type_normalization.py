"""Saving a resume resolves generic section types using the final saved hierarchy."""

from copy import deepcopy
import os
from pathlib import Path
import sys
import unittest

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app, db
from models import Column, Field, Resume, Section, Subsection, User
from services.resume_updater import update_resume_with_form_data


class ResumeSectionTypeNormalizationTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        user = User(first_name="Owner", email="owner@example.test", password_hash="unused")
        self.resume = Resume(user=user, title="Test", columns=[Column(position=0)])
        db.session.add(self.resume)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def section(self, section_type, label, position=0, column=None):
        section = Section(
            column=column or self.resume.columns[0], type=section_type, label=label,
            position=position, styling={"color": "purple"}, layout={"display": "grid"},
            value=[{"type": "heading", "children": [{"text": "Keep heading"}]}],
        )
        for index in range(2):
            subsection = Subsection(
                section=section, type=section_type, position=index,
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
        data = {key: {"byId": {}} for key in ("columns", "sections", "subsections", "fields")}
        for column in self.resume.columns:
            data["columns"]["byId"][str(column.id)] = column.to_dict()
            for section in column.sections:
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

    def test_generic_variants_convert_and_preserve_content(self):
        for source_type, label, target_type in (
            ("defaultSection", " SKILLS ", "skills"),
            ("default", "HeAdEr", "header"),
            ("custom", " W o r k-HiStOrY! 123\t\n", "workHistory"),
        ):
            with self.subTest(source_type=source_type):
                section = self.section(source_type, label)
                before = deepcopy(section.to_dict())
                self.save()
                after = section.to_dict()
                self.assertEqual(after["type"], target_type)
                for attribute in ("id", "label", "value", "styling", "layout", "position"):
                    self.assertEqual(after[attribute], before[attribute])
                for old, new in zip(before["subsections"], after["subsections"]):
                    self.assertEqual(new["type"], target_type)
                    for attribute in ("id", "label", "position", "styling", "layout", "fields"):
                        self.assertEqual(new[attribute], old[attribute])
        self.save()
        self.assertEqual(Section.query.count(), 3)
        self.assertEqual(Field.query.count(), 6)

    def test_existing_type_in_another_column_blocks_conversion_ignoring_case(self):
        generic = self.section("custom", "Skills")
        column = Column(resume=self.resume, position=1)
        db.session.add(column)
        db.session.commit()
        self.section("SKILLS", "Existing", column=column)
        self.save()
        self.assertEqual(generic.type, "custom")
        self.assertTrue(all(sub.type == "custom" for sub in generic.subsections))

    def test_only_first_generic_section_in_display_order_claims_type(self):
        later = self.section("defaultSection", "Skills", position=1)
        first = self.section("custom", "Skills", position=0)
        self.save()
        self.assertEqual(first.type, "skills")
        self.assertEqual(later.type, "defaultSection")

    def test_normalized_existing_type_blocks_conversion(self):
        generic = self.section("defaultSection", "Work_History!")
        self.section("Work History!", "Existing", position=1)
        self.save()
        self.assertEqual(generic.type, "defaultSection")
        self.assertTrue(all(sub.type == "defaultSection" for sub in generic.subsections))

    def test_conflict_check_uses_incoming_types_and_labels(self):
        generic = self.section("defaultSection", "Notes")
        existing = self.section("education", "Existing", position=1)
        data = self.payload()
        data["sections"]["byId"][str(generic.id)]["label"] = "Skills"
        data["sections"]["byId"][str(existing.id)]["type"] = "skills"
        self.save(data)
        self.assertEqual(generic.type, "defaultSection")
        self.assertEqual(existing.type, "skills")

    def test_deleted_section_does_not_reserve_type(self):
        existing = self.section("skills", "Existing")
        generic = self.section("defaultSection", "Skills", position=1)
        data = self.payload()
        del data["sections"]["byId"][str(existing.id)]
        for subsection in existing.subsections:
            del data["subsections"]["byId"][str(subsection.id)]
            for field in subsection.fields:
                del data["fields"]["byId"][str(field.id)]
        self.save(data)
        self.assertEqual(generic.type, "skills")
        self.assertEqual(Section.query.count(), 1)

    def test_moved_subsection_uses_final_parent_type(self):
        generic = self.section("defaultSection", "Skills")
        other = self.section("custom", "Notes", position=1)
        moved = other.subsections[0]
        data = self.payload()
        data["subsections"]["byId"][str(moved.id)]["sectionId"] = generic.id
        self.save(data)
        self.assertEqual(moved.section_id, generic.id)
        self.assertEqual(moved.type, "skills")

    def test_unknown_labels_and_nongeneric_sections_stay_unchanged(self):
        cases = [
            self.section("defaultSection", "Other"),
            self.section("custom", None, position=1),
            self.section("summary", "Skills", position=2),
            self.section("default", "123 !@#", position=3),
        ]
        self.save()
        self.assertEqual([section.type for section in cases], ["defaultSection", "custom", "summary", "default"])

    def test_type_used_in_another_resume_does_not_block_conversion(self):
        generic = self.section("defaultSection", "Skills")
        other_resume = Resume(user_id=self.resume.user_id, title="Other", columns=[Column(position=0)])
        db.session.add(other_resume)
        db.session.commit()
        self.section("skills", "Skills", column=other_resume.columns[0])
        self.save()
        self.assertEqual(generic.type, "skills")


if __name__ == "__main__":
    unittest.main()
