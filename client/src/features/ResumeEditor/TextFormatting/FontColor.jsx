import React, { useState, useEffect } from "react";

import { useDispatch } from 'react-redux';
import { getCascadedColor } from '@/helpers/leafHelpers.js';

import { getActiveMark, setFontColor } from "../../../helpers/marks.js";
import { updateResume, updateSection } from "@/store/resumeSlice.js";

import ColorDropdown from "./shared/ColorDropdown.jsx";

const FontColor = ({ editor, selection, context, activeSectionIds }) => {

   const dispatch = useDispatch();

   const [currentFontColor, setCurrentFontColor] = useState('rgba(0, 0, 0, 1)');

   // Synchronize the swatch with the current Slate selection.
   /* eslint-disable react-hooks/set-state-in-effect */
   useEffect(() => {
      if (!editor || !selection) return;
      setCurrentFontColor(getCascadedColor({
         ...context.styling,
         leafStyling: { color: getActiveMark(editor, 'color') },
      }) || 'rgba(0, 0, 0, 0)');
   }, [editor, selection, context]);
   /* eslint-enable react-hooks/set-state-in-effect */

   const setNewFontColor = (newFontColor = currentFontColor) => {
      if (editor) {
         setFontColor(editor, newFontColor);
      } else if (activeSectionIds.length > 0) {
         for (let sectionId of activeSectionIds) {
            dispatch(updateSection({
               id: sectionId,
               changes: { styling: { color: newFontColor } }
            }));
         }
      } else {
         dispatch(updateResume({
            key: 'styling',
            changes: {
               color: newFontColor
            }
         }))
      }
      setCurrentFontColor(newFontColor);
   }

   return (
      <ColorDropdown
         text="A"
         editor={editor}
         selection={selection}
         currentEditorColor={currentFontColor}
         handleSetColor={setNewFontColor}
         toolbarLabel="Font Color"
      />
   )
}

export default FontColor;
