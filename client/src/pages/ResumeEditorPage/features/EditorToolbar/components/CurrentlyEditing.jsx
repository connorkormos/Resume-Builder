import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Node } from 'slate';
import { setActiveEditorId, setActiveSectionId } from '@/store/resumeSlice.js';

import { editorRegistry } from '@/features/Slate/helpers/editorRegistry.js';
import { getNodeString } from '@/features/Slate/helpers/getNodeString';

import styles from "../Toolbar.module.css";

const CurrentlyEditing = () => {

   const isMobile = useMediaQuery("(max-width: 768px)");
   const dispatch = useDispatch();

   const sections = useSelector(state => state.resume.present.sections);
   const reduxSubsections = useSelector(state => state.resume.present.subsections);
   const activeSectionIds = useSelector(state => state.resume.present.activeSectionIds);
   const activeSectionId = activeSectionIds[0] ?? null;
   const activeEditorId = useSelector((state) => state.resume.present.activeEditorId);
   const reduxField = useSelector(state => state.resume.present.fields.byId[activeEditorId]);
   const reduxFieldSubsection = reduxSubsections.byId[reduxField?.subsectionId];
   const reduxFieldIndex = reduxFieldSubsection?.fieldIds?.indexOf(activeEditorId);
   const editor = editorRegistry.get(activeEditorId);
   const activeEditorText = editor ? Node.string(editor) : null;
   const activeEditorLabel = reduxField?.label || editor?.children[0].label || editor?.label || 'Field' + reduxFieldIndex || 'Field';

   const activeSection = sections.byId[activeSectionId];
   const activeSectionText = activeSection ? getNodeString(activeSection) : null;
   // const activeSectionText = activeSection ? Node.string({ children: activeSection?.value ?? [] }) : null;

   const [currentlyEditingText, setCurrentlyEditingText] = useState('Full Resume');

   useEffect(() => {
      if (activeSectionText && activeEditorText && activeSectionText !== activeEditorText) {
         setCurrentlyEditingText(`${activeSectionText} > ${activeEditorLabel}`);
      } else if (activeEditorText) {
         // setCurrentlyEditingText(activeEditorText);
         setCurrentlyEditingText(activeEditorLabel);
      } else if (activeSectionText) {
         setCurrentlyEditingText(activeSectionText);
      } else {
         setCurrentlyEditingText('Full Resume');
      }
   }, [activeSectionText, activeEditorText, activeEditorLabel])

   // Keep the section and editor label on mobile, using the shorter section label.
   const mobileSectionLabel = activeSection?.label || activeSectionText || 'Section';
   const escapedSectionLabel = mobileSectionLabel.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   const mobileEditorLabel = activeEditorLabel
      .replace(new RegExp(`(?<![\\p{L}\\p{N}_])${escapedSectionLabel}(?![\\p{L}\\p{N}_])`, 'giu'), '')
      .replace(/\s+/g, ' ')
      .trim();
   const mobileEditingText = (
      activeSectionText && activeEditorText && activeSectionText !== activeEditorText
         ? [mobileSectionLabel, mobileEditorLabel].filter(Boolean).join(' > ')
         : activeEditorText
         ? activeEditorLabel
         : activeSection
            ? mobileSectionLabel
            : 'Resume'
   ).toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());

   const clearToolbarSelection = () => {
      dispatch(setActiveEditorId(null));
      dispatch(setActiveSectionId(null));
   }
   return (
      <button
         data-toolbar-label="Edit Full Resume"
         className={`buttonMain ${styles.currentlyEditingButton}`}
         onClick={() => clearToolbarSelection()}
      >
         {`${
            !isMobile 
               ? `Currently Editing: ${currentlyEditingText || "Unknown Error"}`
               : "Editing: " + mobileEditingText
         }`}
      </button>
   )
}

export default CurrentlyEditing;
