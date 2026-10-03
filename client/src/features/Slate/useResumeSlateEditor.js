import { useCallback, useEffect, useMemo, useRef } from "react";
import { createEditor } from "slate";
import { withReact } from "slate-react";
import { useDispatch } from "react-redux";

import { editorRegistry } from "@/helpers/editorRegistry.js";
import { withInlineVoidIcons } from "@/helpers/slateHelpers/editorSchemaRules.js";
import { selectOnEditorEntry } from "@/helpers/slateHelpers/selectOnEditorEntry.js";
import { useSlateHistoryGrouping } from "@/hooks/useSlateHistoryGrouping.js";
import { handleHotKey } from "@/utils/hotKeys.js";
import {
  setActiveEditorId,
  setActiveEditorSelection,
} from "@/store/resumeSlice.js";

// Field and heading wrappers supply their own value action and presentation.
export function useResumeSlateEditor({ editorId, value, createValueAction }) {
  const dispatch = useDispatch();
  const editor = useMemo(
    () => withReact(withInlineVoidIcons(createEditor())),
    [],
  );
  const {
    getHistoryGroup,
    endHistoryGroup,
    onKeyDown: groupHistoryKeyDown,
    editableProps: historyInputProps,
  } = useSlateHistoryGrouping(editor, editorId);
  const isRestoringFromRedux = useRef(false);

  useEffect(() => {
    if (!value || editor.children === value) return;
    if (JSON.stringify(editor.children) === JSON.stringify(value)) return;

    endHistoryGroup();
    isRestoringFromRedux.current = true;
    try {
      editor.selection = null;
      editor.marks = null;
      editor.children = structuredClone(value);
      editor.onChange();
    } finally {
      isRestoringFromRedux.current = false;
    }
  }, [editor, value, endHistoryGroup]);

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
