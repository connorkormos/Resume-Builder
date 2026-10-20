import assert from 'node:assert/strict';
import test from 'node:test';
import { build } from 'esbuild';
import undoable, { ActionCreators } from 'redux-undo';
import reducer, { updateSection } from '../src/store/resumeSlice.js';

// Exercise the hook's pointer handlers without a browser or React renderer.
const h = globalThis.paddingHarness = {};
const bundle = await build({
  entryPoints: [new URL('../src/features/ResumeEditor/ResumePaper/useSectionPaddingResize.js', import.meta.url).pathname],
  bundle: true, write: false, format: 'esm', platform: 'node',
  plugins: [{ name: 'hook-harness', setup(b) {
    b.onResolve({ filter: /^(react|react-redux|@\/store\/resumeSlice.js|\.\/PaddingPreviewContext)$/ }, a => ({ path: a.path, namespace: 'mock' }));
    b.onResolve({ filter: /^@\/utils\/formatters.js$/ }, () => ({ path: new URL('../src/utils/formatters.js', import.meta.url).pathname }));
    b.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ contents: `
      const h = globalThis.paddingHarness;
      export const useContext = () => ({setPreview: value => h.preview = value});
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
