"""Run with: python -m unittest discover -s server/tests -v"""
import importlib.util
import io
import os
from pathlib import Path
import sys
import unittest

# Never use the configured deployment database in these integration tests.
os.environ["DATABASE_URL"] = "sqlite:///:memory:"
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from alembic.migration import MigrationContext
from alembic.operations import Operations
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.schema import CreateTable

from app import app, db
from models import User, Resume, Column
from services.resume_tags import InvalidResumeTags, normalize_resume_tags


class ResumeTagsTest(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.context = app.app_context()
        self.context.push()
        db.create_all()
        db.session.add_all([
            User(id=1, first_name="Owner", email="owner@example.com", password_hash="unused"),
            User(id=2, first_name="Other", email="other@example.com", password_hash="unused"),
        ])
        db.session.commit()
        self.client = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.context.pop()

    def resume(self, title="Sample", tags=None, text="", owner=1, official=True):
        resume = Resume(title=title, user_id=owner, tags=tags or [], plain_text=text,
                        is_official_template=official, columns=[Column(position=0)])
        db.session.add(resume)
        db.session.commit()
        return resume

    def search(self, query, **params):
        response = self.client.get('/resumes/search', query_string={
            'query': query, 'resumeTypes': 'officialTemplate', **params,
        })
        self.assertEqual(response.status_code, 200)
        return response.json

    def login(self):
        with self.client.session_transaction() as session:
            session['user_id'] = 1

    def test_search_matches_tags_or_text_without_duplicates(self):
        tagged = self.resume(tags=['elegant'])
        text = self.resume(text='An elegant presentation')
        both = self.resume(tags=['elegant'], text='elegant')
        self.resume(tags=['modern'])
        self.resume(tags=['elegant'], owner=2, official=False)
        results = self.search(' ELEGANT ')
        self.assertEqual(results['totalCount'], 3)
        self.assertEqual({r['id'] for r in results['results']}, {tagged.id, text.id, both.id})
        self.assertEqual(self.search('elegant', count=1, offset=1)['totalCount'], 3)
        self.assertEqual(len(self.search('elegant', count=1, offset=1)['results']), 1)

    def test_existing_phrase_search_empty_search_and_access(self):
        self.resume(text='Experienced software developer', tags=['human resources'])
        self.resume(text='Software systems for a developer')
        self.assertEqual(self.search('software developer')['totalCount'], 1)
        self.assertEqual(self.search('human resources')['totalCount'], 1)
        self.assertEqual(self.search('')['totalCount'], 2)
        self.assertEqual(self.search('not-present')['totalCount'], 0)
        self.resume(tags=['private'], official=False)
        self.resume(tags=['private'], official=False, owner=2)
        self.login()
        result = self.search('private', resumeTypes='personal')
        self.assertEqual(result['totalCount'], 1)
        self.assertEqual(result['results'][0]['userId'], 1)

    def test_save_preserves_omitted_tags_normalizes_updates_and_rejects_bad_tags(self):
        resume = self.resume(tags=['elegant'])
        self.login()
        payload = {'title': 'Edited', 'columns': {'byId': {str(resume.columns[0].id): {}}}}
        endpoint = f'/resumes/{resume.id}'
        self.assertEqual(self.client.put(endpoint, json=payload).json['tags'], ['elegant'])
        response = self.client.put(endpoint, json={**payload, 'tags': [' MODERN ', 'modern', 'human  resources', '']})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['tags'], ['modern', 'human resources'])
        self.assertEqual(self.search('modern')['totalCount'], 1)
        self.assertEqual(self.search('Edited')['totalCount'], 1)
        for bad in (None, 'modern', {'style': 'modern'}, [1]):
            response = self.client.put(endpoint, json={**payload, 'tags': bad})
            self.assertEqual(response.status_code, 400)
        self.assertEqual(db.session.get(Resume, resume.id).tags, ['modern', 'human resources'])
        self.assertEqual(self.client.put(endpoint, json={**payload, 'tags': []}).json['tags'], [])

    def test_new_resume_defaults_and_copy_preserve_independent_tags(self):
        self.login()
        created = self.client.post('/resumes', json={'title': 'New', 'sections': {}})
        self.assertEqual(created.status_code, 201)
        self.assertEqual(created.json['tags'], [])
        original = self.resume(tags=['classic'])
        from services.builders import build_resume_copy
        copied = build_resume_copy(original.id, user_id=2)
        self.assertEqual(copied.tags, ['classic'])
        self.assertIsNot(copied.tags, original.tags)
        self.assertFalse(copied.is_official_template)
        self.assertEqual(copied.source_resume_id, original.id)

    def test_postgresql_model_uses_jsonb(self):
        ddl = str(CreateTable(Resume.__table__).compile(dialect=postgresql.dialect()))
        self.assertIn("tags JSONB DEFAULT '[]' NOT NULL", ddl)


class MigrationTest(unittest.TestCase):
    def test_existing_rows_default_empty_and_downgrade_preserves_content(self):
        path = Path(__file__).resolve().parents[1] / 'migrations/versions/c31d82ab690f_add_resume_tags.py'
        spec = importlib.util.spec_from_file_location('tags_migration', path)
        migration = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(migration)
        engine = sa.create_engine('sqlite:///:memory:')
        with engine.begin() as connection:
            connection.execute(sa.text('CREATE TABLE resumes (id INTEGER PRIMARY KEY, plain_text TEXT NOT NULL)'))
            connection.execute(sa.text("INSERT INTO resumes VALUES (1, 'Existing content')"))
            with Operations.context(MigrationContext.configure(connection)):
                migration.upgrade()
                self.assertEqual(connection.execute(sa.text('SELECT tags FROM resumes')).scalar_one(), '[]')
                migration.downgrade()
            self.assertEqual(connection.execute(sa.text('SELECT plain_text FROM resumes')).scalar_one(), 'Existing content')
        output = io.StringIO()
        with Operations.context(MigrationContext.configure(dialect_name='postgresql', opts={'as_sql': True, 'output_buffer': output})):
            migration.upgrade()
        self.assertIn("ADD COLUMN tags JSONB DEFAULT '[]' NOT NULL", output.getvalue())

    def test_tag_validation(self):
        self.assertEqual(normalize_resume_tags([' Modern ', 'modern', 'two column']), ['modern', 'two column'])
        with self.assertRaises(InvalidResumeTags):
            normalize_resume_tags([{}])
