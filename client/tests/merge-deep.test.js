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
