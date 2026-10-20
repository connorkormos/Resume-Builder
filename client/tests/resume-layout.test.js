import undoable, { ActionCreators } from 'redux-undo';
import normalizeResumeFromApi from '../src/utils/normalizers/normalizeResumeFromApi.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveResumeLayout, deriveSectionBoundaries, planContainerRole, resizeColumnWidths, ROW_CONTENT_TRACK, getContainerRole } from '../src/utils/resumeLayout.js';
import { normalizeResumeLayout, resolveSectionPadding } from '../src/utils/sectionSpacing.js';
import reducer, { configureContainer, moveContainer, resizeContainerPair, setResume, setColumnWidth } from '../src/store/resumeSlice.js';

const column = (id, width = 50, spanFullPage = false) => ({ id, type: 'column', spanFullPage, layout: { width: { value: `${width}%`, auto: false } }, sectionIds: [] });
const row = id => ({ ...column(id), type: 'row', spanFullPage: true });
function fixture(items) {
  return { allIds: items.map(c => c.id), byId: Object.fromEntries(items.map((c, position) => [c.id, { ...c, position }])) };
}
const resolve = containers => resolveResumeLayout({ containersById: containers.byId, orderedContainerIds: containers.allIds });

function assertTilesPage(layout) {
  const occupied = new Set();
  let maxRow = 0;
  for (const p of Object.values(layout.placementsByContainerId)) {
    for (let r = p.rowStart; r < p.rowStart + p.rowSpan; r++) {
      maxRow = Math.max(maxRow, r);
      for (let c = p.columnStart; c < p.columnStart + p.columnSpan; c++) {
        const key = `${r}:${c}`;
        assert.ok(!occupied.has(key), `overlap at ${key}`);
        occupied.add(key);
      }
    }
  }
  assert.equal(occupied.size, maxRow * Math.max(1, layout.trackIds.length));
}

test('full-height sidebar, header, two columns and footer share tracks without gaps or overlap', () => {
  const layout = resolve(fixture([column('side', 20, true), row('head'), column('a', 30), column('b', 50), row('foot')]));
  assert.deepEqual(layout.errors, []);
  assert.deepEqual(layout.columnIds, ['side', 'a', 'b']);
  assert.deepEqual(layout.widthsById, { side: 20, a: 30, b: 50 });
  assert.deepEqual(layout.placementsByContainerId.side, { rowStart: 1, rowSpan: 3, columnStart: 1, columnSpan: 1 });
  assert.deepEqual(layout.boundariesByContainerId.head, { top: 'page', bottom: 'containerVertical', left: 'containerHorizontal', right: 'page' });
  assert.equal(layout.resizeNeighborsByContainerId.side, 'a');
  assert.equal(layout.resizeNeighborsByContainerId.head, undefined);
  assertTilesPage(layout);
});

test('mirrored and two-sided sidebars, rows-only, columns-only and single containers tile the page', () => {
  for (const items of [
    [row('h'), column('a', 80), row('f'), column('s', 20, true)],
    [column('l', 20, true), row('h'), column('a', 60), row('f'), column('r', 20, true)],
    [row('h'), row('f')], [column('a'), column('b')], [column('s', 100, true)], [row('h')],
  ]) {
    const layout = resolve(fixture(items));
    assert.deepEqual(layout.errors, []);
    assertTilesPage(layout);
  }
});

test('invalid legacy layouts report the constraint and still render without overlap', () => {
  for (const items of [
    [column('a'), row('h'), column('b')],
    [column('a'), column('s', 20, true), column('b')],
    [row('h'), column('s', 100, true), row('f')],
  ]) {
    const layout = resolve(fixture(items));
    assert.ok(layout.errors.length);
    assertTilesPage(layout);
  }
});

