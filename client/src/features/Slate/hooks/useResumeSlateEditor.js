import { useCallback, useEffect, useMemo, useRef } from "react";
import { createEditor, Editor } from "slate";
import { withReact } from "slate-react";
import { withLists } from "@/features/Slate/helpers/withLists.js";
import { useDispatch } from "react-redux";

import { editorRegistry } from "@/lib/editorRegistry.js";
import { withIcons } from "@/features/Slate/helpers/withIcons.js";
import { selectOnEditorEntry } from "@/features/Slate/helpers/selectOnEditorEntry.js";
import { useSlateHistoryGrouping } from "@/hooks/useSlateHistoryGrouping.js";
import { handleHotKey } from "@/utils/hotKeys.js";
import {
  setActiveEditorId,
  setActiveEditorSelection,
} from "@/store/resumeSlice.js";

function normalizeSavedValue(value) {
  if (value == null) return value;

  const editor = withLists(withIcons(createEditor()));
  editor.children = structuredClone(value);
  Editor.normalize(editor, { force: true });

  return editor.children;
}

// Field and heading wrappers supply their own value action and presentation.
export function useResumeSlateEditor({ editorId, value, createValueAction }) {
  const dispatch = useDispatch();
  const editor = useMemo(
    () => withReact(withLists(withIcons(createEditor()))),
    [],
  );

  const normalizedValue = useMemo(() => normalizeSavedValue(value), [value]);

  const {
    getHistoryGroup,
    endHistoryGroup,
    onKeyDown: groupHistoryKeyDown,
    editableProps: historyInputProps,
  } = useSlateHistoryGrouping(editor, editorId);
  const isRestoringFromRedux = useRef(false);

  useEffect(() => {
    if (!normalizedValue || editor.children === normalizedValue) return;
    if (JSON.stringify(editor.children) === JSON.stringify(normalizedValue)) return;

    endHistoryGroup();
    isRestoringFromRedux.current = true;
    try {
      editor.selection = null;
      editor.marks = null;
      editor.children = structuredClone(normalizedValue);
      editor.onChange();
    } finally {
      isRestoringFromRedux.current = false;
    }
  }, [editor, normalizedValue, endHistoryGroup]);

  useEffect(() => {
    editorRegistry.set(editorId, editor);
    return () => editorRegistry.delete(editorId);
  }, [editorId, editor]);

  // Return undefined so Slate still runs its native input handlers.
  const activate = useCallback(() => {
    endHistoryGroup();
    dispatch(setActiveEditorId(editorId));
  }, [dispatch, editorId, endHistoryGroup]);

  const onChange = useCallback((nextValue) => {
    if (isRestoringFromRedux.current) return;
    const contentChanged = editor.operations.some(
      (operation) => operation.type !== "set_selection",
    );
    const historyGroup = getHistoryGroup();
    if (contentChanged) {
      const action = createValueAction(nextValue);
      dispatch({
        ...action,
        meta: { ...action.meta, historyGroup },
      });
    }
    dispatch(setActiveEditorSelection([...editor.children]));
  }, [dispatch, editor, getHistoryGroup, createValueAction]);

  return {
    editor,
    initialValue: normalizedValue,
    onChange,
    activate,
    editableProps: {
      ...historyInputProps,
      onMouseDown(event) {
        selectOnEditorEntry(editor, event);
      },
      onFocus: activate,
      onKeyDown(event) {
        groupHistoryKeyDown(event);
        handleHotKey(editor, event);
      },
    },
  };
}
