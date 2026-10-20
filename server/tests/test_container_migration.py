"""Run with: python -m unittest discover -s server/tests -v"""
import importlib.util
import io
import os
from pathlib import Path
import sys
import unittest

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from alembic.migration import MigrationContext
from alembic.operations import Operations
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.schema import CreateTable

from app import app, db
from models import Container, Resume, Section, User
from services.builders import build_resume_copy


def load_migration():
    path = Path(__file__).resolve().parents[1] / "migrations/versions/75c8a91de204_rename_columns_to_containers.py"
    spec = importlib.util.spec_from_file_location("container_migration", path)
    migration = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(migration)
    return migration


class ContainerMigrationTest(unittest.TestCase):
    def test_upgrade_defaults_and_downgrade_preserve_content_and_foreign_keys(self):
        migration = load_migration()
        engine = sa.create_engine("sqlite:///:memory:")
        with engine.begin() as connection:
            connection.exec_driver_sql("PRAGMA foreign_keys = ON")
            connection.exec_driver_sql("CREATE TABLE resumes (id INTEGER PRIMARY KEY)")
            connection.exec_driver_sql("""CREATE TABLE columns (
                id INTEGER PRIMARY KEY, resume_id INTEGER NOT NULL REFERENCES resumes(id),
                position INTEGER NOT NULL, styling JSON NOT NULL, layout JSON NOT NULL
            )""")
            connection.exec_driver_sql("""CREATE TABLE sections (
                id INTEGER PRIMARY KEY, column_id INTEGER NOT NULL REFERENCES columns(id),
                label TEXT NOT NULL
            )""")
            connection.exec_driver_sql("INSERT INTO resumes VALUES (1)")
            connection.exec_driver_sql("""INSERT INTO columns VALUES
                (7, 1, 0, '{"color":"red"}', '{"width":{"value":"30%"}}'),
                (9, 1, 1, '{}', '{"width":{"value":"70%"}}')""")
            connection.exec_driver_sql("INSERT INTO sections VALUES (11, 7, 'Experience')")
            before = connection.exec_driver_sql("SELECT * FROM columns ORDER BY id").all()

            with Operations.context(MigrationContext.configure(connection)):
                migration.upgrade()
                self.assertNotIn("columns", sa.inspect(connection).get_table_names())
                self.assertEqual(connection.exec_driver_sql(
                    "SELECT id, resume_id, position, styling, layout FROM containers ORDER BY id"
                ).all(), before)
                self.assertEqual(connection.exec_driver_sql(
                    "SELECT type, span_full_page FROM containers ORDER BY id"
                ).all(), [("column", 0), ("column", 0)])
                self.assertEqual(sa.inspect(connection).get_foreign_keys("sections")[0]["referred_table"], "containers")
                connection.exec_driver_sql("INSERT INTO sections VALUES (12, 9, 'Skills')")
                connection.exec_driver_sql("""INSERT INTO containers
                    (id, resume_id, position, styling, layout) VALUES (13, 1, 2, '{}', '{}')""")
                self.assertEqual(connection.exec_driver_sql(
                    "SELECT type, span_full_page FROM containers WHERE id = 13"
                ).one(), ("column", 0))
                fields = {field["name"]: field for field in sa.inspect(connection).get_columns("containers")}
                self.assertFalse(fields["type"]["nullable"])
                self.assertFalse(fields["span_full_page"]["nullable"])
                self.assertIsNone(fields["type"]["type"].length)
                migration.downgrade()

            self.assertNotIn("containers", sa.inspect(connection).get_table_names())
            self.assertEqual(connection.exec_driver_sql("SELECT * FROM columns WHERE id IN (7, 9) ORDER BY id").all(), before)
            self.assertEqual(connection.exec_driver_sql("SELECT * FROM sections ORDER BY id").all(),
                             [(11, 7, "Experience"), (12, 9, "Skills")])
            self.assertEqual(sa.inspect(connection).get_foreign_keys("sections")[0]["referred_table"], "columns")
            self.assertEqual(connection.exec_driver_sql("PRAGMA foreign_key_check").all(), [])
        engine.dispose()

    def test_postgresql_ddl_renames_in_place_and_uses_unrestricted_string(self):
        output = io.StringIO()
        with Operations.context(MigrationContext.configure(
            dialect_name="postgresql", opts={"as_sql": True, "output_buffer": output},
        )):
            load_migration().upgrade()
        sql = output.getvalue()
        self.assertIn("ALTER TABLE columns RENAME TO containers", sql)
        self.assertIn("ADD COLUMN type VARCHAR DEFAULT 'column' NOT NULL", sql)
        self.assertIn("ADD COLUMN span_full_page BOOLEAN DEFAULT false NOT NULL", sql)
        self.assertNotIn("DROP TABLE", sql)
        self.assertNotIn("CREATE TABLE", sql)
        model_sql = str(CreateTable(Container.__table__).compile(dialect=postgresql.dialect()))
        self.assertIn("type VARCHAR DEFAULT 'column' NOT NULL", model_sql)


class ContainerModelTest(unittest.TestCase):
    def setUp(self):
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add(User(id=1, first_name="Owner", email="owner@example.com", password_hash="unused"))
        db.session.flush()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def test_existing_relationships_and_api_work_with_new_defaults(self):
        resume = Resume(user_id=1, title="Resume")
        container = Container(resume=resume)
        section = Section(container=container, label="Experience")
        db.session.add_all([resume, container, section])
        db.session.flush()
        self.assertEqual(container.type, "column")
        self.assertFalse(container.span_full_page)
        self.assertEqual(section.container_id, container.id)
        serialized = resume.to_dict()["containers"][0]
        self.assertEqual(serialized["type"], "column")
        self.assertFalse(serialized["spanFullPage"])
        self.assertEqual(serialized["sections"][0]["containerId"], container.id)
        self.assertIn("containers", sa.inspect(db.engine).get_table_names())
        self.assertNotIn("containers", sa.inspect(db.engine).get_table_names())

    def test_copy_preserves_container_type_and_span(self):
        resume = Resume(user_id=1, title="Resume")
        container = Container(resume=resume, type="row", span_full_page=True)
        db.session.add_all([resume, container])
        db.session.flush()
        copied = build_resume_copy(resume.id, user_id=1)
        self.assertNotEqual(copied.containers[0].id, container.id)
        self.assertEqual(copied.containers[0].type, "row")
        self.assertTrue(copied.containers[0].span_full_page)
