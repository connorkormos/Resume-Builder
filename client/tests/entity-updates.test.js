import assert from 'node:assert/strict';
import test from 'node:test';
import reducer, { updateField, updateSubsection } from '../src/store/resumeSlice.js';

const value = text => [{ type: 'paragraph', children: [{ text }] }];
const document = () => ({
  ...reducer(undefined, { type: 'init' }),
  sections: { byId: { s: { id: 's', subsectionIds: ['a', 'b'] } }, allIds: ['s'] },
  subsections: {
    byId: {
      a: { id: 'a', sectionId: 's', position: 1, fieldIds: ['f'], layout: { padding: { top: '1rem', bottom: '2rem' } } },
      b: { id: 'b', sectionId: 's', position: 2, fieldIds: [] },
    },
    allIds: ['a', 'b'],
  },
  fields: {
    byId: { f: { id: 'f', subsectionId: 'a', value: value('Old'), layout: { grid: { fillRow: false, column: 2 } }, styling: { color: 'red', fontSizeOffset: 1 } } },
    allIds: ['f'],
  },
});

test('subsection deep patches preserve padding and position zero reorders the parent', () => {
  const before = document();
  const after = reducer(before, updateSubsection({ id: 'b', position: 0 }));
  assert.deepEqual(after.sections.byId.s.subsectionIds, ['b', 'a']);
  const patched = reducer(after, updateSubsection({ id: 'a', layout: { padding: { top: '3rem' } } }));
  assert.deepEqual(patched.subsections.byId.a.layout.padding, { top: '3rem', bottom: '2rem' });
  assert.deepEqual(before.sections.byId.s.subsectionIds, ['a', 'b']);
});

test('unified field updates replace text while merging layout and styling', () => {
  const before = document();
  const after = reducer(before, updateField({
    id: 'f', value: [], layout: { grid: { fillRow: true }, startNewRow: false }, styling: { color: null },
  }));
  assert.deepEqual(after.fields.byId.f.value, []);
  assert.deepEqual(after.fields.byId.f.layout, { grid: { fillRow: true, column: 2 }, startNewRow: false });
  assert.deepEqual(after.fields.byId.f.styling, { color: null, fontSizeOffset: 1 });
  assert.deepEqual(before.fields.byId.f.value, value('Old'));
});

test('field value updates retain the missing-subsection guard', () => {
  const before = document();
  delete before.subsections.byId.a;
  const originalError = console.error;
  console.error = () => {};
  try {
    assert.equal(reducer(before, updateField({ id: 'f', value: value('New') })), before);
  } finally {
    console.error = originalError;
  }
});