test('each facing side gets a full gap, offsets accumulate and only the final sum clamps', () => {
  const layout = resolve(fixture([column('a'), column('b')]));
  const resumeLayout = { padding: { left: '2rem', top: '3rem', bottom: '4rem' }, gap: { horizontal: '1rem', vertical: '0.75rem', section: '0.5rem' } };
  const boundaries = deriveSectionBoundaries(layout.boundariesByContainerId.a, ['first', 'last'], 'first');
  const padding = resolveSectionPadding({ boundaries, resumeLayout, containerLayout: { padding: { left: '-3rem', right: '0.25rem' } }, sectionLayout: { padding: { left: '2rem', bottom: '-1rem' } } });
  assert.deepEqual(padding, { paddingTop: '3rem', paddingRight: '1.25rem', paddingBottom: '0rem', paddingLeft: '1rem' });
  const right = resolveSectionPadding({ boundaries: layout.boundariesByContainerId.b, resumeLayout });
  assert.equal(right.paddingLeft, '1rem');
  const only = deriveSectionBoundaries(layout.boundariesByContainerId.a, ['only'], 'only');
  assert.deepEqual(only, layout.boundariesByContainerId.a);
  assert.equal(deriveSectionBoundaries(layout.boundariesByContainerId.a, ['last', 'first'], 'first').top, 'section');
});

test('legacy gap migrates once, preserving explicit section and row gaps', () => {
  const legacy = { gap: { vertical: '0.8rem', horizontal: '1rem' } };
  const migrated = normalizeResumeLayout(legacy);
  assert.equal(migrated.gap.section, '0.8rem');
  assert.equal(migrated.gap.vertical, '0rem');
  assert.equal(legacy.gap.section, undefined);
  assert.deepEqual(normalizeResumeLayout(migrated), migrated);
  const modern = { gap: { vertical: '0.7rem', section: '0.3rem' } };
  assert.deepEqual(normalizeResumeLayout(modern), modern);
  assert.deepEqual(reducer(undefined, setResume({ layout: legacy })).layout, migrated);
});

test('role changes are atomic, keep ordering synchronized and redistribute column widths', () => {
  let state = { ...reducer(undefined, { type: 'init' }), containers: fixture([column('a', 30), column('b', 30), column('c', 40)]) };
  state = reducer(state, configureContainer({ id: 'a', role: 'header' }));
  assert.deepEqual(resolve(state.containers).columnIds, ['b', 'c']);
  assert.equal(Object.values(resolve(state.containers).widthsById).reduce((a, b) => a + b), 100);
  state = reducer(state, configureContainer({ id: 'b', role: 'leftSidebar' }));
  assert.deepEqual(resolve(state.containers).errors, []);
  assertTilesPage(resolve(state.containers));
  state.containers.allIds.forEach((id, i) => assert.equal(state.containers.byId[id].position, i));
  assert.deepEqual(planContainerRole(state.containers, 'c', 'rightSidebar').errors, []);
  state = reducer(state, configureContainer({ id: 'c', role: 'rightSidebar' }));
  assertTilesPage(resolve(state.containers));
});

test('moves cannot split the content group; resize pairs use column neighbors across row entries', () => {
  let state = { ...reducer(undefined, { type: 'init' }), containers: fixture([column('s', 20, true), row('h'), column('a', 40), column('b', 40)]) };
  assert.deepEqual(reducer(state, moveContainer({ id: 'h', direction: 1 })), state);
  state = reducer(state, resizeContainerPair({ leftContainerId: 's', rightContainerId: 'a', leftWidth: 25, rightWidth: 35 }));
  assert.equal(state.containers.byId.s.layout.width.value, '25.00%');
  assert.deepEqual(reducer(state, resizeContainerPair({ leftContainerId: 's', rightContainerId: 'h', leftWidth: 25, rightWidth: 35 })), state);
});

test('automatic and excessive widths stay positive and sum to 100; rows never contribute', () => {
  const containers = fixture([column('a', 120), { ...column('b'), layout: { width: { auto: true } } }, row('h')]);
  const { widthsById } = resolve(containers);
  assert.ok(widthsById.a > 0 && widthsById.b > 0);
  assert.equal(widthsById.a + widthsById.b, 100);
  assert.equal(widthsById.h, undefined);
});


test('null and missing API layouts normalize without throwing', () => {
  const expected = { gap: { section: '0.5rem', vertical: '0rem' } };
  assert.deepEqual(normalizeResumeLayout(null), expected);
  assert.deepEqual(normalizeResumeLayout(), expected);
  assert.deepEqual(normalizeResumeFromApi({ layout: null }).layout, expected);
});

