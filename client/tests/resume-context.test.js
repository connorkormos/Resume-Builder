import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveEditorContext } from '../src/helpers/resumeContext.js';
import { getCascadedColor, getCascadedFontSize, getCascadedLineHeight } from '../src/helpers/leafHelpers.js';

const fixture = () => ({
  styling: { fontSize: '12px', lineHeight: 1.2, color: 'black' },
  activeSectionIds: ['other'],
  columns: { byId: {
    c1: { id: 'c1', styling: { fontSizeOffset: 1, lineHeightOffset: 0.1, color: 'blue' } },
    c2: { id: 'c2', styling: { fontSizeOffset: 20, color: 'red' } },
  } },
  sections: { byId: {
    s1: { id: 's1', columnId: 'c1', styling: { fontSizeOffset: 2, lineHeightOffset: 0.2, color: 'green' } },
    other: { id: 'other', columnId: 'c2', styling: { color: 'orange' } },
  } },
  subsections: { byId: {
    sub1: { id: 'sub1', sectionId: 's1', styling: { fontSizeOffset: -1, lineHeightOffset: -0.1, color: 'purple' } },
  } },
  fields: { byId: {
    f1: { id: 'f1', subsectionId: 'sub1', styling: { fontSizeOffset: 3, lineHeightOffset: 0.3, color: 'navy' } },
  } },
});

test('field ancestry follows ownership, not the independently selected section', () => {
  const resume = fixture();
  const before = structuredClone(resume);
  const context = resolveEditorContext(resume, 'f1');
  assert.equal(context.kind, 'field');
  assert.equal(context.field, resume.fields.byId.f1);
  assert.equal(context.subsection, resume.subsections.byId.sub1);
  assert.equal(context.section, resume.sections.byId.s1);
  assert.equal(context.column, resume.columns.byId.c1);
  assert.equal(context.styling.fieldStyling, resume.fields.byId.f1.styling);
  assert.equal(context.styling.resumeStyling, resume.styling);
  assert.deepEqual(resume, before, 'resolving must not mutate the document');
});

test('field typography includes every ancestor and optional text marks', () => {
  const { styling } = resolveEditorContext(fixture(), 'f1');
  assert.equal(getCascadedFontSize(styling), 17);
  assert.equal(getCascadedLineHeight(styling), 1.7);
  assert.equal(getCascadedFontSize({ ...styling, leafStyling: { fontSizeOffset: -2 } }), 15);
  assert.equal(getCascadedLineHeight({ ...styling, leafStyling: { lineHeightOffset: '0.2' } }), 1.9);
});

test('heading typography excludes subsection and field offsets', () => {
  const resume = fixture();
  const context = resolveEditorContext(resume, 's1');
  assert.equal(context.kind, 'heading');
  assert.equal(context.field, null);
  assert.equal(context.subsection, null);
  assert.equal(context.section, resume.sections.byId.s1);
  assert.equal(getCascadedFontSize(context.styling), 15);
  assert.equal(getCascadedLineHeight(context.styling), 1.5);
  assert.equal(getCascadedColor(context.styling), 'green');
});

test('no editor or an unknown editor does not resolve a selected section', () => {
  for (const editorId of [null, undefined, 'missing', 'sub1', 'c1']) {
    const context = resolveEditorContext(fixture(), editorId);
    assert.equal(context.kind, null);
    assert.equal(context.section, null);
    assert.equal(context.column, null);
    assert.equal(getCascadedFontSize(context.styling), 12);
    assert.equal(getCascadedLineHeight(context.styling), 1.2);
    assert.equal(getCascadedColor(context.styling), 'black');
  }
});

test('missing ancestors stay absent without borrowing another selected branch', () => {
  const resume = fixture();
  delete resume.columns.byId.c1;
  let context = resolveEditorContext(resume, 'f1');
  assert.equal(context.column, null);
  assert.equal(getCascadedFontSize(context.styling), 16);
  delete resume.sections.byId.s1;
  context = resolveEditorContext(resume, 'f1');
  assert.equal(context.section, null);
  assert.equal(context.subsection, resume.subsections.byId.sub1);
  delete resume.subsections.byId.sub1;
  context = resolveEditorContext(resume, 'f1');
  assert.equal(context.kind, 'field');
  assert.equal(context.subsection, null);
  assert.equal(context.section, null);
  assert.equal(context.column, null);
  assert.doesNotThrow(() => resolveEditorContext({ styling: {} }, 'missing'));
});

test('numeric zero IDs resolve and field IDs retain precedence over heading IDs', () => {
  const resume = fixture();
  resume.fields.byId[0] = { ...resume.fields.byId.f1, id: 0 };
  resume.sections.byId[0] = { ...resume.sections.byId.other, id: 0 };
  assert.equal(resolveEditorContext(resume, 0).field, resume.fields.byId[0]);
  assert.equal(resolveEditorContext(resume, 0).section, resume.sections.byId.s1);
});

test('color inheritance preserves mark-to-resume precedence and cleared overrides', () => {
  const { styling } = resolveEditorContext(fixture(), 'f1');
  styling.leafStyling = { color: 'rgba(0, 0, 0, 0)' };
  const levels = ['leafStyling', 'fieldStyling', 'subsectionStyling', 'sectionStyling', 'columnStyling', 'resumeStyling'];
  const expected = ['rgba(0, 0, 0, 0)', 'navy', 'purple', 'green', 'blue', 'black'];
  for (let i = 0; i < levels.length; i++) {
    assert.equal(getCascadedColor(styling), expected[i]);
    styling[levels[i]] = { color: i % 2 ? '' : null };
  }
  assert.equal(getCascadedColor(styling), '', 'preserve the resume fallback value');
  delete styling.resumeStyling;
  assert.equal(getCascadedColor(styling), undefined);
});

test('resolving again reflects edits and moves between sections and columns', () => {
  const resume = fixture();
  const before = resolveEditorContext(resume, 'f1');
  resume.subsections.byId.sub1 = { ...resume.subsections.byId.sub1, sectionId: 'other' };
  const after = resolveEditorContext(resume, 'f1');
  assert.equal(before.section.id, 's1');
  assert.equal(after.section.id, 'other');
  assert.equal(after.column.id, 'c2');
  assert.equal(getCascadedFontSize(after.styling), 34);
});
