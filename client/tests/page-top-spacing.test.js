import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';

// Set CHROMIUM_PATH to run actual CSS/grid layout and pagination, not DOM mocks.
const browser = process.env.CHROMIUM_PATH;
const paper = new URL('../src/pages/ResumeEditorPage/features/ResumePaper/', import.meta.url);
test('page-top spacing agrees with pagination in a browser', { skip: !browser }, async () => {
  const source = await readFile(new URL('helpers/useResumePagination.js', paper), 'utf8');
  const css = await readFile(new URL('Section.module.css', paper), 'utf8');
  const checks = String.raw`
    const check = (label, actual, expected) => {
      if (JSON.stringify(actual) !== JSON.stringify(expected))
        throw new Error(label + ': ' + JSON.stringify(actual) + ' != ' + JSON.stringify(expected));
    };
    const page = document.createElement('div');
    page.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto 1fr;width:400px;height:200px;--resume-page-padding-top:40px';
    document.body.append(page);
    const container = (id, row, column) => {
      const el = document.createElement('div');
      el.dataset.containerId = id;
      el.style.cssText = 'display:flex;flex-direction:column;min-width:0;grid-row:' + row + ';grid-column:' + column;
      page.append(el);
      return el;
    };
    const section = (parent, id) => {
      const el = document.createElement('div');
      el.className = 'resumeSection sectionContainerDiv';
      el.dataset.sectionId = id;
      el.style.cssText = 'padding:7px 11px 13px 17px;flex:0 0 auto;box-sizing:border-box';
      parent.append(el);
      return el;
    };
    try {
      const left = container('left', '2', '1'), right = container('right', '2', '2');
      const a = section(left, 'a'), b = section(left, 'b'), c = section(right, 'c');
      const tops = () => [a,b,c].map(el => getComputedStyle(el).paddingTop);
      applyPageTopSpacing(page, 1);
      check('page one', tops(), ['7px','7px','7px']);
      applyPageTopSpacing(page, 2);
      check('collapsed row and independent columns', tops(), ['40px','7px','40px']);
      check('other sides', [getComputedStyle(a).paddingRight, getComputedStyle(a).paddingBottom, getComputedStyle(a).paddingLeft], ['11px','13px','17px']);
      const header = container('header', '1', '1 / span 2'), h = section(header, 'h');
      applyPageTopSpacing(page, 2);
      check('header displaces columns', tops(), ['7px','7px','7px']);
      check('header inset', getComputedStyle(h).paddingTop, '40px');
      header.remove(); a.remove();
      applyPageTopSpacing(page, 2);
      check('next fragment becomes first', getComputedStyle(b).paddingTop, '40px');
      page.style.setProperty('--resume-page-padding-top', '0px');
      check('zero inset', getComputedStyle(b).paddingTop, '0px');
      applyPageTopSpacing(page, 1);
      check('restore offsets', getComputedStyle(b).paddingTop, '7px');
      page.replaceChildren();
      page.style.gridTemplateRows = '1fr';
      page.style.setProperty('--resume-page-padding-top', '40px');
      const body = container('body', '1', '1 / span 2'), s = section(body, 's');
      s.style.paddingBottom = '0px';
      const resume = {
        containers: { allIds: ['body'], byId: { body: { sectionIds: ['s'] } } },
        sections: { byId: { s: { subsectionIds: ['sub'] } } },
        subsections: { byId: { sub: { fieldIds: ['f1','f2','f3','f4'] } } },
        fields: { byId: {} },
      };
      const sub = document.createElement('div');
      sub.className = 'resumeSubsection'; sub.dataset.subsectionId = 'sub'; s.append(sub);
      for (const id of resume.subsections.byId.sub.fieldIds) {
        const field = document.createElement('div');
        field.className = 'resumeField'; field.dataset.fieldId = id; field.style.height = '85px';
        sub.append(field); resume.fields.byId[id] = {};
      }
      applyPageTopSpacing(page, 2);
      const templates = prepareTemplates(resume, collectTemplates([page]));
      check('clones discard page-top status', templates.sections.get('s').hasAttribute('data-pagination-page-top'), false);
      const host = document.createElement('div'); document.body.append(host);
      const assignments = calculateAssignments(resume, page, templates, host);
      check('continued subsection respects inset', assignments.fields, {f1:1,f2:1,f3:2,f4:3});
      check('stable measurement', calculateAssignments(resume, page, templates, host), assignments);
      // Whole subsections, then whole sections, should make the same page breaks.
      resume.sections.byId.s.subsectionIds = [];
      for (const id of resume.subsections.byId.sub.fieldIds) {
        const fragment = sub.cloneNode(false);
        fragment.dataset.subsectionId = id;
        fragment.append(sub.querySelector('[data-field-id="' + id + '"]'));
        s.append(fragment);
        resume.subsections.byId[id] = { fieldIds: [id] };
        resume.sections.byId.s.subsectionIds.push(id);
      }
      sub.remove();
      const measure = () => calculateAssignments(resume, page, prepareTemplates(resume, collectTemplates([page])), host);
      check('whole subsection continuation', measure().fields, assignments.fields);
      resume.containers.byId.body.sectionIds = [];
      for (const id of resume.sections.byId.s.subsectionIds) {
        const whole = section(body, id);
        whole.style.paddingBottom = '0px';
        whole.append(s.querySelector('[data-subsection-id="' + id + '"]'));
        resume.sections.byId[id] = { subsectionIds: [id] };
        resume.containers.byId.body.sectionIds.push(id);
      }
      s.remove();
      check('whole section starts at page top', measure().fields, assignments.fields);
      // Exercise the actual hook with ResumeEditorPage's zero-based ref keys.
      const firstPage = page.cloneNode(true);
      document.body.append(firstPage);
      window.testResume = resume;
      useResumePagination({ current: new Map([
        [0, { current: firstPage }], [1, { current: page }],
      ]) });
      const cleanup = window.testLayoutEffect();
      check('hook leaves first paper unchanged', getComputedStyle(firstPage.querySelector('.resumeSection')).paddingTop, '7px');
      check('hook applies inset to second paper', getComputedStyle(page.querySelector('.resumeSection')).paddingTop, '40px');
      cleanup();
      document.body.innerHTML = '<pre id="result">ok</pre>';
    } catch (error) {
      document.body.innerHTML = '<pre id="result">' + error.message + '</pre>';
    }
  `;
  const bundle = await build({
    stdin: { contents: source + '\n' + checks, resolveDir: new URL('helpers/', paper).pathname },
    alias: { '@': new URL('../src', import.meta.url).pathname },
    bundle: true, write: false, format: 'iife', platform: 'browser',
    define: { 'process.env.NODE_ENV': '"production"' },
    plugins: [{
      name: 'hook-harness',
      setup(build) {
        build.onResolve({ filter: /^(react|react-redux)$/ }, args => ({ path: args.path, namespace: 'hooks' }));
        build.onLoad({ filter: /.*/, namespace: 'hooks' }, () => ({ contents: `
          export const useLayoutEffect = effect => { window.testLayoutEffect = effect; };
          export const useDispatch = () => () => {};
          export const useSelector = selector => selector({resume: {present: window.testResume}});
        ` }));
      },
    }],
  });
  const dir = await mkdtemp(join(tmpdir(), 'resume-spacing-'));
  try {
    const file = join(dir, 'test.html');
    await writeFile(file, `<body><style>${css}</style><script>${bundle.outputFiles[0].text}</script>`);
    const html = execFileSync(browser, ['--headless', `--user-data-dir=${join(dir, 'profile')}`, '--no-sandbox', '--disable-gpu', '--dump-dom', `file://${file}`], { encoding: 'utf8', timeout: 30000, stdio: ['ignore', 'pipe', 'pipe'] });
    assert.equal(html.match(/<pre id="result">([^<]+)<\/pre>/)?.[1], 'ok');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
