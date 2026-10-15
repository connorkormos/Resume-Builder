"""Profile creation must persist complete section trees in one transaction."""

import os
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

from sqlalchemy.exc import SQLAlchemyError

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app, db
from lib.defaults import SECTION_DEFINITIONS
from models import Profile, Profile_Field, Profile_Section, Profile_Subsection, User
from routes.Profile_Routes.profile_builders import (
    add_profile_field,
    add_profile_section,
    add_profile_subsection,
)


class ProfileBuildersTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        user = User(first_name="Owner", email="owner@example.test", password_hash="unused")
        self.profile = Profile(user=user, title="Test profile")
        db.session.add(self.profile)
        db.session.commit()
        self.client = app.test_client()
        with self.client.session_transaction() as session:
            session["user_id"] = user.id

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def add_section(self, section_type):
        return self.client.post(
            f"/profiles/sections/{self.profile.id}", json={"type": section_type}
        )

    def test_each_definition_creates_one_subsection_with_persisted_default_fields(self):
        for position, (section_type, definition) in enumerate(SECTION_DEFINITIONS.items()):
            with self.subTest(section_type=section_type):
                response = self.add_section(section_type)
                self.assertEqual(response.status_code, 201)
                section = response.json
                self.assertEqual(section["profileId"], self.profile.id)
                self.assertEqual(section["type"], section_type)
                self.assertEqual(section["label"], definition["label"])
                self.assertEqual(section["position"], position)
                self.assertEqual(len(section["subsections"]), 1)
                subsection = section["subsections"][0]
                self.assertEqual(subsection["profileSectionId"], section["id"])
                self.assertEqual(subsection["position"], 0)
                fields = subsection["fields"]
                self.assertEqual([field["label"] for field in fields], definition["fields"])
                self.assertEqual([field["position"] for field in fields], list(range(len(fields))))
                for field in fields:
                    self.assertEqual(field["profileSubsectionId"], subsection["id"])
                    self.assertEqual(field["value"], "")
                    self.assertIsNotNone(db.session.get(Profile_Field, field["id"]))
                db.session.expire_all()
                stored = db.session.get(Profile_Section, section["id"])
                self.assertEqual(stored.to_dict(include_subsections=True), section)

    def test_builders_support_more_subsections_and_fields(self):
        section = add_profile_section(self.profile, "header")
        subsection = add_profile_subsection(section)
        field = add_profile_field(subsection, "Extra", value="Example")
        db.session.commit()
        db.session.expire_all()
        self.assertEqual([item.position for item in section.subsections], [0, 1])
        self.assertEqual([item.label for item in subsection.fields], ["Name", "Title", "Extra"])
        self.assertEqual(field.position, 2)
        self.assertEqual(field.value, "Example")

    def test_new_section_appends_after_existing_position_gaps(self):
        section = add_profile_section(self.profile, "header")
        section.position = 7
        db.session.commit()
        response = self.add_section("skills")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json["position"], 8)

    def test_duplicate_and_invalid_types_do_not_create_children(self):
        self.assertEqual(self.add_section("header").status_code, 201)
        counts = (Profile_Section.query.count(), Profile_Subsection.query.count(), Profile_Field.query.count())
        for section_type, code in [("header", "SECTION_ALREADY_EXISTS"), ("unknown", "INVALID_SECTION_TYPE")]:
            response = self.add_section(section_type)
            self.assertEqual(response.status_code, 400)
            self.assertEqual(response.json["error"]["code"], code)
            self.assertEqual(
                (Profile_Section.query.count(), Profile_Subsection.query.count(), Profile_Field.query.count()),
                counts,
            )

    def test_failed_commit_rolls_back_entire_tree(self):
        real_flush = db.session.flush

        def fail_after_flush():
            real_flush()
            raise SQLAlchemyError("Simulated commit failure")

        with patch.object(db.session, "commit", side_effect=fail_after_flush):
            response = self.add_section("header")
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json["error"]["code"], "ERROR_ADDING_PROFILE_SECTION")
        self.assertEqual(Profile_Section.query.count(), 0)
        self.assertEqual(Profile_Subsection.query.count(), 0)
        self.assertEqual(Profile_Field.query.count(), 0)


if __name__ == "__main__":
    unittest.main()
