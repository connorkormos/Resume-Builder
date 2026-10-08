import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateResume, updateSection } from '@/store/resumeSlice.js';
import { getActiveMark, setFontSizeOffset } from "@/helpers/marks.js";

import { getCascadedFontSize } from "@/helpers/leafHelpers.js";

import styles from './TextFormatting.module.css';

/* eslint-disable react-hooks/set-state-in-effect */

const FontSize = ({
   editor,
   selection,
   columns,
   context,
   activeSectionId,
   activeSectionIds,
   resumeStyling
}) => {
   const isMobile = useMediaQuery("(max-width: 768px)");

   const dispatch = useDispatch();
   const reduxSections = useSelector(state => state.resume.present.sections);

   const getNumericFontSize = (value, fallback = 12) => {
      const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
      return Number.isNaN(parsed) ? fallback : parsed;
   }

   const getResumeFontSize = useCallback(
      () => getNumericFontSize(resumeStyling.fontSize),
      [resumeStyling]
   );

   const effectiveSectionId = activeSectionId;
   const { editorId: activeEditorId } = context;
   const hasEditorAncestry = Boolean(context.section && (!context.field || context.subsection));
   
   const getSectionTotalFontSize = useCallback((sectionData) => {
      if (!sectionData) return getResumeFontSize();

      const columnData = columns.byId[sectionData.columnId];
      return getCascadedFontSize({
         resumeStyling: { fontSize: getResumeFontSize() },
         columnStyling: columnData?.styling,
         sectionStyling: sectionData.styling,
      });
   }, [columns, getResumeFontSize]);

   const [fontSizeInputValue, setFontSizeInputValue] = useState(getResumeFontSize());

   useEffect(() => {
      if (editor && selection && activeEditorId && hasEditorAncestry) {
         setFontSizeInputValue(getCascadedFontSize({
            ...context.styling,
            // Keep the toolbar's existing base-size parsing and fallback.
            resumeStyling: { fontSize: getResumeFontSize() },
            leafStyling: { fontSizeOffset: getActiveMark(editor, 'fontSizeOffset') ?? 0 },
         }));
         return;
      }

      // Case 2: Multiple sections selected
      if (activeSectionIds.length > 0 && !editor) {
         const firstActiveSection = reduxSections.byId[activeSectionIds[0]];
         setFontSizeInputValue(getSectionTotalFontSize(firstActiveSection));
         return;
      }

      // Case 4: Default - resume only
      setFontSizeInputValue(getResumeFontSize());
   }, [editor, selection, activeEditorId, hasEditorAncestry, context, activeSectionIds, getSectionTotalFontSize, getResumeFontSize, reduxSections]);

   const setNewFontSize = (newFontSize) => {
      const parsedFontSize = (value) => {
         const parsed = Number(String(value).replace(/[^0-9.]/g, ''));
         return Number.isNaN(parsed) ? null : parsed;
      };

      const currentValue = parsedFontSize(fontSizeInputValue) ?? getResumeFontSize();
      let targetFontSize = currentValue;

      if (newFontSize === 'increment') {
         targetFontSize = currentValue + 1;
      } else if (newFontSize === 'decrement') {
         targetFontSize = currentValue - 1;
      } else {
         const parsedTarget = parsedFontSize(newFontSize);
         if (parsedTarget !== null) {
            targetFontSize = parsedTarget;
         }
      }

      if (targetFontSize <= 0) return;

      const sectionIdToUse = effectiveSectionId;

      // Fields and headings use the same leaf operation with different ancestry.
      if (editor && activeEditorId && hasEditorAncestry) {
         if (newFontSize === 'increment' || newFontSize === 'decrement') {
            const currentLeafOffset = getActiveMark(editor, 'fontSizeOffset') ?? 0;
            setFontSizeOffset(editor, currentLeafOffset + (newFontSize === 'increment' ? 1 : -1));
         } else {
            const { columnStyling, sectionStyling, subsectionStyling, fieldStyling } = context.styling;
            // Preserve the existing subtraction order and mark conversion.
            const leafOffset = targetFontSize - getResumeFontSize()
               - (columnStyling?.fontSizeOffset ?? 0)
               - (sectionStyling?.fontSizeOffset ?? 0)
               - (subsectionStyling?.fontSizeOffset ?? 0)
               - (fieldStyling?.fontSizeOffset ?? 0);
            setFontSizeOffset(editor, leafOffset);
         }
         setFontSizeInputValue(targetFontSize);
         return;
      }

      // Case 0: Sections selected (no editor)
      if (activeSectionIds.length > 0) {
         activeSectionIds.forEach((sectionId) => {
            const sectionData = reduxSections.byId[sectionId];
            if (!sectionData) return;

            const columnData = columns.byId[sectionData.columnId];
            const baseFontSize = getResumeFontSize();
            const columnFontSizeOffset = columnData?.styling?.fontSizeOffset ?? 0;
            const currentSectionFontSizeOffset = sectionData?.styling?.fontSizeOffset ?? 0;
            let newSectionFontSizeOffset = currentSectionFontSizeOffset;

            if (newFontSize === 'increment') {
               newSectionFontSizeOffset += 1;
            } else if (newFontSize === 'decrement') {
               newSectionFontSizeOffset -= 1;
            } else {
               newSectionFontSizeOffset = targetFontSize - baseFontSize - columnFontSizeOffset;
            }

            dispatch(updateSection({
               id: sectionId,
               changes: { styling: { fontSizeOffset: newSectionFontSizeOffset } }
            }));
         });

         setFontSizeInputValue(targetFontSize);
         return;
      }

      // Case 3: Resume level (no editor, no section)
      if (!editor && !sectionIdToUse) {
         dispatch(updateResume({
            key: 'styling',
            changes: {
               fontSize: `${targetFontSize}px`
            }
         }));
         setFontSizeInputValue(targetFontSize);
      }
   }

   return (
      <div className={`${styles.toolbarFlexWrapper} ${styles.incrementDecrementToolbarWrapper}`} data-toolbar-label="Font Size">
         <button data-toolbar-label="Decrease Font Size" className='buttonMain' onClick={() => setNewFontSize('decrement')}>-</button>
         <input
            className='inputMain'
            type='number'
            step='any'
            inputMode='decimal'
            value={fontSizeInputValue}
            onChange={(e) => setFontSizeInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setNewFontSize(fontSizeInputValue)}
            style={!isMobile ? {width: '3rem'} : undefined}
            />
         <button data-toolbar-label="Increase Font Size" className='buttonMain' onClick={() => setNewFontSize('increment')}>+</button>
      </div>
   )
}

export default FontSize;
