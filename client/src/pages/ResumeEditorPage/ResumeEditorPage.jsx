import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { ActionCreators as UndoActionCreators } from "redux-undo";

import { toggleAllSectionIds, setResume, setActiveEditorId, setActiveSectionId } from '@/store/resumeSlice.js';

import { handleGlobalHotKey } from '@/utils/hotKeys';
import { getResumeFromApi } from '@/services/resumeServices';
import { PaddingPreviewContext } from '@/context/PaddingPreviewContext.js';

import { usePrintResume } from './hooks/usePrintResume.js';
import useResumePagination from './features/ResumePaper/hooks/useResumePagination.js';

import Toolbar from '@/pages/ResumeEditorPage/features/EditorToolbar/Toolbar.jsx';
import Outline from '@/pages/ResumeEditorPage/features/EditorOutline/Outline.jsx';
import NewResumeModal from '@/pages/ResumeEditorPage/features/NewResumeModal/NewResumeModal.jsx';
import ResumePaper from '@/pages/ResumeEditorPage/features/ResumePaper/ResumePaper.jsx';

import styles from './ResumeEditor.module.css';

const ResumeEditorPage = () => {

   const location = useLocation();
   const dispatch = useDispatch();
   const { resumeId } = useParams();

   const reduxResume = useSelector(state => state.resume.present)

   const showNewResumeModal = location.pathname === '/editor/new';

   const fetchResumeById = useCallback(
      async (resumeId) => {
         const normalizedResumeData = await getResumeFromApi(resumeId);
         if (!normalizedResumeData) {
            return;
         }

         dispatch(setResume(normalizedResumeData));
         dispatch(UndoActionCreators.clearHistory());
      }, [dispatch]);

   useEffect(() => {
      if (resumeId) fetchResumeById(resumeId);
      else fetchResumeById(0)
   }, [resumeId, fetchResumeById])

   useEffect(() => {
      const onGlobalKeyDown = (event) => {
         // Early return for general key presses
         if (!event.ctrlKey && !event.metaKey) return;
         const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's';
         const isSelectAllShortcut = (event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'a';

         if (!isSaveShortcut && !isSelectAllShortcut) return;

         // Ctrl + Shift + A: Select All Sections, useDispatch can't be used in the hotKeys.js util
         if (isSelectAllShortcut) {
            event.preventDefault();
            event.stopPropagation();
            dispatch(toggleAllSectionIds());
            return;
         }

         event.preventDefault();
         event.stopPropagation();
         handleGlobalHotKey(reduxResume, event);
      };

      window.addEventListener('keydown', onGlobalKeyDown);

      return () => {
         window.removeEventListener('keydown', onGlobalKeyDown);
      };
   }, [reduxResume]);

   const fullResumeRef = useRef(null);


   const [paddingPreview, setPaddingPreview] = useState(null);

   const handleBackgroundClick = (event) => {
      // The multi-page wrapper also covers empty space beside and between papers.
      if (event.target !== event.currentTarget && event.target !== fullResumeRef.current) return;

      dispatch(setActiveEditorId(null));
      dispatch(setActiveSectionId(null));
   };

   const [resumePageCount, setResumePageCount] = useState(1);

   useEffect(() => {
      let resumePageCount = 1;
      resumePageCount = Math.max(...Object.values(reduxResume.containers.byId).map(container => {
         const containerSections = container.sectionIds.map(sectionId => reduxResume.sections.byId[sectionId]);
         const maxSectionPage = Math.max(...containerSections.map(section => {
            const sectionSubsections = section.subsectionIds.map(subsectionId => reduxResume.subsections.byId[subsectionId]);
            const maxSubsectionPage = Math.max(...sectionSubsections.map(subsection => {
               const subsectionFields = subsection.fieldIds.map(fieldId => reduxResume.fields.byId[fieldId]);
               const maxFieldPage = Math.max(...subsectionFields.map(field => field.pageNumber));
               return Math.max(subsection.pageNumber, maxFieldPage);
            }));
            return Math.max(section.pageNumber, maxSubsectionPage);
         }));
         return maxSectionPage;
      }));

      setResumePageCount(resumePageCount);
   }, [reduxResume]);

   const editorPageRefMap = useRef(new Map());

   useResumePagination(editorPageRefMap);

   return (
      <div className={styles.resumeEditorContainer} onClick={handleBackgroundClick}>
         <Toolbar handlePrint={usePrintResume(reduxResume, fullResumeRef)} />
         <Outline />
         <PaddingPreviewContext.Provider value={{ preview: paddingPreview, setPreview: setPaddingPreview }}>
            <div ref={fullResumeRef}>
               {Array.from({ length: resumePageCount }, (_, index) => {
                  if (!editorPageRefMap.current.has(index)) {
                     editorPageRefMap.current.set(index, React.createRef());
                  } return (
                     <ResumePaper key={index} resumePageNumber={index + 1} editorPageRef={editorPageRefMap.current.get(index)} />
                  );
               }
               )}
               {/* {!isMobile && <MarginRuler pageRef={editorPageRef} />} */}
            </div>
         </PaddingPreviewContext.Provider>
         {showNewResumeModal &&
            <NewResumeModal />
         }
      </div>
   )
};

export default ResumeEditorPage;
