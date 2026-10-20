"""Container API and section foreign-key migration regression tests."""
import importlib.util
import os
from pathlib import Path
import sys
import unittest

os.environ['DATABASE_URL'] = 'sqlite:///:memory:'
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from alembic.migration import MigrationContext
from alembic.operations import Operations
import sqlalchemy as sa
from app import app, db
from models import User, Section
from services.builders import build_resume_copy


def normalize_for_save(resume):
    data = {key: resume[key] for key in ('title', 'layout', 'styling')}
    data.update({name: {'byId': {}} for name in ('containers', 'sections', 'subsections', 'fields')})
    for container in resume['containers']:
        data['containers']['byId'][str(container['id'])] = container
        for section in container['sections']:
            data['sections']['byId'][str(section['id'])] = section
            for subsection in section['subsections']:
                data['subsections']['byId'][str(subsection['id'])] = subsection
                for field in subsection['fields']:
                    data['fields']['byId'][str(field['id'])] = field
    return data


class ContainerApiTest(unittest.TestCase):
    def setUp(self):
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add(User(id=1, first_name='Owner', email='owner@example.com', password_hash='unused'))
        db.session.commit()
        self.client = app.test_client()
        with self.client.session_transaction() as session:
            session['user_id'] = 1

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def test_create_save_reload_copy_and_delete_use_container_names(self):
        created = self.client.post('/resumes', json={'title': 'Example', 'sections': {'header': True}})
        self.assertEqual(created.status_code, 201)
        resume = created.json
        self.assertNotIn('columns', resume)
        first = resume['containers'][0]
        self.assertEqual(first['type'], 'column')
        self.assertFalse(first['spanFullPage'])
        section = first['sections'][0]
        self.assertEqual(section['containerId'], first['id'])
        self.assertNotIn('columnId', section)
        self.assertEqual(self.client.post(f'/columns/{resume["id"]}').status_code, 404)

        added = self.client.post(f'/containers/{resume["id"]}', json={'type': 'row', 'spanFullPage': True})
        self.assertEqual(added.status_code, 201)
        second = added.json['containers'][-1]
        self.assertEqual(second['type'], 'row')
        self.assertTrue(second['spanFullPage'])
        updated = self.client.put(f'/containers/{second["id"]}', json={'type': 'column', 'spanFullPage': False})
        self.assertEqual(updated.status_code, 200)
        self.assertFalse(updated.json['containers'][-1]['spanFullPage'])

        data = normalize_for_save(updated.json)
        data['containers']['byId'][str(second['id'])].update(type='row', spanFullPage=True)
        data['sections']['byId'][str(section['id'])]['containerId'] = second['id']
        saved = self.client.put(f'/resumes/{resume["id"]}', json=data)
        self.assertEqual(saved.status_code, 200)
        loaded = self.client.get(f'/resumes/{resume["id"]}').json
        self.assertEqual(loaded['containers'][-1]['type'], 'row')
        self.assertTrue(loaded['containers'][-1]['spanFullPage'])
        self.assertEqual(loaded['containers'][-1]['sections'][0]['id'], section['id'])
        self.assertEqual(db.session.get(Section, section['id']).container_id, second['id'])
        copy = build_resume_copy(resume['id'], user_id=1)
        self.assertTrue(copy.containers[-1].span_full_page)
        self.assertEqual(copy.containers[-1].sections[0].container_id, copy.containers[-1].id)
        db.session.commit()

        deleted = self.client.delete(f'/containers/{resume["id"]}')
        self.assertEqual(deleted.status_code, 200)
        self.assertEqual(len(deleted.json['containers']), 1)
        self.assertEqual(deleted.json['containers'][0]['sections'][0]['containerId'], first['id'])


class SectionContainerMigrationTest(unittest.TestCase):
    def test_rename_and_rollback_preserve_links_and_content(self):
        path = Path(__file__).resolve().parents[1] / 'migrations/versions/a62d730be519_rename_section_container_id.py'
        spec = importlib.util.spec_from_file_location('section_container_migration', path)
        migration = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(migration)
        engine = sa.create_engine('sqlite:///:memory:')
        with engine.begin() as connection:
            connection.exec_driver_sql('PRAGMA foreign_keys = ON')
            connection.exec_driver_sql('CREATE TABLE containers (id INTEGER PRIMARY KEY)')
            connection.exec_driver_sql('CREATE TABLE sections (id INTEGER PRIMARY KEY, column_id INTEGER NOT NULL REFERENCES containers(id), label TEXT)')
            connection.exec_driver_sql('CREATE TABLE subsections (id INTEGER PRIMARY KEY, section_id INTEGER NOT NULL REFERENCES sections(id))')
            connection.exec_driver_sql('INSERT INTO containers VALUES (7)')
            connection.exec_driver_sql("INSERT INTO sections VALUES (9, 7, 'Experience')")
            connection.exec_driver_sql('INSERT INTO subsections VALUES (11, 9)')
            with Operations.context(MigrationContext.configure(connection)):
                migration.upgrade()
                self.assertEqual(connection.exec_driver_sql('SELECT container_id, label FROM sections').one(), (7, 'Experience'))
                fk = sa.inspect(connection).get_foreign_keys('sections')[0]
                self.assertEqual(fk['constrained_columns'], ['container_id'])
                self.assertEqual(fk['referred_table'], 'containers')
                self.assertEqual(connection.exec_driver_sql('PRAGMA foreign_key_check').all(), [])
                migration.downgrade()
            self.assertEqual(connection.exec_driver_sql('SELECT column_id, label FROM sections').one(), (7, 'Experience'))
            self.assertEqual(connection.exec_driver_sql('SELECT section_id FROM subsections').scalar_one(), 9)
            self.assertEqual(connection.exec_driver_sql('PRAGMA foreign_key_check').all(), [])
        engine.dispose()
