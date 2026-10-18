import assert from 'node:assert/strict';
import test from 'node:test';
import { configureStore } from '@reduxjs/toolkit';
import undoable, { ActionCreators, excludeAction } from 'redux-undo';
import reducer, {
    applyManualProfileMatch, setActiveEditorId, setActiveEditorSelection,
    setResume, updateField, updateResume,
} from '../src/store/resumeSlice.js';
import { getManualProfileMatchStatus } from '../src/pages/ResumeEditorPage/features/EditorToolbar/helpers/manualProfileMatchHistory.js';

const value = text => [{ type: 'paragraph', children: [{ text, bold: true }] }];
const fixture = () => ({
    ...reducer(undefined, { type: 'init' }),
    id: 'resume-1', title: 'Original',
    sections: { byId: { s: { id: 's', subsectionIds: ['sub'] } }, allIds: ['s'] },
    subsections: { byId: { sub: { id: 'sub', sectionId: 's', fieldIds: ['f1', 'f2'] } }, allIds: ['sub'] },
    fields: {
        byId: {
            f1: { id: 'f1', subsectionId: 'sub', value: value('First original'), styling: { color: 'blue' } },
            f2: { id: 'f2', subsectionId: 'sub', value: value('Second original') },
        },
        allIds: ['f1', 'f2'],
    },
});
const setup = () => configureStore({
    reducer: {
        // Exercise the same grouping/filter rules as the application's store.
        resume: undoable(reducer, {
            groupBy: action => action.meta?.historyGroup ?? null,
            filter: excludeAction([
                'resume/setActiveSectionId', 'resume/setActiveSectionIds',
                'resume/toggleAllSectionIds', 'resume/setActiveEditorId',
                'resume/setActiveEditorSelection', 'resume/setResumePrintRef',
            ]),
        }),
    },
    preloadedState: { resume: { past: [], present: fixture(), future: [] } },
});
const history = store => store.getState().resume;
const status = (store, profileFieldId = 'p1', sessionId = 'import-1') =>
    getManualProfileMatchStatus(history(store), sessionId, profileFieldId);
const match = (overrides = {}) => applyManualProfileMatch({
    sessionId: 'import-1', profileFieldId: 'p1', resumeFieldId: 'f1',
    value: value('Imported'), ...overrides,
});

test('manual replacement and modal status undo/redo together in exactly one step', () => {
    const store = setup();
    const original = history(store).present;
    store.dispatch(setActiveEditorId('f1'));
    store.dispatch(match());
    store.dispatch(setActiveEditorId(null));
    store.dispatch(setActiveEditorSelection(value('Selection')));
    assert.equal(history(store).past.length, 1);
    assert.deepEqual(status(store), { isMatched: true, canUndo: true, canRedo: false });
    assert.deepEqual(history(store).present.fields.byId.f1.value, value('Imported'));
    assert.deepEqual(history(store).present.fields.byId.f1.styling, { color: 'blue' });

    // Keyboard, toolbar and modal all dispatch these same redux-undo actions.
    store.dispatch(ActionCreators.undo());
    assert.deepEqual(history(store).present.fields.byId.f1.value, original.fields.byId.f1.value);
    assert.deepEqual(status(store), { isMatched: false, canUndo: false, canRedo: true });
    store.dispatch(setActiveEditorId('f2'));
    assert.equal(status(store).canRedo, true);
    store.dispatch(ActionCreators.redo());
    assert.deepEqual(status(store), { isMatched: true, canUndo: true, canRedo: false });
    assert.deepEqual(history(store).present.fields.byId.f1.value, value('Imported'));
    assert.deepEqual(original, fixture(), 'prior snapshots stay immutable');
});

test('unrelated edits gate modal Undo and Redo without changing the global timeline', () => {
    const store = setup();
    store.dispatch(updateResume({ title: 'Earlier edit' }));
    store.dispatch(match());
    store.dispatch(updateField({ id: 'f2', value: value('Later edit') }));
    assert.deepEqual(status(store), { isMatched: true, canUndo: false, canRedo: false });
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store).canUndo, true);
    assert.deepEqual(history(store).present.fields.byId.f2.value, value('Second original'));
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store).canRedo, true);
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store).canRedo, false, 'next redo is the title edit, not the match');
    store.dispatch(ActionCreators.redo());
    assert.equal(status(store).canRedo, true);
    store.dispatch(ActionCreators.redo());
    assert.equal(status(store).isMatched, true);
    store.dispatch(ActionCreators.redo());
    assert.deepEqual(history(store).present.fields.byId.f2.value, value('Later edit'));
    assert.equal(status(store).canUndo, false);
});

