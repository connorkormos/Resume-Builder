"""Run with: python -m unittest discover -s server/tests -v"""
from copy import deepcopy
import os
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app import app, db
from models import Section, User
from lib.defaults import SECTION_DEFAULTS, SECTION_DEFINITIONS, get_section_definition


class SectionDefaultsTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add(User(id=1, first_name="Owner", email="owner@example.com", password_hash="unused"))
        db.session.commit()
        self.client = app.test_client()
        with self.client.session_transaction() as session:
            session["user_id"] = 1

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def test_type_overrides_apply_to_new_resumes_and_incremental_additions(self):
        header = {
            **SECTION_DEFINITIONS["header"],
            "showHeading": False,
            "layout": {"grid": {"columns": 2}},
            "subsection": {"styling": {"color": "red"}},
            "field": {"layout": {"grid": {"fillRow": True}}},
        }
        with patch.dict(SECTION_DEFINITIONS, {"header": header}):
            response = self.client.post("/resumes", json={"title": "New", "sections": {"header": True}})
            self.assertEqual(response.status_code, 201)
            resume = response.json
            section = resume["columns"][0]["sections"][0]
            self.assertFalse(section["showHeading"])
            self.assertEqual(section["layout"], {"display": "grid", "grid": {"columns": 2}})

            added = self.client.post(f'/sections/{resume["id"]}', json={"type": "header"})
            self.assertEqual(added.status_code, 201)
            self.assertNotIn("section", added.json)
            direct = self.client.post(f'/subsections/{section["id"]}')
            self.assertEqual(direct.status_code, 201)
            for subsection in (section["subsections"][0], added.json["subsection"], direct.json):
                self.assertEqual(subsection["styling"], {
                    "fontSizeOffset": 0, "lineHeightOffset": 0, "color": "red",
                })
                self.assertEqual([field["label"] for field in subsection["fields"]], ["Name", "Title"])
                for field in subsection["fields"]:
                    self.assertEqual(field["layout"], {"grid": {"fillRow": True}})

            field = self.client.post(f'/fields/{direct.json["id"]}')
            self.assertEqual(field.status_code, 201)
            self.assertEqual(field.json["layout"], {"grid": {"fillRow": True}})

            stored = db.session.get(Section, section["id"])
            fields = stored.subsections[0].fields
            fields[0].layout["grid"]["fillRow"] = False
            self.assertTrue(fields[1].layout["grid"]["fillRow"])
            self.assertTrue(SECTION_DEFINITIONS["header"]["field"]["layout"]["grid"]["fillRow"])

    def test_resolved_definitions_are_independent_and_preserve_unknown_type_fallback(self):
        before = deepcopy(SECTION_DEFAULTS)
        first = get_section_definition("header")
        first["layout"]["grid"]["columns"] = 5
        first["fields"].append("Extra")
        second = get_section_definition("header")
        self.assertEqual(second["layout"]["grid"]["columns"], 1)
        self.assertEqual(second["fields"], ["Name", "Title"])
        self.assertEqual(SECTION_DEFAULTS, before)
        unknown = get_section_definition("unknownType")
        self.assertEqual(unknown["label"], "Unknown Type")
        self.assertEqual(unknown["heading"], "New Section")
        self.assertEqual(unknown["fields"], ["Field"])
