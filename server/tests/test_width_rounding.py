"""Rounding preserves the existing backend width allocation."""
import sys
from pathlib import Path
from decimal import Decimal
from types import SimpleNamespace
from unittest import TestCase, main
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from services.updaters import update_container_widths


class WidthRoundingTest(TestCase):
    def allocate(self, widths):
        containers = [SimpleNamespace(id=i, layout={"width": {"value": value, "auto": auto}})
                      for i, (value, auto) in enumerate(widths)]
        with patch('services.updaters.Container') as model:
            model.query.filter_by.return_value.order_by.return_value.all.return_value = containers
            update_container_widths(1)
        return [c.layout['width']['value'] for c in containers]

    def test_equal_automatic_columns(self):
        self.assertEqual(self.allocate([('0%', True)] * 3), ['33.34%', '33.33%', '33.33%'])

    def test_manual_and_automatic_columns_preserve_total(self):
        values = self.allocate([('33.33%', False), ('0%', True), ('0%', True)])
        self.assertEqual(values, ['33.33%', '33.34%', '33.33%'])
        self.assertEqual(sum(Decimal(v[:-1]) for v in values), 100)

    def test_scaled_manual_columns_preserve_total(self):
        values = self.allocate([('70%', False), ('70%', False), ('0%', True)])
        self.assertEqual(values, ['45.00%', '45.00%', '10.00%'])

    def test_existing_manual_allocation_is_preserved(self):
        self.assertEqual(self.allocate([('20%', False), ('80%', False), ('100%', False)]),
                         ['20.00%', '80.00%', '100.00%'])


if __name__ == '__main__':
    main()
