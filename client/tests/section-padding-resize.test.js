import assert from 'node:assert/strict';
import test from 'node:test';
import { build } from 'esbuild';
import undoable, { ActionCreators } from 'redux-undo';
import reducer, { updateSection } from '../src/store/resumeSlice.js';
import { resolveResumePresentation } from '../src/utils/resumePresentation.js';

// Exercise the hook's pointer handlers without a browser or React renderer.
const h = globalThis.paddingHarness = {};
const bundle = await build({
  entryPoints: [new URL('../src/pages/ResumeEditorPage/features/ResumePaper/helpers/useSectionPaddingResize.js', import.meta.url).pathname],
  bundle: true, write: false, format: 'esm', platform: 'node',
  plugins: [{ name: 'hook-harness', setup(b) {
    b.onResolve({ filter: /^(react|react-redux|@\/store\/resumeSlice.js|\.\/PaddingPreviewContext)$/ }, a => ({ path: a.path, namespace: 'mock' }));
    b.onResolve({ filter: /^@\/utils\// }, a => ({ path: new URL('../src/utils/' + a.path.slice('@/utils/'.length), import.meta.url).pathname }));
    b.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ contents: `
      const h = globalThis.paddingHarness;
      export const useContext = () => ({preview: h.preview, setPreview: value => h.preview = value});
      export const useEffect = () => {};
      export const useRef = () => h.ref;
      export const useSelector = select => select(h.state);
      export const useDispatch = () => action => h.actions.push(action);
      export const updateSection = payload => ({type:'resume/updateSection', payload});
      export const PaddingPreviewContext = {};
    ` }));
  } }],
});
const { default: useResize } = await import('data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64'));
const upper = { id: 'u', layout: { padding: { bottom: '1rem' } } };
const lower = { id: 'l', layout: { padding: { top: '0.5rem' } } };
const container = { sectionIds: ['u', 'l'] };
const target = {
  closest: () => ({ offsetHeight: 100, getBoundingClientRect: () => ({ height: 50 }) }),
  setPointerCapture() {}, hasPointerCapture: () => true, releasePointerCapture() {},
};
const event = y => ({ clientY: y, pointerId: 1, button: 0, currentTarget: target, stopPropagation() {}, preventDefault() {} });
function setup(t, selection = ['l']) {
  t.mock.method(globalThis, 'getComputedStyle', () => ({ fontSize: '16px' }));
  h.ref = { current: null }; h.actions = []; h.preview = null;
  h.state = { resume: { present: { layout: { gap: { vertical: '0.25rem' } }, activeSectionIds: selection, sections: { byId: { u: upper, l: lower } } } } };
  return useResize(upper, container).handleProps;
}
// The hook only needs these two browser globals for zoom/rem conversion.
globalThis.document = { documentElement: {} };
globalThis.getComputedStyle = () => ({});

test('lower-only drags adjust only top padding in either direction and clamp at zero effective padding', t => {
  const p = setup(t);
  p.onPointerDown(event(0));
  p.onPointerMove(event(-8));
  assert.deepEqual(h.preview, { target: 'section', id: 'l', side: 'top', value: 1.5 });
  p.onPointerUp(event(-8));
  assert.deepEqual(h.actions.pop(), updateSection({ id: 'l', layout: { padding: { top: '1.5rem' } } } ));
  p.onPointerDown(event(0)); p.onPointerUp(event(80));
  assert.deepEqual(h.actions.pop().payload, { id: 'l', layout: { padding: { top: '-0.25rem' } } });
});

