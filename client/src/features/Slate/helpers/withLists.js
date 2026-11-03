import { Editor, Element, Transforms } from 'slate';

import { isList, isListItem } from './listTransforms.js';

const DEFAULT_LIST_TYPE = 'unordered-list';

// Enforce the application's list schema after every Slate operation:
// - Lists contain only list items.
// - List items always belong to a list.
// - Directly nested list items are unwrapped into their containing item.
// - Nested lists appear inside list items, never directly inside other lists.
// - Items with block children wrap their inline content in paragraphs.
export const withLists = (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = (entry, options) => {
    const [node, path] = entry;

    if (isList(node)) {
      // A list nested directly inside another list contributes its items to the
      // parent list. Keeping both wrappers would render a <ul>/<ol> as the
      // direct child of another <ul>/<ol>.
      if (path.length > 0) {
        const [parent] = Editor.parent(editor, path);
        if (isList(parent)) {
          Transforms.unwrapNodes(editor, { at: path });
          return;
        }

        // Root lists and lists owned by list items are valid. A list inside any
        // other block is lifted one level and checked again on the next pass.
        if (!Editor.isEditor(parent) && !isListItem(parent)) {
          Transforms.liftNodes(editor, { at: path });
          return;
        }
      }

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index];
        if (isListItem(child)) continue;

        const childPath = [...path, index];
        if (isList(child)) {
          Transforms.unwrapNodes(editor, { at: childPath });
        } else {
          // Preserve the child's content and metadata while adding the list-item
          // wrapper required by both Slate's model and valid HTML.
          Transforms.wrapNodes(
            editor,
            { type: 'list-item', children: [] },
            { at: childPath },
          );
        }
        return;
      }
    }

    if (isListItem(node) && path.length > 0) {
      const [parent] = Editor.parent(editor, path);
      if (isListItem(parent)) {
        Transforms.unwrapNodes(editor, { at: path });
        return;
      }

      // Also repair from the parent entry, before Slate can normalize mixed
      // block/inline children and discard text beside the pasted item.
      const nestedItemIndex = node.children.findIndex(isListItem);
      if (nestedItemIndex !== -1) {
        Transforms.unwrapNodes(editor, { at: [...path, nestedItemIndex] });
        return;
      }

      const isInlineContent = child => !Element.isElement(child) || editor.isInline(child);
      if (node.children.some(child => !isInlineContent(child))) {
        const start = node.children.findIndex(isInlineContent);
        if (start !== -1) {
          let end = start + 1;
          while (end < node.children.length && isInlineContent(node.children[end])) end += 1;

          // Keep each run of text/icons together, and preserve genuine sublists
          // instead of letting Slate unwrap them or remove adjacent inline text.
          Transforms.wrapNodes(editor, { type: 'paragraph', children: [] }, {
            at: path,
            match: (_child, childPath) => childPath.length === path.length + 1 &&
              childPath.at(-1) >= start && childPath.at(-1) < end,
          });
          return;
        }
      }

      if (!isList(parent)) {
        const ancestorList = Editor.above(editor, {
          at: path,
          match: isList,
          mode: 'lowest',
        });
        const listType = ancestorList?.[0].type ?? DEFAULT_LIST_TYPE;

        // Orphaned items still need a list container.
        Transforms.wrapNodes(
          editor,
          { type: listType, children: [] },
          { at: path },
        );
        return;
      }
    }

    normalizeNode(entry, options);
  };

  return editor;
};
