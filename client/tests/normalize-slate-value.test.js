import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSlateValue } from '../src/utils/normalizers/normalizeSlateValue.js';
import normalizeResumeFromApi from '../src/utils/normalizers/normalizeResumeFromApi.js';
import reducer, { addSection, addSubsection, addField } from '../src/store/resumeSlice.js';

const legacy = [{ children: [{ type: 'unordered-list', children: [{ children: [{ text: 'item', bold: true }] }] }] }];
const expected = [{ type: 'unordered-list', children: [{ type: 'list-item', children: [{ text: 'item', bold: true }] }] }];

test('bare wrappers are removed and untyped list text becomes an item without mutating input', () => {
  const before = structuredClone(legacy);
  assert.deepEqual(normalizeSlateValue(legacy), expected);
  assert.deepEqual(legacy, before);
  assert.deepEqual(normalizeSlateValue(expected), expected);
});

test('text and icons receive a paragraph wrapper and keep their marks', () => {
  const children = [{ text: 'a', italic: true }, { type: 'icon', iconId: 'phone', children: [{ text: '', fontSizeOffset: 2 }] }, { text: '' }];
  assert.deepEqual(normalizeSlateValue([{ children }]), [{ type: 'paragraph', children }]);
});

test('metadata-bearing wrappers are retained rather than losing their properties', () => {
  const value = [{ textAlign: 'right', custom: { id: 1 }, children: expected }];
  assert.deepEqual(normalizeSlateValue(value), value);
});

test('loading repairs both headings and fields', () => {
  const state = normalizeResumeFromApi({ containers: [{ id: 1, sections: [{ id: 2, containerId: 1, value: legacy,
    subsections: [{ id: 3, sectionId: 2, fields: [{ id: 4, subsectionId: 3, value: legacy }] }],
  }] }] });
  assert.deepEqual(state.sections.byId[2].value, expected);
  assert.deepEqual(state.fields.byId[4].value, expected);
});

test('loading omits subsection types for current and legacy API responses', () => {
  for (const obsoleteProperties of [{}, { type: 'defaultSection' }]) {
    const state = normalizeResumeFromApi({ containers: [{ id: 1, sections: [{
      id: 2, containerId: 1, type: 'employment', subsections: [{
        id: 3, sectionId: 2, ...obsoleteProperties, fields: [],
      }],
    }] }] });
    assert.equal(state.sections.byId[2].type, 'employment');
    assert.equal(state.subsections.byId[3].sectionId, 2);
    assert.equal(Object.hasOwn(state.subsections.byId[3], 'type'), false);
  }
});

test('incremental API additions repair only the incoming content', () => {
  let state = { ...reducer(undefined, { type: 'init' }), containers: { byId: { 1: { id: 1, sectionIds: [] } }, allIds: [1] } };
  state = reducer(state, addSection({ sectionData: { id: 2, containerId: 1, value: legacy, subsections: [
    { id: 3, sectionId: 2, fields: [{ id: 4, subsectionId: 3, value: legacy }] },
  ] } }));
  state = reducer(state, addSubsection({ subsectionData: { id: 5, sectionId: 2, fields: [{ id: 6, subsectionId: 5, value: legacy }] } }));
  state = reducer(state, addField({ fieldData: { id: 7, subsectionId: 5, value: legacy } }));
  assert.deepEqual(state.sections.byId[2].value, expected);
  for (const id of [4, 6, 7]) assert.deepEqual(state.fields.byId[id].value, expected);
});

test('loading rounds independent formatting at every level without mutating API data', () => {
  const formatting = {
    styling: { fontSize: '10.234px', fontSizeOffset: -0.456, lineHeight: 1.234, lineHeightOffset: '0.126' },
    layout: { padding: { top: '0.234rem', left: '-0.456rem' }, marginLeft: '0.126rem' },
  };
  const apiResume = {
    ...structuredClone(formatting),
    containers: [{ id: 1, ...structuredClone(formatting), sections: [{
      id: 2, containerId: 1, ...structuredClone(formatting), subsections: [{
        id: 3, sectionId: 2, ...structuredClone(formatting), fields: [{
          id: 4, subsectionId: 3, ...structuredClone(formatting),
        }],
      }],
    }] }],
  };
  const before = structuredClone(apiResume);
  const state = normalizeResumeFromApi(apiResume);

  for (const entity of [state, state.containers.byId[1], state.sections.byId[2],
    state.subsections.byId[3], state.fields.byId[4]]) {
    assert.deepEqual(entity.styling, {
      fontSize: '10.23px', fontSizeOffset: -0.46, lineHeight: 1.23, lineHeightOffset: 0.13,
    });
    assert.deepEqual(entity.layout.padding, { top: '0.23rem', left: '-0.46rem' });
    assert.equal(entity.layout.marginLeft, '0.13rem');
  }
  assert.deepEqual(apiResume, before);
});

test('loading preserves unsupported strings and rounds complete border and gap dimensions', () => {
  const state = normalizeResumeFromApi({
    styling: {
      fontFamily: '123', color: '#123456', fontSize: '1.234em', lineHeight: '1.2 trailing',
      fontSizeOffset: 0, lineHeightOffset: '.126',
      border: {
        top: { width: ' 88.126% ', height: '1.234px', display: true, style: 'solid' },
        left: { width: 'calc(1px + 2px)', height: 'auto' },
      },
    },
    layout: {
      gap: { horizontal: '0.126rem', field: '1.2.3', header: null },
      padding: { top: '', bottom: Infinity, left: NaN, right: 'Infinity' },
      samples: [{ padding: { top: '0.126rem' } }, '1.234rem', null],
    },
  });

  assert.equal(state.styling.fontFamily, '123');
  assert.equal(state.styling.color, '#123456');
  assert.equal(state.styling.fontSize, '1.234em');
  assert.equal(state.styling.lineHeight, '1.2 trailing');
  assert.equal(state.styling.fontSizeOffset, 0);
  assert.equal(state.styling.lineHeightOffset, 0.13);
  assert.deepEqual(state.styling.border, {
    top: { width: '88.13%', height: '1.23px', display: true, style: 'solid' },
    left: { width: 'calc(1px + 2px)', height: 'auto' },
  });
  assert.deepEqual(state.layout.gap, { horizontal: '0.13rem', field: '1.2.3', header: null });
  assert.deepEqual(state.layout.padding, { top: '', bottom: Infinity, left: NaN, right: 'Infinity' });
  assert.deepEqual(state.layout.samples, [{ padding: { top: '0.13rem' } }, '1.234rem', null]);
});

test('loading leaves coordinated width allocations and grid counts unchanged', () => {
  const grid = { columns: 2.34567, fillRow: true };
  const width = { value: '33.333333333333336%', auto: true };
  const state = normalizeResumeFromApi({
    layout: { rowContentWidth: width },
    containers: [{ id: 1, layout: { width }, sections: [{
      id: 2, containerId: 1, layout: { display: 'grid', grid, padding: { top: '0.126rem' } },
    }] }],
  });

  assert.deepEqual(state.layout.rowContentWidth, width);
  assert.deepEqual(state.containers.byId[1].layout.width, width);
  assert.deepEqual(state.sections.byId[2].layout.grid, grid);
  assert.equal(state.sections.byId[2].layout.padding.top, '0.13rem');
});

test('loading retains the default background when resume styling is absent', () => {
  for (const styling of [undefined, null]) {
    assert.deepEqual(normalizeResumeFromApi({ styling }).styling,
      { backgroundColor: 'rgba(255, 255, 255, 1)' });
  }
});
