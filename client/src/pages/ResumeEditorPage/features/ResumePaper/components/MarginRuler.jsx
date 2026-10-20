import { EditorLayoutContext } from '../helpers/EditorLayoutContext.js';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import styles from './MarginRuler.module.css';
import MarginRulerTop from './MarginRulerTop';
import MarginRulerSide from './MarginRulerSide';
import { PaddingPreviewContext } from '../helpers/PaddingPreviewContext';
import { useDispatch, useSelector } from 'react-redux';
import useMarginGeometry from '@/hooks/useMarginGeometry';
import { setActiveSectionId, setActiveEditorId, setActiveEditorSelection } from '@/store/resumeSlice';

const MarginRuler = ({ pageRef }) => {

   const dispatch = useDispatch();
   const { preview } = useContext(PaddingPreviewContext);
   const activeSectionId = useSelector(state => state.resume.present.activeSectionIds[0] ?? null);
   const sectionId = preview?.target === 'section' ? preview.id : activeSectionId;
   const layoutContexts = useContext(EditorLayoutContext);
   const storedContainerId = useSelector(state => state.resume.present.sections.byId[sectionId]?.containerId);
   const containerId = layoutContexts[sectionId]?.containerId ?? storedContainerId;
   // Share one measurement and observer set between both rulers.
   const geometry = useMarginGeometry(pageRef, containerId, sectionId);

   const [visibleMarginLabels, setVisibleMarginLabels] = useState(() => new Set());
   const marginLabelDisplayTimers = useRef(new Map());

   const cancelHideMarginLabel = useCallback((id) => {
      clearTimeout(marginLabelDisplayTimers.current.get(id));
      marginLabelDisplayTimers.current.delete(id);
   }, []);

   const showMarginLabel = useCallback((id) => {
      cancelHideMarginLabel(id);
      setVisibleMarginLabels(previous => previous.has(id) ? previous : new Set(previous).add(id));
   }, [cancelHideMarginLabel]);

   const delayHideMarginLabel = useCallback((id) => {
      cancelHideMarginLabel(id);
      marginLabelDisplayTimers.current.set(id, setTimeout(() => {
         marginLabelDisplayTimers.current.delete(id);
         setVisibleMarginLabels(previous => {
            const next = new Set(previous);
            next.delete(id);
            return next;
         });
      }, 1500));
   }, [cancelHideMarginLabel]);

   const flashLabel = useCallback((id) => {
      showMarginLabel(id);
      delayHideMarginLabel(id);
   }, [showMarginLabel, delayHideMarginLabel]);

   // Keep the preview label visible even when the pointer pauses; linger on release.
   const previewLabel = preview
      ? `${preview.target === 'resume' ? 'resume' : preview.id}-${preview.side}`
      : null;
   const displayedMarginLabels = new Set(visibleMarginLabels);
   if (previewLabel) displayedMarginLabels.add(previewLabel);
   useEffect(() => {
      return () => {
         if (previewLabel) flashLabel(previewLabel);
      };
   }, [previewLabel, flashLabel]);

   useEffect(() => {
      const timers = marginLabelDisplayTimers.current;
      return () => {
         timers.forEach(timer => clearTimeout(timer));
         timers.clear();
      };
   }, []);

   const renderMarginRuler = (target, step, endsWith = [], position) => {
      const count = target / step + 1;

      return (
         Array.from(
            { length: count }, (_, index) => {
               const value = (index * step).toFixed(1);
               let displayValue = endsWith.includes(value.at(-1))
                  && value != 0 && value != 11;
               return (
                  <span
                     key={value}
                     className={
                        displayValue
                           ? position === 'top'
                              ? styles.topMarginRulerSpan : styles.sideMarginRulerSpan
                           : position === 'top'
                              ? styles.topHiddenMarginSpan : styles.sideHiddenMarginSpan
                     }
                     style={{ marginLeft: displayValue && '0.1rem' }}
                     value={value}
                  >
                     {displayValue
                        ? value.endsWith('.0')
                           ? value.slice(0, -2)
                           : value
                        : null}
                  </span>
               )
            }
         )
      );
   }

   const handleEditorBlur = (e) => {
      e.stopPropagation()
      const preventBlur = e.target.closest("[data-prevent-blur]");
      if (preventBlur) return;
      dispatch(setActiveEditorId(null));
      dispatch(setActiveEditorSelection(null))
      dispatch(setActiveSectionId(null))
   }

   return (
      <div
         className={styles.marginsContainer}
         onClick={(e) => handleEditorBlur(e)}
      >
         <MarginRulerTop
            visibleMarginLabels={displayedMarginLabels}
            showMarginLabel={showMarginLabel}
            delayHideMarginLabel={delayHideMarginLabel}
            flashLabel={flashLabel}
            geometry={geometry}
            pageRef={pageRef}
            renderMarginRuler={renderMarginRuler}
         />
         <MarginRulerSide
            visibleMarginLabels={displayedMarginLabels}
            showMarginLabel={showMarginLabel}
            delayHideMarginLabel={delayHideMarginLabel}
            flashLabel={flashLabel}
            geometry={geometry}
            pageRef={pageRef}
            renderMarginRuler={renderMarginRuler}
         />
      </div>
   )
}

export default MarginRuler;
