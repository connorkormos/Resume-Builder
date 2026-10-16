"""Copying a profile preserves its content and gives every row a new ID."""

import os
from pathlib import Path
import sys
import unittest

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app, db
from models import User, Profile, Profile_Section, Profile_Subsection, Profile_Field


class ProfileCopyTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add_all([
            User(id=1, first_name="Owner", email="owner@example.test", password_hash="unused"),
            User(id=2, first_name="Other", email="other@example.test", password_hash="unused"),
        ])
        source = Profile(user_id=1, title="Career")
        for section_position, section_type in enumerate(("contact", "workhistory")):
            section = Profile_Section(
                profile=source, type=section_type, label=section_type.title(),
                position=section_position,
            )
            for subsection_position in range(2):
                subsection = Profile_Subsection(
                    profile_section=section, position=subsection_position,
                )
                for field_position, label in enumerate(("Name", "Description")):
                    Profile_Field(
                        profile_subsection=subsection, label=label,
                        value=f"{section_type}-{subsection_position}-{label}",
                        position=field_position,
                    )
        db.session.add(source)
        db.session.commit()
        self.source_id = source.id
        self.client = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def login(self, user_id):
        with self.client.session_transaction() as client_session:
            client_session["user_id"] = user_id

    def test_copy_preserves_hierarchy_with_new_ids(self):
        self.login(1)
        response = self.client.post(f"/profiles/{self.source_id}/copy")
        self.assertEqual(response.status_code, 201)
        source = self.client.get(f"/profiles/{self.source_id}").json
        copied = response.json
        self.assertEqual(copied["title"], "Career (Copy)")
        self.assertEqual(copied["userId"], 1)
        self.assertNotEqual(copied["id"], source["id"])

        self.assertEqual(len(copied["sections"]), len(source["sections"]))
        for old_section, new_section in zip(source["sections"], copied["sections"]):
            self.assertNotEqual(old_section["id"], new_section["id"])
            self.assertEqual(new_section["profileId"], copied["id"])
            for attribute in ("type", "label", "position"):
                self.assertEqual(new_section[attribute], old_section[attribute])
            self.assertEqual(len(new_section["subsections"]), len(old_section["subsections"]))
            for old_subsection, new_subsection in zip(old_section["subsections"], new_section["subsections"]):
                self.assertNotEqual(old_subsection["id"], new_subsection["id"])
                self.assertEqual(new_subsection["profileSectionId"], new_section["id"])
                self.assertEqual(new_subsection["position"], old_subsection["position"])
                self.assertEqual(len(new_subsection["fields"]), len(old_subsection["fields"]))
                for old_field, new_field in zip(old_subsection["fields"], new_subsection["fields"]):
                    self.assertNotEqual(old_field["id"], new_field["id"])
                    self.assertEqual(new_field["profileSubsectionId"], new_subsection["id"])
                    for attribute in ("label", "value", "position"):
                        self.assertEqual(new_field[attribute], old_field[attribute])

        self.assertEqual(Profile.query.count(), 2)
        self.assertEqual(Profile_Section.query.count(), 4)
        self.assertEqual(Profile_Subsection.query.count(), 8)
        self.assertEqual(Profile_Field.query.count(), 16)
        self.assertEqual(source["title"], "Career")

    def test_copy_requires_owner(self):
        response = self.client.post(f"/profiles/{self.source_id}/copy")
        self.assertEqual(response.status_code, 401)
        self.login(2)
        response = self.client.post(f"/profiles/{self.source_id}/copy")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(Profile.query.count(), 1)


if __name__ == "__main__":
    unittest.main()