test('selection is fixed at drag start; cancel discards previews; keyboard uses top padding', t => {
  let p = setup(t);
  p.onPointerDown(event(0));
  h.state.resume.present.activeSectionIds = ['u'];
  p = useResize(upper, container).handleProps;
  p.onPointerUp(event(2));
  assert.equal(h.actions.pop().payload.id, 'l');
  p.onPointerDown(event(0)); p.onPointerMove(event(8)); p.onPointerCancel(event(8));
  assert.equal(h.preview, null); assert.equal(h.actions.length, 0);
  h.state.resume.present.activeSectionIds = ['l'];
  p = useResize(upper, container).handleProps;
  p.onKeyDown({ ...event(0), key: 'ArrowDown' });
  assert.equal(h.actions.pop().payload.layout.padding.top, '0.4rem');
});

test('default and multi-selection keep changing only the upper bottom padding', t => {
  const p = setup(t, ['u', 'l']);
  p.onPointerDown(event(0)); p.onPointerUp(event(4));
  assert.deepEqual(h.actions.pop().payload, { id: 'u', layout: { padding: { bottom: '1.5rem' } } });
});

test('one undo/redo restores the lower padding while the upper section stays unchanged', () => {
  const original = { ...reducer(undefined, { type: 'init' }), sections: { allIds: ['u', 'l'], byId: { u: upper, l: lower } } };
  const history = undoable(reducer);
  const after = history({ past: [], present: original, future: [] }, updateSection({ id: 'l', layout: { padding: { top: '1.5rem' } } } ));
  assert.equal(after.past.length, 1);
  assert.deepEqual(after.present.sections.byId.u, upper);
  const undone = history(after, ActionCreators.undo());
  assert.deepEqual(undone.present, original);
  assert.deepEqual(history(undone, ActionCreators.redo()).present, after.present);
});

test('section handles use section gap and include the container offset in the zero bound', t => {
  setup(t);
  h.state.resume.present.layout.gap = { vertical: '9rem', section: '0.25rem' };
  const withOffsets = { ...container, layout: { padding: { top: '0.75rem' } } };
  const p = useResize(upper, withOffsets).handleProps;
  p.onPointerDown(event(0));
  p.onPointerUp(event(80));
  assert.equal(h.actions.pop().payload.layout.padding.top, '-1rem');
});

test('section drag preview order determines the selected lower neighbor', t => {
  setup(t);
  const p = useResize(upper, { ...container, sectionIds: ['l', 'u'] }, ['u', 'l']).handleProps;
  p.onKeyDown({ ...event(0), key: 'ArrowDown' });
  assert.equal(h.actions.pop().payload.id, 'l');
});

function setupRows(t) {
  setup(t);
  const resume = h.state.resume.present;
  resume.layout = {
    gap: { section: '0.25rem', vertical: '1.25rem' },
    padding: { top: '2rem', bottom: '3rem' },
  };
  resume.containers = {
    allIds: ['first', 'last'],
    byId: {
      first: { id: 'first', type: 'row', sectionIds: ['u'], layout: { padding: { top: '-0.5rem', bottom: '0.5rem' } } },
      last: { id: 'last', type: 'row', sectionIds: ['l'], layout: { padding: { top: '-2rem', bottom: '0.75rem' } } },
    },
  };
  resume.sections.byId = structuredClone({ u: upper, l: lower });
  resume.sections.byId.l.layout.padding.top = '2rem';
  const render = (id, edge = 'bottom') => {
    const state = h.state.resume.present;
    const p = resolveResumePresentation(state);
    const presentation = p.sectionsById[id];
    const c = state.containers.byId[presentation.containerId];
    return useResize(state.sections.byId[id], c, p.containersById[c.id].sectionIds, {
      edge, boundaries: presentation.boundaries,
    });
  };
  const applyLastAction = () => {
    h.state.resume.present = reducer(h.state.resume.present, h.actions.at(-1));
    return resolveResumePresentation(h.state.resume.present);
  };
  return { render, applyLastAction };
}

