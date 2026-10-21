"""Dropping the redundant subsection type preserves content and relationships."""

import importlib.util
import io
from pathlib import Path
import unittest

from alembic.migration import MigrationContext
from alembic.operations import Operations
import sqlalchemy as sa


def load_migration():
    path = Path(__file__).resolve().parents[1] / "migrations/versions/e3b8c29f714a_drop_subsection_type.py"
    spec = importlib.util.spec_from_file_location("subsection_type_migration", path)
    migration = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(migration)
    return migration


class SubsectionTypeMigrationTest(unittest.TestCase):
    def test_upgrade_and_downgrade_preserve_content_and_relationships(self):
        engine = sa.create_engine("sqlite:///:memory:")
        self.addCleanup(engine.dispose)
        with engine.begin() as connection:
            connection.exec_driver_sql("CREATE TABLE sections (id INTEGER PRIMARY KEY, type TEXT NOT NULL)")
            connection.exec_driver_sql("""CREATE TABLE subsections (
                id INTEGER PRIMARY KEY, section_id INTEGER NOT NULL REFERENCES sections(id),
                type TEXT NOT NULL, label TEXT, position INTEGER NOT NULL, styling JSON, layout JSON
            )""")
            connection.exec_driver_sql("""CREATE TABLE fields (
                id INTEGER PRIMARY KEY, subsection_id INTEGER NOT NULL REFERENCES subsections(id), value JSON
            )""")
            connection.exec_driver_sql("INSERT INTO sections VALUES (1, 'workHistory'), (2, 'custom')")
            connection.exec_driver_sql("""INSERT INTO subsections VALUES
                (3, 1, 'default', 'First job', 0, '{"color":"red"}', '{}'),
                (4, 2, 'defaultSection', 'Notes', 1, '{}', '{"display":"grid"}')
            """)
            connection.exec_driver_sql("""INSERT INTO fields VALUES
                (5, 3, '[{"children":[{"text":"Keep content"}]}]'), (6, 4, '[]')
            """)
            columns = "id, section_id, label, position, styling, layout"
            before = connection.exec_driver_sql(f"SELECT {columns} FROM subsections ORDER BY id").all()
            fields_before = connection.exec_driver_sql("SELECT * FROM fields ORDER BY id").all()
            migration = load_migration()

            with Operations.context(MigrationContext.configure(connection)):
                migration.upgrade()
                self.assertNotIn("type", {c["name"] for c in sa.inspect(connection).get_columns("subsections")})
                self.assertEqual(connection.exec_driver_sql(f"SELECT {columns} FROM subsections ORDER BY id").all(), before)
                self.assertEqual(connection.exec_driver_sql("SELECT * FROM fields ORDER BY id").all(), fields_before)
                self.assertEqual(connection.exec_driver_sql("PRAGMA foreign_key_check").all(), [])

                # A rollback derives the redundant values from the current parent types.
                migration.downgrade()
                restored = {c["name"]: c for c in sa.inspect(connection).get_columns("subsections")}
                self.assertFalse(restored["type"]["nullable"])
                self.assertIsNone(restored["type"]["default"])
                self.assertEqual(connection.exec_driver_sql("SELECT type FROM subsections ORDER BY id").all(),
                                 [("workHistory",), ("custom",)])
                self.assertEqual(connection.exec_driver_sql(f"SELECT {columns} FROM subsections ORDER BY id").all(), before)
                self.assertEqual(connection.exec_driver_sql("SELECT * FROM fields ORDER BY id").all(), fields_before)
                self.assertEqual(connection.exec_driver_sql("PRAGMA foreign_key_check").all(), [])
                self.assertEqual(sa.inspect(connection).get_foreign_keys("fields")[0]["referred_table"], "subsections")
                migration.upgrade()

    def test_postgresql_upgrade_drops_only_the_column_in_place(self):
        output = io.StringIO()
        with Operations.context(MigrationContext.configure(
            dialect_name="postgresql", opts={"as_sql": True, "output_buffer": output},
        )):
            load_migration().upgrade()
        self.assertEqual(output.getvalue().strip(), "ALTER TABLE subsections DROP COLUMN type;")

    def test_postgresql_downgrade_backfills_before_restoring_not_null(self):
        output = io.StringIO()
        with Operations.context(MigrationContext.configure(
            dialect_name="postgresql", opts={"as_sql": True, "output_buffer": output},
        )):
            load_migration().downgrade()
        sql = output.getvalue()
        self.assertIn("ADD COLUMN type VARCHAR", sql)
        self.assertLess(sql.index("ADD COLUMN"), sql.index("UPDATE subsections"))
        self.assertLess(sql.index("UPDATE subsections"), sql.index("ALTER COLUMN type SET NOT NULL"))
        self.assertNotIn("DROP TABLE", sql)
