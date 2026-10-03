import json
from collections import Counter
from pathlib import Path
import re
import sys
from types import SimpleNamespace
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from services.plain_text import build_resume_plain_text
from services.resume_tags import normalize_resume_tags


class TemplateTagsTest(unittest.TestCase):
    def test_all_inserts_have_tags_matching_report_and_complete_search_text(self):
        directory = Path(__file__).resolve().parents[1] / 'sql/10-03-2026'
        paths = list(directory.glob('*.sql'))
        self.assertEqual(len(paths), 100)
        counts = Counter()
        for path in paths:
            with self.subTest(template=path.name):
                sql = path.read_text()
                self.assertIn('tags, plain_text, is_official_template', sql)
                self.assertIn('TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP', sql)
                title = re.search(r"1, NULL, '([^']+)'", sql).group(1)
                tags = json.loads(re.search(r"'([^']+)'::jsonb,\n\s*\$search_text\$", sql).group(1))
                self.assertTrue(tags)
                self.assertEqual(tags, normalize_resume_tags(tags))
                counts.update(tags)
                sections = json.loads(sql.split('$resume_data$')[1])
                columns = []
                for position in sorted({section['columnPosition'] for section in sections}):
                    nested = []
                    for section in sections:
                        if section['columnPosition'] != position:
                            continue
                        nested.append(SimpleNamespace(
                            label=section['label'], value=section['value'],
                            subsections=[SimpleNamespace(
                                label=sub['label'], fields=[SimpleNamespace(**field) for field in sub['fields']],
                            ) for sub in section['subsections']],
                        ))
                    columns.append(SimpleNamespace(sections=nested))
                expected = build_resume_plain_text(SimpleNamespace(title=title, columns=columns))
                self.assertEqual(sql.split('$search_text$')[1], expected)
                self.assertTrue(sql.rstrip().endswith('FROM new_resume'))
        report_rows = [(tag, int(count)) for tag, count in re.findall(
            r'^\| `([^`]+)` \| (\d+) \|$', (directory/'TAGS.md').read_text(), re.M,
        )]
        self.assertEqual(report_rows, sorted(counts.items(), key=lambda item: (-item[1], item[0])))