test('row and page bottom edges reach zero using their own bases, even when another row is selected', t => {
  const { render, applyLastAction } = setupRows(t);
  for (const [id, minimum] of [['u', '-1.75rem'], ['l', '-3.75rem']]) {
    const p = render(id).handleProps;
    p.onPointerDown(event(0));
    p.onPointerMove(event(-800));
    assert.equal(render(id).paddingLabel, 'Bottom padding: 0rem');
    p.onPointerUp(event(-800));
    assert.deepEqual(h.actions.at(-1).payload, { id, layout: { padding: { bottom: minimum } } });
    assert.equal(applyLastAction().sectionsById[id].padding.paddingBottom, '0rem');

    // The very next step must visibly increase spacing, without a dead range.
    render(id).handleProps.onKeyDown({ ...event(0), key: 'ArrowDown' });
    const padding = applyLastAction().sectionsById[id].padding.paddingBottom;
    assert.ok(Math.abs(parseFloat(padding) - 0.1) < 1e-10);
  }
});

test('explicit top handles reach zero at page and row edges, including a negative container base', t => {
  const { render, applyLastAction } = setupRows(t);
  for (const [id, minimum] of [['u', '-1.5rem'], ['l', '0.75rem']]) {
    const p = render(id, 'top').handleProps;
    p.onPointerDown(event(0));
    p.onPointerUp(event(800));
    assert.deepEqual(h.actions.at(-1).payload, { id, layout: { padding: { top: minimum } } });
    assert.equal(applyLastAction().sectionsById[id].padding.paddingTop, '0rem');
    render(id, 'top').handleProps.onKeyDown({ ...event(0), key: 'ArrowUp' });
    const padding = applyLastAction().sectionsById[id].padding.paddingTop;
    assert.ok(Math.abs(parseFloat(padding) - 0.1) < 1e-10);
  }
});

test('first-section top handle edits itself even when the next section is selected', t => {
  setup(t);
  h.state.resume.present.layout.padding = { top: '2rem' };
  const p = useResize(upper, container, container.sectionIds, {
    edge: 'top', boundaries: { top: 'page', bottom: 'section' },
  }).handleProps;
  p.onPointerDown(event(0));
  p.onPointerUp(event(-8));
  assert.deepEqual(h.actions.at(-1).payload, { id: 'u', layout: { padding: { top: '1rem' } } });
});

test('legacy row boundaries use the normalized vertical gap rather than the legacy section gap', t => {
  const { render, applyLastAction } = setupRows(t);
  h.state.resume.present.layout.gap = { vertical: '9rem' };
  const p = render('u').handleProps;
  p.onPointerDown(event(0));
  p.onPointerUp(event(-800));
  assert.equal(h.actions.at(-1).payload.layout.padding.bottom, '-0.5rem');
  assert.equal(applyLastAction().sectionsById.u.padding.paddingBottom, '0rem');
});

test('drag indicator shows total rendered padding and disappears on cancel or release without creating a no-op edit', t => {
  const { render } = setupRows(t);
  const p = render('l').handleProps;
  assert.equal(render('l').paddingLabel, null);
  p.onPointerDown(event(0));
  assert.equal(render('l').paddingLabel, 'Bottom padding: 3.75rem');
  p.onPointerMove(event(8));
  assert.equal(render('l').paddingLabel, 'Bottom padding: 4.75rem');
  p.onLostPointerCapture(event(8));
  assert.equal(render('l').paddingLabel, null);
  assert.equal(h.actions.length, 0);
  p.onPointerDown(event(0));
  p.onPointerUp(event(0));
  assert.equal(render('l').paddingLabel, null);
  assert.equal(h.actions.length, 0);
});

test('internal handle keeps its top-padding indicator when selection changes during the drag', t => {
  const p = setup(t);
  p.onPointerDown(event(0));
  h.state.resume.present.activeSectionIds = ['u'];
  const rerendered = useResize(upper, container);
  assert.equal(rerendered.paddingLabel, 'Top padding: 0.75rem');
  p.onPointerUp(event(-8));
  assert.equal(h.actions.at(-1).payload.id, 'l');
});
