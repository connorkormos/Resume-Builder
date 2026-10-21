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
            section = resume["containers"][0]["sections"][0]
            self.assertFalse(section["showHeading"])
            self.assertEqual(section["layout"], {"display": "grid", "grid": {"columns": 2}})

            added = self.client.post(f'/sections/{resume["id"]}', json={"type": "header"})
            self.assertEqual(added.status_code, 201)
            self.assertNotIn("section", added.json)
            direct = self.client.post(f'/subsections/{section["id"]}')
            self.assertEqual(direct.status_code, 201)
            for subsection in (section["subsections"][0], added.json["subsection"], direct.json):
                self.assertNotIn("type", subsection)
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

    def test_copy_preserves_subsections_and_fields_without_subsection_type(self):
        created = self.client.post("/resumes", json={
            "title": "Original", "sections": {"workHistory": True},
        })
        self.assertEqual(created.status_code, 201)
        original = created.json["containers"][0]["sections"][0]
        response = self.client.post(f'/resumes/{created.json["id"]}/copy')
        self.assertEqual(response.status_code, 200)
        copied = response.json["containers"][0]["sections"][0]
        self.assertEqual(copied["type"], "workHistory")
        self.assertNotEqual(copied["id"], original["id"])
        source_subsection = original["subsections"][0]
        copied_subsection = copied["subsections"][0]
        self.assertNotIn("type", copied_subsection)
        self.assertNotEqual(copied_subsection["id"], source_subsection["id"])
        self.assertEqual(copied_subsection["sectionId"], copied["id"])
        self.assertEqual(len(copied_subsection["fields"]), len(source_subsection["fields"]))
        for source_field, copied_field in zip(source_subsection["fields"], copied_subsection["fields"]):
            self.assertNotEqual(copied_field["id"], source_field["id"])
            self.assertEqual(copied_field["subsectionId"], copied_subsection["id"])
            for key in ("label", "value", "styling", "layout", "position"):
                self.assertEqual(copied_field[key], source_field[key])

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
