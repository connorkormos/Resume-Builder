import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import { resolveResumePresentation } from '../src/utils/resumePresentation.js';
import { ROW_CONTENT_TRACK } from '../src/utils/resumeLayout.js';

const makeResume = () => ({
  styling: { backgroundColor: '#fff', display: 'flex', fontSize: '12px' },
  layout: { padding: { top: '2rem', bottom: '3rem', left: '2rem', right: '2rem' }, gap: { horizontal: '1rem', vertical: '0.4rem', section: '0.5rem' } },
  containers: {
    allIds: ['side', 'top', 'bottom'],
    byId: {
      side: { id: 'side', type: 'column', spanFullPage: true, sectionIds: ['s'], layout: { width: { value: '25%', auto: false }, padding: { right: '-0.25rem' } } },
      top: { id: 'top', type: 'row', sectionIds: ['a', 'b'], layout: { padding: { left: '0.2rem' } } },
      bottom: { id: 'bottom', type: 'row', sectionIds: ['c'], layout: {} },
    },
  },
  sections: {
    byId: Object.fromEntries(['s', 'a', 'b', 'c'].map((id, index) => [id, {
      id, containerId: ['side', 'top', 'top', 'bottom'][index], subsectionIds: [],
      value: [{ type: 'paragraph', children: [{ text: id }] }],
      styling: { backgroundColor: ['#acf', '#fab', '#bfa', '#ffa'][index] },
      layout: { padding: { bottom: '-0.1rem' } },
    }])),
  },
  subsections: { byId: {} }, fields: { byId: {} },
});

test('saved presentation covers sidebar/rows, full per-side gaps and independent section backgrounds', () => {
  const resume = makeResume();
  const before = structuredClone(resume);
  const p = resolveResumePresentation(resume);
  assert.equal(p.pageStyle.display, 'grid');
  assert.equal(p.pageStyle.padding, 0);
  assert.equal(p.pageStyle.gap, 0);
  assert.equal(p.containersById.side.style.gridRow, '1 / span 2');
  assert.equal(p.containersById.top.style.gridColumn, '2 / span 1');
  assert.equal(p.sectionsById.s.padding.paddingRight, '0.75rem');
  assert.equal(p.sectionsById.a.padding.paddingLeft, '1.2rem');
  assert.equal(p.sectionsById.a.padding.paddingBottom, '0.4rem');
  assert.equal(p.sectionsById.b.padding.paddingTop, '0.5rem');
  assert.ok(Math.abs(parseFloat(p.sectionsById.b.padding.paddingBottom) - 0.3) < 1e-10);
  assert.equal(p.sectionsById.c.padding.paddingBottom, '2.9rem');
  assert.equal(p.sectionsById.a.style.flex, '0 0 auto');
  assert.equal(p.sectionsById.b.style.flex, '1 0 auto');
  assert.equal(p.sectionsById.a.style.backgroundColor, '#fab');
  assert.equal(p.sectionsById.b.style.backgroundColor, '#bfa');
  assert.deepEqual(resume, before);
});

test('editor overlays change presentation without leaking into saved thumbnail data', () => {
  const resume = makeResume();
  const saved = resolveResumePresentation(resume);
  const moved = resolveResumePresentation(resume, {
    sectionIds: { side: ['s', 'a'], top: ['b'], bottom: ['c'] },
    widths: { side: 30, [ROW_CONTENT_TRACK]: 70 },
    padding: { target: 'container', id: 'side', side: 'right', value: 2 },
  });
  assert.equal(moved.sectionsById.a.containerId, 'side');
  assert.equal(moved.sectionsById.a.padding.paddingLeft, '2rem');
  assert.equal(moved.sectionsById.a.padding.paddingRight, '3rem');
  assert.equal(moved.sectionsById.s.padding.paddingBottom, '0.4rem');
  assert.equal(moved.sectionsById.b.padding.paddingTop, '2rem');
  assert.equal(moved.layout.widthsById.side, 30);
  assert.deepEqual(resolveResumePresentation(resume), saved);
  const adjusted = resolveResumePresentation(resume, { padding: { target: 'section', id: 'a', side: 'left', value: -5 } });
  assert.equal(adjusted.sectionsById.a.padding.paddingLeft, '0rem');
  const page = resolveResumePresentation(resume, { padding: { target: 'resume', id: null, side: 'top', value: 4 } });
  assert.equal(page.sectionsById.a.padding.paddingTop, '4rem');
});

