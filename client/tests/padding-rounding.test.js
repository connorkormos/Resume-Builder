import assert from 'node:assert/strict';
import test from 'node:test';
import { build } from 'esbuild';
import { roundMathMax } from '../src/utils/formatters.js';

// Run the actual handlers with browser geometry and Redux/context boundaries mocked.
const h = globalThis.paddingRoundingHarness = {};
globalThis.document = { documentElement: {} };
globalThis.getComputedStyle = () => ({});
const paper = '@/pages/ResumeEditorPage/features/ResumePaper';
const bundle = await build({
  stdin: {
    contents: `
      export { default as useResize, resolveSectionPadding } from '${paper}/hooks/useSectionPaddingResize.js';
      export { default as MarginIndicator } from '${paper}/components/MarginRuler/MarginIndicator.jsx';
      export { previewPadding } from '@/utils/resumePresentation.js';
    `,
    resolveDir: new URL('../src', import.meta.url).pathname,
  },
  alias: { '@': new URL('../src', import.meta.url).pathname },
  bundle: true, write: false, format: 'esm', platform: 'node', jsx: 'automatic',
  plugins: [{ name: 'padding-harness', setup(b) {
    b.onResolve({ filter: /^(react|react\/jsx-runtime|react-redux|@\/store\/resumeSlice(?:\.js)?|@\/context\/PaddingPreviewContext)$/ }, a => ({ path: a.path, namespace: 'mock' }));
    b.onLoad({ filter: /.*/, namespace: 'mock' }, () => ({ contents: `
      const h = globalThis.paddingRoundingHarness;
      export const jsx = (type, props) => ({ type, props });
      export const useContext = () => ({ preview: h.preview, setPreview: value => h.preview = value });
      export const useEffect = () => {};
      export const useRef = initial => h.refs[h.refIndex++] ??= { current: initial };
      export const useSelector = select => select(h.state);
      export const useDispatch = () => action => h.actions.push(action);
      export const updateResume = payload => ({ type: 'resume/updateResume', payload });
      export const updateContainer = payload => ({ type: 'resume/updateContainer', payload });
      export const updateSection = payload => ({ type: 'resume/updateSection', payload });
      export const PaddingPreviewContext = {};
    ` }));
  } }],
});
const { useResize, MarginIndicator, resolveSectionPadding, previewPadding } = await import(
  'data:text/javascript;base64,' + Buffer.from(bundle.outputFiles[0].text).toString('base64')
);

function setup(t, { target = 'resume', side = 'left', value = '1rem', base = 0.5 } = {}) {
  t.mock.method(globalThis, 'getComputedStyle', () => ({ fontSize: '16px' }));
  h.refs = []; h.refIndex = 0; h.actions = []; h.preview = null;
  const section = { id: 's', layout: { padding: { [side]: value } } };
  const container = { sectionIds: ['s'], layout: {} };
  h.state = { resume: { present: {
    layout: { padding: { [side]: value }, gap: { section: `${base}rem` } },
    activeSectionIds: ['s'], sections: { byId: { s: section } },
  } } };
  const geometry = { offsetHeight: 100, offsetWidth: 100, getBoundingClientRect: () => ({ height: 100, width: 100 }) };
  const element = {
    parentElement: geometry, closest: () => geometry, focus() {},
    setPointerCapture() {}, hasPointerCapture: () => true, releasePointerCapture() {},
  };
  const event = (position = 0) => ({
    clientX: position, clientY: position, pointerId: 1, button: 0, currentTarget: element,
    stopPropagation() {}, preventDefault() {},
  });
  const renderSection = () => {
    h.refIndex = 0;
    return useResize(section, container, ['s'], { edge: side });
  };
  const renderRuler = () => {
    h.refIndex = 0;
    return MarginIndicator({ target, id: target === 'resume' ? null : 's', side, value, pageRef: { current: geometry } }).props;
  };
  return { event, renderSection, renderRuler };
}