test('column resize limits preserve pair width for ordinary and small pairs', () => {
  assert.deepEqual(resizeColumnWidths(50, 50, -100), { leftWidth: 10, rightWidth: 90 });
  assert.deepEqual(resizeColumnWidths(50, 50, 100), { leftWidth: 90, rightWidth: 10 });
  assert.deepEqual(resizeColumnWidths(5, 5, 1), { leftWidth: 6, rightWidth: 4 });
  assert.deepEqual(resizeColumnWidths(5, 5, 100), { leftWidth: 7.5, rightWidth: 2.5 });
  assert.deepEqual(resizeColumnWidths(7.5, 2.5, 1), { leftWidth: 7.5, rightWidth: 2.5 });
});


test('manual width edits preserve the entered value and adjust only the next column track', () => {
  const original = { ...reducer(undefined, { type: 'init' }), containers: fixture([
    column('side', 20, true), row('header'), column('a', 40), column('b', 40),
  ]) };
  const updated = reducer(original, setColumnWidth({ id: 'side', value: 30 }));
  assert.deepEqual(resolve(updated.containers).widthsById, { side: 30, a: 30, b: 40 });
  assert.deepEqual(updated.containers.byId.header, original.containers.byId.header);
  const last = reducer(updated, setColumnWidth({ id: 'b', value: 35 }));
  assert.deepEqual(resolve(last.containers).widthsById, { side: 30, a: 35, b: 35 });
});

test('manual edits preserve other resolved widths in legacy and automatic layouts', () => {
  for (const columns of [
    [column('a', 30), column('b', 30), column('c', 30)],
    [column('a', 30), column('b', 30), { ...column('c'), layout: { width: { auto: true } } }],
    [{ ...column('a'), layout: { width: { auto: true } } }, column('b', 30), column('c', 30)],
  ]) {
    const original = { ...reducer(undefined, { type: 'init' }), containers: fixture(columns) };
    const before = resolve(original.containers).widthsById;
    const updated = reducer(original, setColumnWidth({ id: 'a', value: 25 }));
    const after = resolve(updated.containers).widthsById;
    assert.ok(Math.abs(after.a - 25) < 1e-10);
    assert.ok(Math.abs(after.b - (before.a + before.b - 25)) < 1e-10);
    assert.ok(Math.abs(after.c - before.c) < 1e-10);
  }
});

test('impossible manual widths are rejected instead of silently normalized', () => {
  const original = { ...reducer(undefined, { type: 'init' }), containers: fixture([column('a', 20), column('b', 30), column('c', 50)]) };
  for (const value of [0, 45, NaN, Infinity]) {
    assert.equal(reducer(original, setColumnWidth({ id: 'a', value })), original);
  }
  const single = { ...original, containers: fixture([column('only', 100)]) };
  assert.equal(reducer(single, setColumnWidth({ id: 'only', value: 50 })), single);
  assert.equal(resolve(reducer(single, setColumnWidth({ id: 'only', value: 100 })).containers).widthsById.only, 100);
});

test('one undo restores both manually resized neighbors', () => {
  const original = { ...reducer(undefined, { type: 'init' }), containers: fixture([column('a', 50), column('b', 50)]) };
  const history = undoable(reducer);
  const changed = history({ past: [], present: original, future: [] }, setColumnWidth({ id: 'a', value: 30 }));
  assert.deepEqual(resolve(changed.present.containers).widthsById, { a: 30, b: 70 });
  assert.equal(changed.past.length, 1);
  assert.deepEqual(history(changed, ActionCreators.undo()).present, original);
});


const resolveState = state => resolveResumeLayout({
  containersById: state.containers.byId,
  orderedContainerIds: state.containers.allIds,
  rowContentWidth: state.layout.rowContentWidth,
});

