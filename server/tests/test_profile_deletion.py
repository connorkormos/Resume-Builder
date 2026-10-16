"""Deleting profile sections and subsections removes only the intended tree."""

import os
from pathlib import Path
import sys
import unittest

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app, db
from models import Profile, Profile_Field, Profile_Section, Profile_Subsection, User


class ProfileDeletionTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add_all([
            User(id=1, first_name="Owner", email="owner@example.test", password_hash="unused"),
            User(id=2, first_name="Other", email="other@example.test", password_hash="unused"),
        ])
        profile = Profile(user_id=1, title="Career")
        self.sections = []
        self.subsections = []
        self.fields = []
        for section_type in ("workHistory", "education"):
            section = Profile_Section(profile=profile, type=section_type, label=section_type)
            self.sections.append(section)
            for number in range(2):
                subsection = Profile_Subsection(profile_section=section, position=number)
                self.subsections.append(subsection)
                field = Profile_Field(profile_subsection=subsection, label="Description", value=f"{section_type}-{number}")
                self.fields.append(field)
        db.session.add(profile)
        db.session.commit()
        self.section_ids = [section.id for section in self.sections]
        self.subsection_ids = [subsection.id for subsection in self.subsections]
        self.field_ids = [field.id for field in self.fields]
        self.client = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def login(self, user_id=1):
        with self.client.session_transaction() as client_session:
            client_session["user_id"] = user_id

    def test_delete_subsection_removes_its_fields_only(self):
        self.login()
        response = self.client.delete(
            f"/profiles/sections/{self.section_ids[0]}/subsections/{self.subsection_ids[0]}"
        )
        self.assertEqual(response.status_code, 204)
        self.assertIsNone(db.session.get(Profile_Subsection, self.subsection_ids[0]))
        self.assertIsNone(db.session.get(Profile_Field, self.field_ids[0]))
        self.assertIsNotNone(db.session.get(Profile_Subsection, self.subsection_ids[1]))
        self.assertIsNotNone(db.session.get(Profile_Field, self.field_ids[1]))
        self.assertEqual(Profile_Section.query.count(), 2)

    def test_delete_section_removes_its_subsections_and_fields_only(self):
        self.login()
        response = self.client.delete(f"/profiles/sections/{self.section_ids[0]}")
        self.assertEqual(response.status_code, 204)
        self.assertIsNone(db.session.get(Profile_Section, self.section_ids[0]))
        for subsection_id, field_id in zip(self.subsection_ids[:2], self.field_ids[:2]):
            self.assertIsNone(db.session.get(Profile_Subsection, subsection_id))
            self.assertIsNone(db.session.get(Profile_Field, field_id))
        self.assertIsNotNone(db.session.get(Profile_Section, self.section_ids[1]))
        self.assertEqual(Profile_Subsection.query.count(), 2)
        self.assertEqual(Profile_Field.query.count(), 2)
        self.assertEqual(Profile.query.count(), 1)

    def test_deletes_require_owner_and_correct_parent(self):
        section_url = f"/profiles/sections/{self.section_ids[0]}"
        subsection_url = f"/profiles/sections/{self.section_ids[0]}/subsections/{self.subsection_ids[0]}"
        for url in (section_url, subsection_url):
            self.assertEqual(self.client.delete(url).status_code, 401)
        self.login(2)
        for url in (section_url, subsection_url):
            self.assertEqual(self.client.delete(url).status_code, 404)
        self.login()
        wrong_parent_url = f"/profiles/sections/{self.section_ids[1]}/subsections/{self.subsection_ids[0]}"
        self.assertEqual(self.client.delete(wrong_parent_url).status_code, 404)
        self.assertEqual(Profile_Section.query.count(), 2)
        self.assertEqual(Profile_Subsection.query.count(), 4)
        self.assertEqual(Profile_Field.query.count(), 4)


if __name__ == "__main__":
    unittest.main()
