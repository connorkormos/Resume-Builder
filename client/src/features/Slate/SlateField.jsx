import React, { useCallback } from "react";
import { Slate, Editable } from "slate-react";
import { useSelector } from "react-redux";
import { updateFieldValue } from "../../store/resumeSlice.js";
import { useResumeSlateEditor } from "./useResumeSlateEditor.js";

import Leaf from "./renderLeaf.jsx";
import RenderElement from "./RenderElement.jsx";

import { getNodeString } from "@/helpers/getNodeString.js";
import { getMinWidth } from "@/helpers/getMinWidth.js";
import {
  getCascadedFontSize,
  getCascadedLineHeight,
} from "@/helpers/leafHelpers.js";

const SlateField = ({ field }) => {
  const fieldPlainText = getNodeString(field);
  const fieldMinWidth = !fieldPlainText ? getMinWidth(field.label) : "auto";

  const reduxResume = useSelector((state) => state.resume.present);
  const resumeStyling = reduxResume.styling;
  const subsection = useSelector(
    (state) => state.resume.present.subsections.byId[field.subsectionId],
  );
  const section = useSelector(
    (state) => state.resume.present.sections.byId[subsection?.sectionId],
  );
  const column = useSelector(
    (state) => state.resume.present.columns.byId[section?.columnId],
  );
  const fieldStyling = field?.styling;
  const columnStyling = column?.styling;
  const sectionStyling = section?.styling;
  const subsectionStyling = subsection?.styling;
  const inheritedFontSize = getCascadedFontSize({
    resumeStyling,
    columnStyling,
    sectionStyling,
    subsectionStyling,
    fieldStyling,
  });
  const inheritedLineHeight = getCascadedLineHeight({
    resumeStyling,
    columnStyling,
    sectionStyling,
    subsectionStyling,
    fieldStyling,
  });

  const { editor, onChange, activate, editableProps } = useResumeSlateEditor({
    editorId: field.id,
    value: field.value,
    createValueAction: (newValue) => updateFieldValue({ fieldId: field.id, newValue }),
  });

  const renderLeaf = useCallback(
    (props) => {
      return (
        <Leaf
          {...props}
          resumeStyling={resumeStyling}
          columnStyling={columnStyling}
          sectionStyling={sectionStyling}
          subsectionStyling={subsectionStyling}
          fieldStyling={fieldStyling}
        />
      );
    },
    [
      resumeStyling,
      columnStyling,
      sectionStyling,
      subsectionStyling,
      fieldStyling,
    ],
  );

  const renderElement = useCallback(
    (props) => {
      return (
        <RenderElement
          inheritedFontSize={inheritedFontSize}
          inheritedLineHeight={inheritedLineHeight}
          field={field}
          element={props.element}
          type={props.element.type}
          attributes={props.attributes}
          children={props.children}
        />
      );
    },
    [inheritedFontSize, inheritedLineHeight, field],
  );

  if (!field.value) return null;

  return (
    <div
      style={{
        padding: "0 1rem",
        margin: "0 -1rem",
        cursor: "pointer",
        //   display: 'inline-block',
      }}
    >
      <Slate
        editor={editor}
        initialValue={field.value ?? null}
        onChange={onChange}
        onMouseDown={editableProps.onMouseDown}
        onClick={activate}
      >
        <Editable
          {...editableProps}
          onClick={activate}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={field.label}
          style={{
            position: "relative",
            minWidth: fieldMinWidth,
            fontSize: `${inheritedFontSize}px`,
            lineHeight: inheritedLineHeight,
            marginLeft: field.layout?.marginLeft || "0rem",

            cursor: "text",
          }}
        />
        {/* </div> */}
      </Slate>
    </div>
  );
};

export default SlateField;
