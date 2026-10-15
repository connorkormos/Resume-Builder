"""Profile access errors must stop writes and retain the JSON error contract."""
import os
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from flask import session
from werkzeug.exceptions import Forbidden, NotFound

from app import app, db
from models import User, Profile, Profile_Section, Profile_Subsection, Profile_Field
from server.routes.Profile_Routes.profile_routes import get_profile


class ProfileAccessTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add_all([
            User(id=1, first_name="Owner", email="owner@example.test", password_hash="unused"),
            User(id=2, first_name="Other", email="other@example.test", password_hash="unused"),
        ])
        self.profile = Profile(id=1, user_id=1, title="Backend")
        section = Profile_Section(profile=self.profile, type="header", label="Header")
        subsection = Profile_Subsection(profile_section=section)
        Profile_Field(profile_subsection=subsection, label="Name", value="Owner")
        db.session.add(self.profile)
        db.session.commit()
        self.client = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def login(self, user_id=1):
        with self.client.session_transaction() as client_session:
            client_session["user_id"] = user_id

    def test_helper_returns_profile_or_raises_http_error(self):
        with app.test_request_context():
            session["user_id"] = 1
            self.assertIs(get_profile(1), self.profile)
            with self.assertRaises(NotFound):
                get_profile(999)
            session["user_id"] = 2
            with self.assertRaises(Forbidden):
                get_profile(1)

    def test_anonymous_delete_stops_before_profile_lookup(self):
        with patch("routes.profile_routes.get_profile") as lookup:
            response = self.client.delete("/profiles/1")
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json["error"]["code"], "USER_NOT_LOGGED_IN")
        lookup.assert_not_called()

    def test_missing_profile_returns_json_without_attempting_write(self):
        self.login()
        with patch.object(db.session, "delete") as delete, patch.object(db.session, "commit") as commit:
            response = self.client.delete("/profiles/999")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json, {"error": {
            "type": "NOT_FOUND", "code": "PROFILE_NOT_FOUND", "message": "Profile not found.",
        }})
        delete.assert_not_called()
        commit.assert_not_called()

    def test_other_user_cannot_delete_profile(self):
        self.login(2)
        with patch.object(db.session, "delete") as delete, patch.object(db.session, "commit") as commit:
            response = self.client.delete("/profiles/1")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json, {"error": {
            "type": "FORBIDDEN", "code": "ACCESS_DENIED",
            "message": "User does not have access to this profile.",
        }})
        delete.assert_not_called()
        commit.assert_not_called()
        self.assertEqual(db.session.query(Profile_Field).count(), 1)

    def test_owner_can_delete_profile_and_descendants(self):
        self.login()
        response = self.client.delete("/profiles/1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["success"]["message"], "Profile deleted successfully.")
        for model in (Profile, Profile_Section, Profile_Subsection, Profile_Field):
            self.assertEqual(db.session.query(model).count(), 0)
        self.assertEqual(db.session.query(User).count(), 2)
