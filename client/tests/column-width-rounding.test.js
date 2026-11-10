import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveResumeLayout, resizeColumnWidths, ROW_CONTENT_TRACK } from '../src/utils/resumeLayout.js';
import reducer, { setColumnWidth, resizeContainerPair } from '../src/store/resumeSlice.js';
const column = (id, width) => ({ id, type: 'column', layout: { width: { value: `${width}%`, auto: false } }, sectionIds: [] });
const fixture = items => ({ allIds: items.map(c => c.id), byId: Object.fromEntries(items.map(c => [c.id, c])) });
const resolve = containers => resolveResumeLayout({ containersById: containers.byId, orderedContainerIds: containers.allIds });


test('equal columns allocate the remaining hundredth in page order', () => {
  const layout = resolve(fixture([column('a', 1), column('b', 1), column('c', 1)]));
  assert.deepEqual(layout.widthsById, { a: 33.34, b: 33.33, c: 33.33 });
});

test('fractional edits and repeated drags preserve 10000 units and unrelated widths', () => {
  let state = { ...reducer(undefined, { type: 'init' }), containers: fixture([column('a', 1), column('b', 1), column('c', 1)]) };
  state = reducer(state, setColumnWidth({ id: 'a', value: 25.555 }));
  assert.equal(state.containers.byId.a.layout.width.value, '25.56%');
  assert.equal(state.containers.byId.b.layout.width.value, '41.11%');
  for (let i = 0; i < 20; i++) {
    const layout = resolve(state.containers);
    const pair = resizeColumnWidths(layout.widthsById.a, layout.widthsById.b, 0.137);
    state = reducer(state, resizeContainerPair({ leftContainerId: 'a', rightContainerId: 'b', ...pair }));
    const values = Object.values(state.containers.byId).map(c => parseFloat(c.layout.width.value));
    assert.equal(values.reduce((sum, v) => sum + Math.round(v * 100), 0), 10000);
    assert.equal(state.containers.byId.c.layout.width.value, '33.33%');
    for (const value of values) assert.equal(value, Number(value.toFixed(2)));
  }
});


test('small tracks stay positive and pair bounds use whole hundredths', () => {
  const layout = resolve(fixture([column('a', 0.001), column('b', 99.999)]));
  assert.deepEqual(layout.widthsById, { a: 0.01, b: 99.99 });
  assert.deepEqual(resizeColumnWidths(0.01, 0.02, 100), { leftWidth: 0.02, rightWidth: 0.01 });
});


test('automatic widths and the shared row track use the same allocation', () => {
  const auto = fixture(['a', 'b', 'c'].map(id => ({ ...column(id, 0), layout: { width: { auto: true } } })));
  assert.deepEqual(resolve(auto).widthsById, { a: 33.34, b: 33.33, c: 33.33 });
  const containers = fixture([
    { ...column('left', 1), spanFullPage: true },
    { ...column('row', 100), type: 'row', spanFullPage: true },
    { ...column('right', 1), spanFullPage: true },
  ]);
  const layout = resolveResumeLayout({ containersById: containers.byId, orderedContainerIds: containers.allIds,
    rowContentWidth: { auto: false, value: '1%' } });
  assert.deepEqual(layout.widthsById, { left: 33.34, [ROW_CONTENT_TRACK]: 33.33, right: 33.33 });
});
