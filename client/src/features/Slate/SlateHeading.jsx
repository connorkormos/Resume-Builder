import React, { useCallback } from "react";
import { Slate, Editable } from "slate-react";
import { useSelector } from "react-redux";
import { updateSection } from "@/store/resumeSlice.js";
import { useResumeSlateEditor } from "./useResumeSlateEditor.js";

import Leaf from "@/features/Slate/renderLeaf.jsx";
import {
  getCascadedFontSize,
  getCascadedLineHeight,
} from "@/helpers/leafHelpers.js";
import RenderElement from "./RenderElement.jsx";

const SlateHeading = ({ section }) => {
  const reduxResume = useSelector((state) => state.resume.present);
  const resumeStyling = reduxResume?.styling;
  const resumeLayout = reduxResume?.layout;

  const column = useSelector(
    (state) => state.resume.present.columns.byId[section.columnId],
  );
  const sectionStyling = section?.styling;
  const columnStyling = column?.styling;
  const inheritedFontSize = getCascadedFontSize({
    resumeStyling,
    columnStyling,
    sectionStyling,
  });
  const inheritedLineHeight = getCascadedLineHeight({
    resumeStyling,
    columnStyling,
    sectionStyling,
  });

  const { editor, onChange, editableProps } = useResumeSlateEditor({
    editorId: section.id,
    value: section.value,
    createValueAction: (value) => updateSection({
      id: section.id,
      changes: { value },
    }),
  });

  const renderLeaf = useCallback(
    (props) => {
      return (
        <Leaf
          {...props}
          resumeStyling={resumeStyling}
          columnStyling={columnStyling}
          sectionStyling={sectionStyling}
        />
      );
    },
    [resumeStyling, columnStyling, sectionStyling],
  );

  const renderElement = useCallback((props) => {
    return (
      <RenderElement
        inheritedFontSize={inheritedFontSize}
        inheritedLineHeight={inheritedLineHeight}
        element={props.element}
        type={props.element.type}
        attributes={props.attributes}
        children={props.children}
      />
    );
  }, [inheritedFontSize, inheritedLineHeight]);

  if (!section.value) return null;

  return (
    <Slate
      editor={editor}
      initialValue={section.value ?? null}
      onChange={onChange}
    >
      <Editable
        {...editableProps}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder={section.label}
        style={{
          fontSize: `${inheritedFontSize}px`,
          lineHeight: inheritedLineHeight,
          marginBottom: resumeLayout?.gap?.header || '0rem',
          marginLeft: section.layout?.marginLeft || '0rem',
        }}
      />
    </Slate>
  );
};

export default SlateHeading;
