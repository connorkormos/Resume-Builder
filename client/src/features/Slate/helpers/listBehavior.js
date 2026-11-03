import { Editor, Transforms, Range, Element as SlateElement, Path } from "slate";
import { HistoryEditor } from "slate-history";
import { LIST_TYPES, isList, isListItem, editList, selectedBlocks, withBlockRefs, indentItem, outdentItem } from "./listTransforms.js";

export const toggleList = (editor, format) => {
  if (!editor.selection || !LIST_TYPES.includes(format)) return;
  const paths = selectedBlocks(editor);
  if (!paths.length) return;
  const turnOff = paths.every(path => {
    const [node] = Editor.node(editor, path);
    const [parent] = Editor.parent(editor, path);
    return isListItem(node) && parent.type === format;
  });

  editList(editor, () => withBlockRefs(editor, paths, refs => {
    for (const ref of refs) {
      if (!ref.current) continue;
      const [node] = Editor.node(editor, ref.current);
      if (isListItem(node)) {
        if (turnOff) {
          // Leave every list level when the list button is toggled off.
          while (ref.current && isListItem(Editor.node(editor, ref.current)[0])) {
            if (!outdentItem(editor, ref.current)) break;
          }
          continue;
        }
        const [parent, parentPath] = Editor.parent(editor, ref.current);
        if (isList(parent)) {
          if (parent.type === format) continue;
          // Split the list container at item boundaries, never within its text.
          Transforms.unwrapNodes(editor, {
            at: Editor.range(editor, ref.current),
            match: (_, path) => Path.equals(path, parentPath),
            split: true,
          });
        }
      }
      Transforms.setNodes(editor, { type: 'list-item' }, { at: ref.current });
      const path = ref.current;
      const previousPath = path.at(-1) > 0 ? Path.previous(path) : null;
      const previous = previousPath && Editor.node(editor, previousPath)[0];
      if (previous?.type === format) {
        Transforms.moveNodes(editor, { at: path, to: [...previousPath, previous.children.length] });
      } else {
        Transforms.wrapNodes(editor, { type: format, children: [] }, { at: path });
      }
    }
  }));
};

export const addListItem = (editor, listItemEntry) => {
  if (!editor.selection || !listItemEntry) return;

  const splitItem = () => Editor.withoutNormalizing(editor, () => {
    // Enter replaces selected text before splitting at the resulting caret.
    if (Range.isExpanded(editor.selection)) Transforms.delete(editor);

    // Resolve the item again: deleting a selection may have moved its path.
    Transforms.splitNodes(editor, {
      match: (node) => SlateElement.isElement(node) && node.type === "list-item",
      mode: "lowest",
      always: true,
    });
  });

  // Keep deletion and splitting together as one undoable Enter action.
  if (HistoryEditor.isHistoryEditor(editor)) {
    HistoryEditor.withNewBatch(editor, splitItem);
  } else {
    splitItem();
  }
};

export const indentList = (editor, listItemEntry) => {
  if (!editor.selection || !listItemEntry) return;
  editList(editor, () => withBlockRefs(editor, selectedBlocks(editor), refs => {
    for (const ref of refs) if (ref.current) indentItem(editor, ref.current);
  }));
};

export const outdentList = (editor, listItemEntry) => {
  if (!editor.selection || !listItemEntry) return;
  editList(editor, () => withBlockRefs(editor, selectedBlocks(editor), refs => {
    for (const ref of refs) if (ref.current) outdentItem(editor, ref.current);
  }));
};
