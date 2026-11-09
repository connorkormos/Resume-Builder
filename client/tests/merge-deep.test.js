import assert from 'node:assert/strict';
import test from 'node:test';
import { createNextState } from '@reduxjs/toolkit';
import { mergeDeep } from '../src/store/helpers/mergeDeep.js';

test('nested layout patches preserve omitted properties without modifying changes', () => {
   const target = {
      gap: { field: '0.5rem', vertical: '1rem' },
      padding: { top: '1rem', bottom: '2rem' },
   };
   const changes = { gap: { field: '0.75rem' }, padding: { top: '1.5rem' } };
   const originalChanges = structuredClone(changes);
   assert.equal(mergeDeep(target, changes), target);
   assert.deepEqual(target, {
      gap: { field: '0.75rem', vertical: '1rem' },
      padding: { top: '1.5rem', bottom: '2rem' },
   });
   assert.deepEqual(changes, originalChanges);
});

test('missing objects are initialized, including where a primitive or array existed', () => {
   const target = { padding: null, gap: 3, grid: [1, 2] };
   mergeDeep(target, { padding: { top: 1 }, gap: { field: 2 }, grid: { columns: 2 }, newKey: { nested: true } });
   assert.deepEqual(target, { padding: { top: 1 }, gap: { field: 2 }, grid: { columns: 2 }, newKey: { nested: true } });
});

test('Slate arrays replace completely, including replacement with an empty array', () => {
   const target = { value: [{ text: 'old', bold: true }, { text: 'extra' }] };
   mergeDeep(target, { value: [{ text: 'new' }] });
   assert.deepEqual(target.value, [{ text: 'new' }]);
   mergeDeep(target, { value: [] });
   assert.deepEqual(target.value, []);
});

test('explicit null, undefined, false, zero, and empty strings replace existing values', () => {
   const changes = { a: null, b: undefined, c: false, d: 0, e: '' };
   const target = { a: {}, b: 1, c: true, d: 2, e: 'old', omitted: 1 };
   mergeDeep(target, changes);
   assert.deepEqual(target, { ...changes, omitted: 1 });
});

test('works with Immer drafts while preserving the original state', () => {
   const original = { layout: { padding: { top: '1rem', bottom: '2rem' } } };
   const next = createNextState(original, draft => {
      mergeDeep(draft.layout, { padding: { top: '3rem' } });
   });
   assert.deepEqual(next.layout.padding, { top: '3rem', bottom: '2rem' });
   assert.equal(original.layout.padding.top, '1rem');
});

test('ignores prototype-related properties and rejects invalid root arguments', () => {
   const target = {};
   mergeDeep(target, JSON.parse('{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"safe":1}'));
   assert.deepEqual(target, { safe: 1 });
   assert.equal(Object.prototype.polluted, undefined);
   assert.throws(() => mergeDeep(null, {}), TypeError);
   assert.throws(() => mergeDeep({}, []), TypeError);
});

test('rounds formatting patches at nested depths while preserving units, siblings, and the patch', () => {
   const target = {
      styling: { fontSize: '12px', color: 'red', fontFamily: 'Arial' },
      layout: { padding: { top: '1rem', bottom: '2rem' } },
   };
   const changes = {
      styling: {
         fontSize: '10.234px', fontSizeOffset: -0.456, lineHeight: 1.234, lineHeightOffset: '0.126',
         border: { bottom: { height: '1.234px', width: '88.126%', display: true } },
      },
      layout: { padding: { top: '-0.456rem' }, gap: { field: '0.126rem' } },
   };
   const originalChanges = structuredClone(changes);

   assert.equal(mergeDeep(target, changes), target);
   assert.deepEqual(target, {
      styling: {
         fontSize: '10.23px', color: 'red', fontFamily: 'Arial',
         fontSizeOffset: -0.46, lineHeight: 1.23, lineHeightOffset: 0.13,
         border: { bottom: { height: '1.23px', width: '88.13%', display: true } },
      },
      layout: { padding: { top: '-0.46rem', bottom: '2rem' }, gap: { field: '0.13rem' } },
   });
   assert.deepEqual(changes, originalChanges);
});

test('formatting scope does not leak into ordinary updates or direct unscoped patches', () => {
   const changes = {
      entity: { styling: { fontSizeOffset: 0.126 }, height: 1.234 },
      fontSizeOffset: 0.126,
      padding: { top: '1.234rem' },
      metadata: { width: '33.333%', lineHeight: 1.234 },
   };
   const target = mergeDeep({}, changes);
   assert.deepEqual(target, {
      ...changes,
      entity: { styling: { fontSizeOffset: 0.13 }, height: 1.234 },
   });
});

test('layout allocation and grid branches still merge without numeric normalization', () => {
   const target = {
      layout: {
         width: { auto: true, value: '50%' },
         rowContentWidth: { auto: true, value: '50%' },
         grid: { columns: 2, fillRow: true },
      },
   };
   mergeDeep(target, {
      layout: {
         width: { value: '33.333333333333336%' },
         rowContentWidth: { value: '66.66666666666667%' },
         grid: { columns: 2.34567 },
         padding: { top: '0.126rem' },
      },
   });
   assert.deepEqual(target.layout, {
      width: { auto: true, value: '33.333333333333336%' },
      rowContentWidth: { auto: true, value: '66.66666666666667%' },
      grid: { columns: 2.34567, fillRow: true },
      padding: { top: '0.13rem' },
   });
   // Legacy scalar layout widths also retain their precision.
   mergeDeep(target, { layout: { width: '33.33333%' } });
   assert.equal(target.layout.width, '33.33333%');
});

test('normalization preserves replacement values, arrays, and unsupported strings', () => {
   const slateValue = [{ type: 'paragraph', children: [{ text: 'New', fontSizeOffset: 0.126 }] }];
   const samples = [{ fontSize: '10.234px' }];
   const changes = {
      styling: { fontSize: null, fontSizeOffset: 0, lineHeight: undefined, lineHeightOffset: false,
         fontFamily: '123', color: '#123456', samples },
      layout: { padding: { top: '', bottom: '1.234em', left: '10px garbage', right: 'calc(1px + 2px)' } },
      value: slateValue,
   };
   const target = { styling: { fontSize: '12px', lineHeight: 1.2 }, value: [{ text: 'Old' }] };
   mergeDeep(target, changes);
   assert.deepEqual(target, changes);
   assert.equal(target.value, slateValue);
   assert.equal(target.styling.samples, samples);

   mergeDeep(target, { styling: null, layout: undefined, value: [] });
   assert.deepEqual(target, { styling: null, layout: undefined, value: [] });
});

test('formatting normalization works with Immer and retains nested prototype protections', () => {
   const original = { styling: { fontSize: '12px' }, layout: { padding: { top: '1rem', bottom: '2rem' } } };
   const next = createNextState(original, draft => {
      mergeDeep(draft, { styling: { fontSize: '10.234px' }, layout: { padding: { top: '0.126rem' } } });
      mergeDeep(draft, JSON.parse('{"styling":{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"fontSizeOffset":0.126}}'));
   });
   assert.deepEqual(next, {
      styling: { fontSize: '10.23px', fontSizeOffset: 0.13 },
      layout: { padding: { top: '0.13rem', bottom: '2rem' } },
   });
   assert.equal(original.styling.fontSize, '12px');
   assert.equal(original.layout.padding.top, '1rem');
   assert.equal(Object.prototype.polluted, undefined);
});
