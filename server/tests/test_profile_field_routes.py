"""Batch field saves enforce profile ownership and persist atomically."""

import os
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlalchemy.exc import SQLAlchemyError

from app import app, db
from models import Profile, Profile_Field, User
from routes.Profile_Routes.profile_builders import add_profile_section


class ProfileFieldRoutesTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        owner = User(first_name="Owner", email="owner@example.test", password_hash="unused")
        other = User(first_name="Other", email="other@example.test", password_hash="unused")
        profiles = [Profile(user=user, title=str(i)) for i, user in enumerate([owner, owner, other])]
        db.session.add_all(profiles)
        self.fields = []
        for profile in profiles:
            section = add_profile_section(profile, "header")
            self.fields.extend(section.subsections[0].fields)
        for field in self.fields:
            field.value = "Original"
        db.session.commit()
        self.original = [field.to_dict() for field in self.fields]
        self.profile_id = profiles[0].id
        self.other_profile_id = profiles[2].id
        self.client = app.test_client()
        with self.client.session_transaction() as session:
            session["user_id"] = owner.id

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def save(self, fields, profile_id=None):
        return self.client.patch(
            f"/profiles/{profile_id or self.profile_id}/fields", json={"fields": fields}
        )

    def assert_unchanged(self):
        db.session.commit()
        db.session.expire_all()
        for original in self.original:
            self.assertEqual(db.session.get(Profile_Field, original["id"]).to_dict(), original)

    def test_saves_multiple_values_in_request_order_without_changing_metadata(self):
        changes = [
            {"id": self.fields[1].id, "value": "", "label": "Ignored"},
            {"id": self.fields[0].id, "value": "  Updated\ntext  ", "position": 99},
        ]
        response = self.save(changes)
        self.assertEqual(response.status_code, 200)
        self.assertEqual([field["id"] for field in response.json["fields"]], [item["id"] for item in changes])
        db.session.expire_all()
        for change in changes:
            field = db.session.get(Profile_Field, change["id"])
            self.assertEqual(field.value, change["value"])
            original = next(item for item in self.original if item["id"] == field.id)
            self.assertEqual(field.label, original["label"])
            self.assertEqual(field.position, original["position"])
            self.assertEqual(field.profile_subsection_id, original["profileSubsectionId"])
        self.assertEqual(self.fields[2].value, "Original")

    def test_fields_outside_target_profile_or_missing_reject_entire_batch(self):
        for field_id in [self.fields[2].id, self.fields[4].id, 99999]:
            with self.subTest(field_id=field_id):
                response = self.save([
                    {"id": self.fields[0].id, "value": "Should not save"},
                    {"id": field_id, "value": "Wrong profile"},
                ])
                self.assertEqual(response.status_code, 404)
                self.assertEqual(response.json["error"]["code"], "PROFILE_FIELD_NOT_FOUND")
                self.assert_unchanged()

    def test_invalid_entries_and_duplicates_reject_entire_batch(self):
        valid = {"id": self.fields[0].id, "value": "Should not save"}
        invalid_entries = [None, [], {}, valid, {"id": self.fields[1].id}]
        invalid_entries += [{"id": value, "value": "text"} for value in [True, "1", 0, -1, 1.5]]
        invalid_entries += [{"id": self.fields[1].id, "value": value} for value in [None, 1, False, [], {}]]
        for entry in invalid_entries:
            with self.subTest(entry=entry):
                response = self.save([valid, entry])
                self.assertEqual(response.status_code, 400)
                self.assertEqual(response.json["error"]["code"], "INVALID_FIELD_UPDATES")
                self.assert_unchanged()

    def test_invalid_request_bodies_return_json_errors(self):
        for body in ["{", "null", "[]", "{}", '{"fields": null}', '{"fields": {}}']:
            with self.subTest(body=body):
                response = self.client.patch(
                    f"/profiles/{self.profile_id}/fields", data=body, content_type="application/json"
                )
                self.assertEqual(response.status_code, 400)
                self.assertEqual(response.json["error"]["code"], "INVALID_FIELD_UPDATES")
        self.assert_unchanged()

    def test_profile_access_and_login_are_required(self):
        for profile_id in [self.other_profile_id, 99999]:
            self.assertEqual(self.save([], profile_id).status_code, 404)
        with self.client.session_transaction() as session:
            session.clear()
        response = self.save([{"id": self.fields[0].id, "value": "Unauthorized"}])
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json["error"]["code"], "USER_NOT_LOGGED_IN")
        self.assert_unchanged()

    def test_empty_batch_is_a_successful_no_op(self):
        response = self.save([])
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"fields": []})
        self.assert_unchanged()

    def test_database_failure_rolls_back_all_values(self):
        real_flush = db.session.flush

        def fail_after_flush():
            real_flush()
            raise SQLAlchemyError("Simulated failure")

        with patch.object(db.session, "commit", side_effect=fail_after_flush):
            response = self.save([
                {"id": field.id, "value": "Should roll back"} for field in self.fields[:2]
            ])
        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json["error"]["code"], "ERROR_UPDATING_PROFILE_FIELDS")
        self.assert_unchanged()


if __name__ == "__main__":
    unittest.main()
