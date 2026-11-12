import assert from 'node:assert/strict';
import test from 'node:test';
import { getResumePageCount } from '../src/utils/getResumePageCount.js';

const resume = () => ({
  containers: { byId: { c: { sectionIds: ['s'] } } },
  sections: { byId: { s: { pageNumber: 2, subsectionIds: ['sub'] } } },
  subsections: { byId: { sub: { pageNumber: 3, fieldIds: ['f'] } } },
  fields: { byId: { f: { pageNumber: 4 } } },
});

test('counts pages across each level and tolerates empty containers', () => {
  const state = resume();
  assert.equal(getResumePageCount(state), 4);
  state.subsections.byId.sub.fieldIds = [];
  assert.equal(getResumePageCount(state), 3);
  state.sections.byId.s.subsectionIds = [];
  assert.equal(getResumePageCount(state), 2);
  state.containers.byId.c.sectionIds = [];
  assert.equal(getResumePageCount(state), 1);
  state.containers.byId = {};
  assert.equal(getResumePageCount(state), 1);
});

test('invalid pages never erase valid pages or make the count nonfinite', () => {
  for (const invalid of [undefined, null, NaN, Infinity, -Infinity, 0, -1, 1.5, '4']) {
    const state = resume();
    state.fields.byId.f.pageNumber = invalid;
    assert.equal(getResumePageCount(state), 3);
    state.subsections.byId.sub.pageNumber = invalid;
    state.sections.byId.s.pageNumber = invalid;
    assert.equal(getResumePageCount(state), 1);
    assert.equal(Array.from({ length: getResumePageCount(state) }).length, 1);
  }
});
