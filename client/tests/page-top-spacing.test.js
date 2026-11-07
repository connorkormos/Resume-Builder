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
  const source = await readFile(new URL('hooks/useResumePagination.js', paper), 'utf8');
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

      // Reproduce a trailing row backfilling the gap left by a column spill.
      const flow = {
        containers: { allIds: [], byId: {} }, sections: { byId: {} },
        subsections: { byId: {} }, fields: { byId: {} },
      };
      page.replaceChildren();
      page.style.setProperty('--resume-page-padding-top', '0px');
      const addContainer = (id, type, heights, spanFullPage = false) => {
        flow.containers.allIds.push(id);
        flow.containers.byId[id] = { id, type, spanFullPage, sectionIds: [id] };
        flow.sections.byId[id] = { subsectionIds: [] };
        const el = container(id, '1', '1');
        const content = section(el, id);
        content.style.padding = '0px';
        heights.forEach((height, index) => {
          const subId = id + index;
          flow.sections.byId[id].subsectionIds.push(subId);
          flow.subsections.byId[subId] = { fieldIds: [subId] };
          flow.fields.byId[subId] = {};
          const sub = document.createElement('div');
          sub.className = 'resumeSubsection'; sub.dataset.subsectionId = subId;
          const field = document.createElement('div');
          field.className = 'resumeField'; field.dataset.fieldId = subId;
          field.textContent = subId;
          field.style.lineHeight = height + 'em';
          sub.append(field); content.append(sub);
        });
      };
      addContainer('sidebar', 'column', [140,140,140,140], true);
      addContainer('top', 'row', [20]);
      addContainer('left', 'column', [60]);
      addContainer('right', 'column', [70,70]);
      addContainer('bottom', 'row', [50]);
      addContainer('otherSidebar', 'column', [30], true);
      const layout = resolveResumeLayout({
        containersById: flow.containers.byId, orderedContainerIds: flow.containers.allIds,
      });
      check('central groups', layout.paginationGroups, [['top'],['left','right'],['bottom']]);
      check('independent sidebars', layout.independentContainerIds, ['sidebar','otherSidebar']);
      page.style.gridTemplateRows = layout.gridTemplateRows;
      page.style.gridTemplateColumns = layout.gridTemplateColumns;
      for (const [id, placement] of Object.entries(layout.placementsByContainerId)) {
        const el = page.querySelector('[data-container-id="' + id + '"]');
        el.style.gridRow = placement.rowStart + ' / span ' + placement.rowSpan;
        el.style.gridColumn = placement.columnStart + ' / span ' + placement.columnSpan;
      }
      const paginate = fontSize => {
        page.style.fontSize = fontSize + 'px';
        host.replaceChildren();
        return calculateAssignments(flow, page, prepareTemplates(flow, collectTemplates([page])), host);
      };
      check('row initially overflows', paginate(1).fields.bottom0, 2);
      const expanded = paginate(1.3);
      check('longer column spills', [expanded.fields.right0, expanded.fields.right1], [1,2]);
      check('row follows continuation on same page', expanded.fields.bottom0, 2);
      check('columns begin together', [expanded.fields.left0, expanded.fields.right0], [1,1]);
      check('sidebar does not push center forward', expanded.fields.sidebar3, 4);
      check('center does not push sidebar forward', expanded.fields.otherSidebar0, 1);
      check('stable repagination', paginate(1.3), expanded);
      const shrunk = paginate(0.8);
      check('row can move back after columns', [shrunk.fields.right1, shrunk.fields.bottom0], [1,1]);
      page.querySelector('[data-field-id="bottom0"]').style.lineHeight = '100em';
      check('row advances if continuation leaves insufficient space', paginate(1.3).fields.bottom0, 3);
      page.querySelector('[data-field-id="bottom0"]').style.lineHeight = '50em';
      // One oversized subsection now splits into fields over two pages.
      const firstSub = page.querySelector('[data-subsection-id="right0"]');
      const secondSub = page.querySelector('[data-subsection-id="right1"]');
      firstSub.append(secondSub.firstElementChild); secondSub.remove();
      flow.sections.byId.right.subsectionIds = ['right0'];
      flow.subsections.byId.right0.fieldIds = ['right0','right1'];
      page.querySelector('[data-field-id="right0"]').style.lineHeight = '100em';
      page.querySelector('[data-field-id="right1"]').style.lineHeight = '100em';
      const split = paginate(1.3);
      check('split parent retains first page', split.sections.right, 2);
      check('split fields reach following page', [split.fields.right0, split.fields.right1], [2,3]);
      check('row follows last split field', split.fields.bottom0, 3);
      document.body.innerHTML = '<pre id="result">ok</pre>';
    } catch (error) {
      document.body.innerHTML = '<pre id="result">' + error.message + '</pre>';
    }
  `;
  const bundle = await build({
    stdin: { contents: source + '\n' + checks, resolveDir: new URL('hooks/', paper).pathname },
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
