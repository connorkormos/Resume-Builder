import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { toggleAllSectionIds, setResume, setActiveEditorId, setActiveSectionId } from '@/store/resumeSlice.js';

import Toolbar from '@/pages/ResumeEditorPage/features/EditorToolbar/Toolbar.jsx';
import Outline from '@/pages/ResumeEditorPage/features/EditorOutline/Outline.jsx';
import NewResumeModal from '@/pages/ResumeEditorPage/features/NewResumeModal/NewResumeModal.jsx';

import ResumePaper from '@/pages/ResumeEditorPage/features/ResumePaper/ResumePaper.jsx';
import { getResumeFromApi } from '@/services/resumeServices';
import { useReactToPrint } from 'react-to-print';

import MarginRuler from '@/pages/ResumeEditorPage/features/ResumePaper/components/MarginRuler';
import { PaddingPreviewContext } from '@/pages/ResumeEditorPage/features/ResumePaper/helpers/PaddingPreviewContext';
import { handleGlobalHotKey } from '@/utils/hotKeys';
import { ActionCreators as UndoActionCreators } from "redux-undo";

import styles from './ResumeEditor.module.css';

const ResumeEditorPage = () => {

   const isMobile = useMediaQuery("(max-width: 768px)");
   const location = useLocation();
   const dispatch = useDispatch();
   const { resumeId } = useParams();

   const resume = useSelector(state => state.resume.present)

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
         handleGlobalHotKey(resume, event);
      };

      window.addEventListener('keydown', onGlobalKeyDown);

      return () => {
         window.removeEventListener('keydown', onGlobalKeyDown);
      };
   }, [resume]);

   const resumeRef = useRef(null);
   
   const editorPageRef = useRef(null);

   const [paddingPreview, setPaddingPreview] = useState(null);

   // const pageStyle = `
   //    @page {
   //       size: auto;
   //       margin: 20mm;
   //    }

   //    @media print {
   //       body {
   //          -webkit-print-color-adjust: exact;
   //       }
   //    }
   //    `;
   const pageStyle = `
      @page {
         size: letter portrait;
         margin: 0;
      }

      @media print {
         html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0;
            padding: 0;
         }

         body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
         }
      }
   `;
   
   const reactToPrint = useReactToPrint({
      documentTitle: resume.title,
      contentRef: resumeRef,
      pageStyle: pageStyle,
   });

   const handlePrint = () => {
      reactToPrint();
   };

   const handleBackgroundClick = (event) => {
      if (event.target !== event.currentTarget) return;

      dispatch(setActiveEditorId(null));
      dispatch(setActiveSectionId(null));
   };

   useEffect(() => {
      if (editorPageRef.current) {
         const pageElement = editorPageRef.current;
         const pageRect = pageElement.getBoundingClientRect();
         console.log('EDITOR PAGE REF:', pageRect);
      }
   }, [resume])

   const [resumePageCount, setResumePageCount] = useState(1);
   useEffect(() => {
      let resumePageCount = 1;
      resumePageCount = Math.max(...Object.values(resume.containers.byId).map(container => {
         const containerSections = container.sectionIds.map(sectionId => resume.sections.byId[sectionId]);
         const maxSectionPage = Math.max(...containerSections.map(section => {
            const sectionSubsections = section.subsectionIds.map(subsectionId => resume.subsections.byId[subsectionId]);
            const maxSubsectionPage = Math.max(...sectionSubsections.map(subsection => {
               const subsectionFields = subsection.fieldIds.map(fieldId => resume.fields.byId[fieldId]);
               const maxFieldPage = Math.max(...subsectionFields.map(field => field.pageNumber));
               return Math.max(subsection.pageNumber, maxFieldPage);
            }));
            return Math.max(section.pageNumber, maxSubsectionPage);
         }));
         return maxSectionPage;
      }));

      setResumePageCount(resumePageCount);
      // const reduxContainers = resume.containers.byId

   }, [resume]);

   return (
      <div className={styles.resumeEditorContainer} onClick={handleBackgroundClick}>
         <Toolbar handlePrint={handlePrint} />
         <Outline />
         <PaddingPreviewContext.Provider value={{ preview: paddingPreview, setPreview: setPaddingPreview }}>
            <div ref={resumeRef}>
            {Array.from({ length: resumePageCount }, (_, index) => (
               <ResumePaper key={index} resumePageNumber={index + 1} editorPageRef={editorPageRef} />
            ))}
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