test('five rows can become left or right full-height sidebars without a dummy container', () => {
  for (const role of ['leftSidebar', 'rightSidebar']) {
    const original = { ...reducer(undefined, { type: 'init' }), containers: fixture(['a', 'b', 'c', 'd', 'e'].map(row)) };
    const state = reducer(original, configureContainer({ id: 'c', role }));
    const layout = resolveState(state);
    assert.deepEqual(layout.errors, []);
    assert.equal(layout.hasRowContentTrack, true);
    assert.deepEqual(layout.columnIds, ['c']);
    assert.equal(state.containers.allIds.length, 5);
    assert.equal(state.containers.byId[ROW_CONTENT_TRACK], undefined);
    assert.equal(layout.placementsByContainerId.c.rowSpan, 4);
    assert.equal(getContainerRole(layout, state.containers.byId.c), role);
    assert.equal(getContainerRole(layout, state.containers.byId.a), 'row');
    assertTilesPage(layout);
    const back = reducer(state, configureContainer({ id: 'c', role: 'row' }));
    assert.equal(resolveState(back).columnIds.length, 0);
    assertTilesPage(resolveState(back));
  }
});

test('rows share one width between two sidebars and inherit the correct page boundaries', () => {
  const layout = resolve(fixture([column('l', 20, true), row('h'), row('f'), column('r', 25, true)]));
  assert.equal(layout.widthsById.l, 20);
  assert.equal(layout.widthsById.r, 25);
  assert.ok(Math.abs(layout.widthsById[ROW_CONTENT_TRACK] - 55) < 1e-10);
  assert.deepEqual(layout.trackIds, ['l', ROW_CONTENT_TRACK, 'r']);
  assert.equal(layout.resizeNeighborsByContainerId.l, ROW_CONTENT_TRACK);
  assert.equal(layout.resizeNeighborsByContainerId.h, 'r');
  assert.equal(layout.resizeTrackByContainerId.h, ROW_CONTENT_TRACK);
  assert.deepEqual(layout.boundariesByContainerId.h, { top: 'page', bottom: 'containerVertical', left: 'containerHorizontal', right: 'containerHorizontal' });
  assert.equal(layout.boundariesByContainerId.l.left, 'page');
  assert.equal(layout.boundariesByContainerId.r.right, 'page');
  assertTilesPage(layout);
});

test('implicit track manual and drag resizing persist and undo with their sidebar', () => {
  for (const role of ['leftSidebar', 'rightSidebar']) {
    const initial = { ...reducer(undefined, { type: 'init' }), containers: fixture([row('a'), row('b'), row('c')]) };
    const original = reducer(initial, configureContainer({ id: 'a', role }));
    const history = undoable(reducer);
    const edited = history({ past: [], present: original, future: [] }, setColumnWidth({ id: 'a', value: 25 }));
    assert.equal(resolveState(edited.present).widthsById.a, 25);
    assert.equal(resolveState(edited.present).widthsById[ROW_CONTENT_TRACK], 75);
    assert.deepEqual(history(edited, ActionCreators.undo()).present, original);
    const [leftContainerId, rightContainerId] = resolveState(edited.present).trackIds;
    const resized = reducer(edited.present, resizeContainerPair({ leftContainerId, rightContainerId, leftWidth: 40, rightWidth: 60 }));
    const restored = reducer(undefined, setResume(JSON.parse(JSON.stringify(resized))));
    assert.equal(resolveState(restored).widthsById[leftContainerId], 40);
    assert.equal(resolveState(restored).widthsById[rightContainerId], 60);
    assert.equal(restored.containers.byId[ROW_CONTENT_TRACK], undefined);
  }
});

test('converting the last ordinary column to a row preserves sidebar sides', () => {
  for (const role of ['header', 'footer']) {
    const initial = { ...reducer(undefined, { type: 'init' }), containers: fixture([column('l', 20, true), column('body', 60), column('r', 20, true)]) };
    const state = reducer(initial, configureContainer({ id: 'body', role }));
    const layout = resolveState(state);
    assert.deepEqual(layout.errors, []);
    assert.equal(getContainerRole(layout, state.containers.byId.l), 'leftSidebar');
    assert.equal(getContainerRole(layout, state.containers.byId.r), 'rightSidebar');
    assertTilesPage(layout);
    const back = reducer(state, configureContainer({ id: 'body', role: 'column' }));
    assert.equal(resolveState(back).hasRowContentTrack, false);
    assertTilesPage(resolveState(back));
  }
});
