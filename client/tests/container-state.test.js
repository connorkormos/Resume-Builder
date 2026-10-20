import assert from 'node:assert/strict';
import test from 'node:test';
import normalizeResumeFromApi from '../src/utils/normalizers/normalizeResumeFromApi.js';
import reducer, { setResume, updateContainer, resizeContainerPair, updateSection } from '../src/store/resumeSlice.js';

const apiResume = () => ({
  id: 1,
  containers: [
    { id: 20, position: 1, type: 'row', spanFullPage: true, layout: { width: { auto: false, value: '60%' } }, sections: [] },
    { id: 10, position: 0, layout: { width: { auto: false, value: '40%' } }, sections: [
      { id: 30, containerId: 10, type: 'header', layout: { grid: { columns: 2 } }, subsections: [] },
    ] },
  ],
});

test('normalization carries container metadata and leaves section grid columns intact', () => {
  const api = apiResume();
  const before = structuredClone(api);
  const state = normalizeResumeFromApi(api);
  assert.deepEqual(state.containers.allIds, [10, 20]);
  assert.equal(state.containers.byId[10].type, 'column');
  assert.equal(state.containers.byId[10].spanFullPage, false);
  assert.equal(state.containers.byId[20].type, 'row');
  assert.equal(state.containers.byId[20].spanFullPage, true);
  assert.equal(state.sections.byId[30].containerId, 10);
  assert.equal(state.sections.byId[30].layout.grid.columns, 2);
  assert.equal(state.columns, undefined);
  assert.deepEqual(api, before);
});

test('metadata survives Redux updates, resizing, section moves, and save serialization', () => {
  let state = reducer(undefined, setResume(normalizeResumeFromApi(apiResume())));
  state = reducer(state, updateContainer({ id: 20, type: 'column', spanFullPage: false }));
  state = reducer(state, resizeContainerPair({ leftContainerId: 10, rightContainerId: 20, leftWidth: 45, rightWidth: 55 }));
  state = reducer(state, updateSection({ id: 30, containerId: 20 }));
  const saved = JSON.parse(JSON.stringify(state));
  assert.equal(saved.containers.byId[20].type, 'column');
  assert.equal(saved.containers.byId[20].spanFullPage, false);
  assert.equal(saved.containers.byId[10].layout.width.value, '45%');
  assert.equal(saved.sections.byId[30].containerId, 20);
  assert.deepEqual(saved.containers.byId[10].sectionIds, []);
  assert.deepEqual(saved.containers.byId[20].sectionIds, [30]);
});
