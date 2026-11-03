import assert from 'node:assert/strict';
import test from 'node:test';
import { createEditor, Editor, Node, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { withIcons } from '../src/features/Slate/helpers/icons.js';
import { withLists } from '../src/features/Slate/helpers/withLists.js';
import { isList, isListItem } from '../src/features/Slate/helpers/listTransforms.js';
import { addListItem, indentList, outdentList } from '../src/features/Slate/helpers/listBehavior.js';

const text = value => ({ text: value });
const item = (...children) => ({ type: 'list-item', children });
const paragraph = (...children) => ({ type: 'paragraph', children });
const list = (type, ...children) => ({ type, children });
const make = children => {
  const editor = withHistory(withReact(withLists(withIcons(createEditor()))));
  editor.children = structuredClone(children);
  return editor;
};
const assertValidLists = editor => {
  for (const [node, path] of Node.elements(editor)) {
    if (isList(node)) {
      assert.ok(node.children.every(isListItem));
      const [parent] = Editor.parent(editor, path);
      assert.ok(Editor.isEditor(parent) || isListItem(parent));
    }
    if (isListItem(node)) assert.ok(isList(Editor.parent(editor, path)[0]));
  }
  const before = structuredClone(editor.children);
  Editor.normalize(editor, { force: true });
  assert.deepEqual(editor.children, before, 'Normalization must be stable');
};

for (const type of ['ordered-list', 'unordered-list']) {
  test(`${type}: unwraps repeated nested items and preserves marks, icons, and selection`, () => {
    const bold = { text: 'nested', bold: true };
    const icon = { type: 'icon', iconId: 'phone', children: [{ text: '', fontSizeOffset: 2 }] };
    const editor = make([list(type, item(text('before'), item(item(bold, icon, text('tail'))), text('after')))]);
    // Assign selection directly so it is present before the first normalization.
    const point = { path: [0, 0, 1, 0, 0], offset: 3 };
    editor.selection = { anchor: point, focus: point };
    Editor.normalize(editor, { force: true });
    assert.deepEqual(editor.children, [list(type, item(text('before'), bold, icon, text('tailafter')))]);
    assert.deepEqual(editor.selection, {
      anchor: { path: [0, 0, 1], offset: 3 },
      focus: { path: [0, 0, 1], offset: 3 },
    });
    assertValidLists(editor);
  });

  test(`${type}: repairs from the parent before mixed children can lose text`, () => {
    const editor = make([list(type, item(text('before'), item(paragraph(text('nested'))), text('after')))]);
    editor.normalizeNode(Editor.node(editor, [0, 0]));
    Editor.normalize(editor, { force: true });
    assert.deepEqual(editor.children, [list(type, item(
      paragraph(text('before')), paragraph(text('nested')), paragraph(text('after')),
    ))]);
    assertValidLists(editor);
  });

  for (const offset of [0, 3, 6]) {
    test(`${type}: pasting malformed list content at offset ${offset} is one undoable edit`, () => {
      const original = [list(type, item(text('abcdef')))];
      const editor = make(original);
      Transforms.select(editor, { path: [0, 0, 0], offset });
      const selection = structuredClone(editor.selection);
      editor.insertFragment([item(text('X'), item(text('Y')), text('Z'))]);
      assert.equal(Node.string(editor), `${'abcdef'.slice(0, offset)}XYZ${'abcdef'.slice(offset)}`);
      assertValidLists(editor);
      const pasted = structuredClone(editor.children);
      editor.undo();
      assert.deepEqual(editor.children, original);
      assert.deepEqual(editor.selection, selection);
      editor.redo();
      assert.deepEqual(editor.children, pasted);
      assertValidLists(editor);
    });
  }

  test(`${type}: copying and pasting multiple items preserves text and sibling items`, () => {
    const source = make([list(type, item(text('one')), item(text('two')))]);
    Transforms.select(source, Editor.range(source, [0]));
    const editor = make([list(type, item(text('beforeafter')))]);
    Transforms.select(editor, { path: [0, 0, 0], offset: 6 });
    editor.insertFragment(source.getFragment());
    assert.deepEqual(editor.children, [list(type, item(text('beforeone')), item(text('twoafter')))]);
    assertValidLists(editor);
  });

  test(`${type}: preserves valid sublists and text around them`, () => {
    const other = type === 'ordered-list' ? 'unordered-list' : 'ordered-list';
    const sublist = list(other, item(text('nested')));
    const editor = make([list(type, item(text('before'), sublist, text('after')))]);
    Editor.normalize(editor, { force: true });
    assert.deepEqual(editor.children, [list(type, item(paragraph(text('before')), sublist, paragraph(text('after'))))]);
    assertValidLists(editor);
  });

  test(`${type}: repairs orphan items, directly nested lists, and non-item children`, () => {
    const editor = make([item(text('orphan')), list(type,
      list(type, item(text('nested'))), paragraph(text('block')), text('bare'),
    )]);
    Editor.normalize(editor, { force: true });
    assert.equal(Node.string(editor), 'orphannestedblockbare');
    assertValidLists(editor);
  });

  test(`${type}: normalization remains compatible with indent, Enter, and outdent`, () => {
    const editor = make([list(type, item(text('a')), item(text('bc')))]);
    Transforms.select(editor, { path: [0, 1, 0], offset: 1 });
    const currentItem = () => Editor.above(editor, { match: isListItem });
    indentList(editor, currentItem());
    assertValidLists(editor);
    addListItem(editor, currentItem());
    assert.deepEqual(editor.children[0].children[0].children[1].children.map(Node.string), ['b', 'c']);
    assertValidLists(editor);
    outdentList(editor, currentItem());
    assert.equal(Node.string(editor), 'abc');
    assertValidLists(editor);
  });
}