test('legacy gaps, absent entities and section styling metadata resolve consistently', () => {
  const resume = makeResume();
  resume.layout.gap = { vertical: '0.7rem' };
  resume.containers.allIds.push('missing');
  resume.containers.byId.top.sectionIds.push('missing');
  resume.sections.byId.a.styling.border = { top: { display: true } };
  resume.sections.byId.a.styling.fontSizeOffset = 2;
  const p = resolveResumePresentation(resume);
  assert.equal(p.resumeLayout.gap.section, '0.7rem');
  assert.equal(p.resumeLayout.gap.vertical, '0rem');
  assert.deepEqual(p.containersById.top.sectionIds, ['a', 'b']);
  assert.equal(p.sectionsById.a.style.border, undefined);
  assert.equal(p.sectionsById.a.style.fontSizeOffset, undefined);
  assert.equal(resume.sections.byId.a.styling.fontSizeOffset, 2);
});

// Render the actual preview without Redux or editor providers. This catches old
// flex layouts/spacing calculations accidentally reintroduced in its components.
const bundle = await build({
  stdin: {
    contents: `import React from 'react'; import {renderToStaticMarkup} from 'react-dom/server';
      import PreviewPaper from './src/features/ResumePreview/components/PreviewPaper.jsx';
      export const render = resume => renderToStaticMarkup(React.createElement(PreviewPaper, {resume}));`,
    resolveDir: new URL('..', import.meta.url).pathname,
  },
  alias: { '@': new URL('../src', import.meta.url).pathname },
  bundle: true, write: false, format: 'cjs', platform: 'node', jsx: 'automatic',
  external: ['react', 'react-dom/server', 'react/jsx-runtime'],
});
const module = { exports: {} };
new Function('require', 'module', 'exports', bundle.outputFiles[0].text)(createRequire(import.meta.url), module, module.exports);
const renderPreview = module.exports.render;

test('actual thumbnail markup uses shared grid, spacing, backgrounds and fill styles', () => {
  const resume = makeResume();
  const html = renderPreview(resume);
  const p = resolveResumePresentation(resume);
  assert.ok(html.includes(`grid-template-columns:${p.pageStyle.gridTemplateColumns}`));
  for (const id of p.containerIds) {
    const tag = html.match(new RegExp(`<div style="([^"]*)" data-container-id="${id}">`));
    assert.ok(tag, id);
    assert.ok(tag[1].includes(`grid-row:${p.containersById[id].style.gridRow}`));
    assert.ok(tag[1].includes(`grid-column:${p.containersById[id].style.gridColumn}`));
  }
  for (const [id, section] of Object.entries(p.sectionsById)) {
    const tag = html.match(new RegExp(`<div style="([^"]*)" data-section-id="${id}">`));
    assert.ok(tag, id);
    for (const [key, value] of Object.entries(section.padding)) {
      const cssKey = key.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`);
      assert.ok(tag[1].includes(`${cssKey}:${value}`), `${id}:${key}`);
    }
    assert.ok(tag[1].includes(`background-color:${section.style.backgroundColor}`));
    assert.ok(tag[1].includes(`flex:${section.style.flex}`));
  }
  assert.ok(!html.includes('Drop a section here'));
  assert.ok(!html.includes('<button'));
});

test('independent preview documents cannot inherit each other’s widths or margins', () => {
  const first = makeResume();
  const second = makeResume();
  second.layout.padding.left = '5rem';
  second.containers.byId.side.layout.width.value = '40%';
  const firstHtml = renderPreview(first);
  const secondHtml = renderPreview(second);
  assert.notEqual(firstHtml, secondHtml);
  assert.equal(renderPreview(first), firstHtml);
});
