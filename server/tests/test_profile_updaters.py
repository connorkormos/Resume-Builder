"""Profile field updates must enforce ownership before changing values."""

import os
from pathlib import Path
import sys
import unittest

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from flask import session
from werkzeug.exceptions import BadRequest, Forbidden, NotFound, Unauthorized

from app import app, db
from models import Profile, Profile_Field, User
from routes.Profile_Routes.profile_builders import add_profile_section
from routes.Profile_Routes.profile_updaters import update_profile_field


class ProfileUpdatersTest(unittest.TestCase):
    def setUp(self):
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        self.owner = User(first_name="Owner", email="owner@example.test", password_hash="unused")
        self.other_user = User(first_name="Other", email="other@example.test", password_hash="unused")
        self.profile = Profile(user=self.owner, title="Test profile")
        db.session.add_all([self.profile, self.other_user])
        section = add_profile_section(self.profile, "header")
        self.field = section.subsections[0].fields[0]
        self.field.value = "Original"
        db.session.commit()
        self.field_id = self.field.id

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def assert_value_unchanged(self):
        # Committing here catches unauthorized changes left pending in memory.
        db.session.commit()
        db.session.expire_all()
        self.assertEqual(db.session.get(Profile_Field, self.field_id).value, "Original")

    def test_owner_updates_only_value_and_can_clear_it(self):
        original = self.field.to_dict()
        with app.test_request_context():
            session["user_id"] = self.owner.id
            for value in ["Updated name", "", "  spaced text  "]:
                updated = update_profile_field(self.field_id, {
                    "value": value,
                    "label": "Changed label",
                    "position": 99,
                    "profileSubsectionId": 999,
                })
                self.assertIs(updated, self.field)
                self.assertEqual(updated.label, original["label"])
                self.assertEqual(updated.position, original["position"])
                self.assertEqual(updated.profile_subsection_id, original["profileSubsectionId"])
                db.session.commit()
                db.session.expire_all()
                self.assertEqual(db.session.get(Profile_Field, self.field_id).value, value)

    def test_other_user_cannot_update_even_with_owner_id_in_form_data(self):
        with app.test_request_context():
            session["user_id"] = self.other_user.id
            with self.assertRaises(Forbidden):
                update_profile_field(self.field_id, {
                    "value": "Unauthorized",
                    "user_id": self.owner.id,
                    "profileId": self.profile.id,
                })
        self.assert_value_unchanged()

    def test_anonymous_call_is_rejected_by_helper(self):
        with app.test_request_context():
            with self.assertRaises(Unauthorized):
                update_profile_field(self.field_id, {"value": "Unauthorized"})
        self.assert_value_unchanged()

    def test_missing_field_raises_not_found(self):
        with app.test_request_context():
            session["user_id"] = self.owner.id
            with self.assertRaises(NotFound):
                update_profile_field(self.field_id + 1000, {"value": "Updated"})
        self.assert_value_unchanged()

    def test_invalid_data_is_rejected_without_changing_value(self):
        invalid_data = [None, [], "text", {}, *({"value": value} for value in [None, [], {}, 0, False])]
        with app.test_request_context():
            session["user_id"] = self.owner.id
            for form_data in invalid_data:
                with self.subTest(form_data=form_data):
                    with self.assertRaises(BadRequest):
                        update_profile_field(self.field_id, form_data)
                    self.assert_value_unchanged()

    def test_helper_does_not_commit(self):
        with app.test_request_context():
            session["user_id"] = self.owner.id
            update_profile_field(self.field_id, {"value": "Temporary"})
            db.session.rollback()
        self.assert_value_unchanged()


if __name__ == "__main__":
    unittest.main()