test('consecutive manual matches remain separate and identify the correct row', () => {
    const store = setup();
    const first = match();
    const second = match({ profileFieldId: 'p2', resumeFieldId: 'f2', value: value('Second import') });
    assert.notEqual(first.meta.historyGroup, second.meta.historyGroup);
    store.dispatch(first);
    store.dispatch(second);
    assert.equal(history(store).past.length, 2);
    assert.equal(status(store, 'p1').canUndo, false);
    assert.equal(status(store, 'p2').canUndo, true);
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store, 'p1').canUndo, true);
    assert.equal(status(store, 'p2').canRedo, true);
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store, 'p1').canRedo, true);
    assert.equal(status(store, 'p2').canRedo, false);
});

test('a different assignment after undo discards the old redo record', () => {
    const store = setup();
    store.dispatch(match());
    store.dispatch(ActionCreators.undo());
    store.dispatch(match({ resumeFieldId: 'f2' }));
    assert.equal(history(store).future.length, 0);
    assert.equal(status(store).canRedo, false);
    assert.equal(history(store).present.manualProfileMatches['import-1'].p1.resumeFieldId, 'f2');
    assert.deepEqual(history(store).present.fields.byId.f1.value, value('First original'));
    store.dispatch(ActionCreators.undo());
    store.dispatch(ActionCreators.redo());
    assert.deepEqual(history(store).present.fields.byId.f2.value, value('Imported'));
});

test('import sessions are isolated even when they use the same profile field', () => {
    const store = setup();
    store.dispatch(match());
    assert.equal(status(store, 'p1', 'import-2').isMatched, false);
    store.dispatch(match({ sessionId: 'import-2', value: value('New session') }));
    assert.equal(status(store, 'p1', 'import-2').canUndo, true);
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store, 'p1', 'import-2').isMatched, false);
    assert.equal(status(store, 'p1', 'import-2').canRedo, true);
    store.dispatch(ActionCreators.redo());
    assert.equal(status(store, 'p1', 'import-2').isMatched, true);
});

test('same-value matches still have an identifiable undoable assignment', () => {
    const store = setup();
    store.dispatch(match({ value: value('First original') }));
    assert.equal(history(store).past.length, 1);
    assert.equal(status(store).canUndo, true);
    store.dispatch(ActionCreators.undo());
    assert.equal(status(store).isMatched, false);
});

test('ordinary grouped edits retain their existing behavior alongside manual matches', () => {
    const store = setup();
    const type = text => ({ ...updateField({ id: 'f1', value: value(text) }), meta: { historyGroup: 'typing' } });
    store.dispatch(type('A'));
    store.dispatch(type('AB'));
    assert.equal(history(store).past.length, 1);
    store.dispatch(match());
    store.dispatch(type('After match'));
    store.dispatch(type('After match edited'));
    assert.equal(history(store).past.length, 3);
    store.dispatch(ActionCreators.undo());
    assert.deepEqual(history(store).present.fields.byId.f1.value, value('Imported'));
    store.dispatch(ActionCreators.undo());
    assert.deepEqual(history(store).present.fields.byId.f1.value, value('AB'));
    store.dispatch(ActionCreators.undo());
    assert.deepEqual(history(store).present.fields.byId.f1.value, value('First original'));
});

test('invalid manual destinations leave values, metadata and history untouched', () => {
    const store = setup();
    const before = history(store);
    store.dispatch(match({ resumeFieldId: 'missing' }));
    assert.equal(history(store), before);
    const orphan = fixture();
    delete orphan.subsections.byId.sub;
    assert.equal(reducer(orphan, match()), orphan);
});

test('loading a resume resets temporary manual matching records', t => {
    t.mock.method(console, 'log', () => {});
    const store = setup();
    store.dispatch(match());
    const withRecords = history(store).present;
    assert.deepEqual(reducer(withRecords, setResume(withRecords)).manualProfileMatches, {});
    assert.deepEqual(reducer(withRecords, { type: 'resume/loadResume', payload: withRecords }).manualProfileMatches, {});
});