test('roundMathMax returns numeric hundredths and preserves negative offsets', () => {
  assert.equal(roundMathMax(0, 3.7439004221), 3.74);
  assert.equal(roundMathMax(-Infinity, -0.746), -0.75);
  assert.equal(roundMathMax(0, -1), 0);
  assert.equal(roundMathMax(0.1 + 0.2), 0.3);
});

test('ruler preview and release use numeric hundredths; unchanged and canceled drags do not commit', t => {
  const { event, renderRuler } = setup(t);
  const p = renderRuler();
  p.onPointerDown(event()); p.onPointerUp(event());
  assert.equal(h.actions.length, 0);
  p.onPointerDown(event()); p.onPointerUp(event(0.064));
  assert.equal(h.actions.length, 0);
  p.onPointerDown(event()); p.onPointerMove(event(43.9024067536));
  assert.equal(h.preview.value, 3.74);
  p.onPointerUp(event(43.9024067536));
  assert.equal(h.actions.at(-1).payload.layout.padding.left, '3.74rem');
  p.onPointerDown(event()); p.onPointerMove(event(16)); p.onPointerCancel(event(16));
  assert.equal(h.actions.length, 1);
  assert.equal(h.preview, null);
});

test('ruler keyboard commits use the same precision and retain negative container offsets', t => {
  let harness = setup(t, { value: '3.7439004221rem' });
  harness.renderRuler().onKeyDown({ ...harness.event(), key: 'ArrowRight' });
  assert.equal(h.actions.at(-1).payload.layout.padding.left, '3.84rem');
  harness = setup(t, { target: 'container', value: '-0.746rem' });
  harness.renderRuler().onKeyDown({ ...harness.event(), key: 'ArrowLeft' });
  assert.equal(h.actions.at(-1).payload.layout.padding.left, '-0.85rem');
});

test('section pointer and keyboard commits match their preview and ignore sub-hundredth movement', t => {
  const { event, renderSection } = setup(t, { side: 'bottom' });
  const p = renderSection().handleProps;
  p.onPointerDown(event()); p.onPointerUp(event(0.064));
  assert.equal(h.actions.length, 0);
  p.onPointerDown(event()); p.onPointerMove(event(1));
  assert.equal(h.preview.value, 1.06);
  p.onPointerUp(event(1));
  assert.equal(h.actions.at(-1).payload.layout.padding.bottom, '1.06rem');
  p.onKeyDown({ ...event(), key: 'ArrowDown' });
  assert.equal(h.actions.at(-1).payload.layout.padding.bottom, '1.1rem');
});

test('section rounding stays above positive and negative fractional minimum bounds', t => {
  for (const [base, expected] of [[0.746, -0.74], [-0.744, 0.75], [-(0.1 + 0.2), 0.3]]) {
    const { event, renderSection } = setup(t, { side: 'bottom', base });
    const p = renderSection().handleProps;
    p.onPointerDown(event()); p.onPointerMove(event(-100));
    assert.equal(h.preview.value, expected);
    p.onPointerUp(event(-100));
    assert.equal(h.actions.at(-1).payload.layout.padding.bottom, `${expected}rem`);
    assert.ok(expected >= -base - 1e-10);
  }
});

test('section labels can add numeric ruler previews, and presentation rounds final sums', t => {
  const { event, renderRuler, renderSection } = setup(t, { target: 'section', side: 'bottom' });
  const p = renderRuler();
  p.onPointerDown(event()); p.onPointerMove(event(1));
  assert.equal(renderSection().paddingLabel, 'Bottom padding: 1.56rem');
  assert.equal(previewPadding({}, h.preview, 'section', 's').padding.bottom, '1.06rem');
  const padding = resolveSectionPadding({
    boundaries: { top: 'page' }, resumeLayout: { padding: { top: '0.1rem' } },
    containerLayout: { padding: { top: '0.2rem' } }, sectionLayout: {},
  });
  assert.equal(padding.paddingTop, '0.3rem');
});
