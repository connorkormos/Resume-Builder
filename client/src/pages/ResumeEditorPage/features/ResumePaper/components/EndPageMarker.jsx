import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateField, updateSubsection, updateSection } from "@/store/resumeSlice.js";

import OverFlowResumePaper from "../OverflowResumePaper.jsx";

import styles from "../ResumePaper.module.css";

const EndPageMarker = ({ pageRef, resumePageNumber }) => {

  const dispatch = useDispatch();

  const [showEndPageMarker, setShowEndPageMarker] = useState(false);

  const reduxResume = useSelector((state) => state.resume.present);
  const reduxContainersById = reduxResume.containers.byId;
  const reduxSectionsById = reduxResume.sections.byId;
  const reduxSubsectionsById = reduxResume.subsections.byId;
  const reduxFieldsById = reduxResume.fields.byId;

  const latestResumeRef = useRef(reduxResume);

  useLayoutEffect(() => {
    latestResumeRef.current = reduxResume;
  }, [reduxResume]);

  useEffect(() => {
    const page = pageRef?.current;

    if (!page) return;

    let animationFrameId = null;
    const observedElements = new Set();

    const getElementsByQuerySelector = (querySelector) => {
      const elementsByQuerySelector = Array.from(page.querySelectorAll(querySelector));
      return elementsByQuerySelector;
    };

    const getContainerContentHeight = (container) => {
      return Array.from(container.children).reduce((totalHeight, childElement) => {
        return totalHeight + childElement.getBoundingClientRect().height;
      }, 0);
    };

    const checkPageLength = () => {
      const reduxResume = latestResumeRef.current;
      const reduxContainersById = reduxResume.containers.byId;
      const reduxSectionsById = reduxResume.sections.byId;
      const reduxSubsectionsById = reduxResume.subsections.byId;
      const reduxFieldsById = reduxResume.fields.byId;

      const resumePaddingBottom = parseFloat(reduxResume?.layout?.padding?.bottom ?? 0);
      const pageBottom = page.getBoundingClientRect().bottom - resumePaddingBottom * 16;
      let contentHasBeenMoved = false;
      for (const field of getElementsByQuerySelector(`.resumeField`)) {
        if (field.getBoundingClientRect().bottom > pageBottom) {
          const fieldId = field.getAttribute('data-field-id');
          const fieldSubsection = reduxSubsectionsById[reduxFieldsById[fieldId].subsectionId];
          const fieldSection = reduxSectionsById[fieldSubsection.sectionId];
          if (fieldSection.subsectionIds.length > 1) {
            dispatch(updateSubsection({ id: fieldSubsection.id, pageNumber: resumePageNumber + 1 }));
            for (const id of fieldSubsection.fieldIds) {
              dispatch(updateField({ id, pageNumber: resumePageNumber + 1 }));
            }
          } else if (fieldSection.subsectionIds.length === 1) {
            dispatch(updateSection({ id: fieldSection.id, pageNumber: resumePageNumber + 1 }));
            for (const subsectionId of fieldSection.subsectionIds) {
              dispatch(updateSubsection({ id: subsectionId, pageNumber: resumePageNumber + 1 }));
              const subsection = reduxSubsectionsById[subsectionId];
              for (const fieldId of subsection.fieldIds) {
                dispatch(updateField({ id: fieldId, pageNumber: resumePageNumber + 1 }));
              }
            }
            
          }
          dispatch(updateField({ id: fieldId, pageNumber: resumePageNumber + 1}));
          contentHasBeenMoved = true;
        }
      }

      if (!contentHasBeenMoved) {
        for (const section of getElementsByQuerySelector(`.resumeSection`)) {
          if (section.getBoundingClientRect().bottom > pageBottom) {
            const sectionId = section.getAttribute('data-section-id');
            const reduxSection = reduxSectionsById[sectionId];

            const sectionBottom = section.getBoundingClientRect().bottom;
            const pageBottom = page.getBoundingClientRect().bottom;
            if (sectionBottom <= pageBottom) continue;
            
            const reduxSectionPaddingBottom = reduxSection?.layout?.padding?.bottom ?? 0;
            const sectionPaddingBottomOverflow = sectionBottom - pageBottom;
            const newSectionPaddingBottom = parseFloat(reduxSectionPaddingBottom) - sectionPaddingBottomOverflow / 16 + 'rem';
            const sectionPageNumber = reduxSection?.pageNumber ?? 1;
            dispatch(updateSection(
              {
                id: sectionId,
                // pageNumber: sectionPageNumber + 1,
                layout: {
                  padding: {
                    bottom: newSectionPaddingBottom,
                  }
                }
              }
            ));
          }
        }
      }

      const pageIsTooLong = getElementsByQuerySelector(`.${styles.containerWrapperDiv}`).some((container) => {
        const containerBottom = container.getBoundingClientRect().bottom;
        const containerHeight = container.getBoundingClientRect().height;
        const contentHeight = getContainerContentHeight(container);

        return containerBottom > pageBottom + 1 || contentHeight > containerHeight + 1;
      });

      setShowEndPageMarker((previousValue) => (
        previousValue === pageIsTooLong ? previousValue : pageIsTooLong
      ));
    };

    const scheduleMeasure = () => {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = null;
        checkPageLength();
      });
    };

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(scheduleMeasure)
      : null;

    const observeElementSize = (element) => {
      if (!resizeObserver || observedElements.has(element)) return;

      resizeObserver.observe(element);
      observedElements.add(element);
    };

    const observeContainerSizes = () => {
      getElementsByQuerySelector(`.${styles.containerWrapperDiv}`).forEach((container) => {
        observeElementSize(container);
        Array.from(container.children).forEach(observeElementSize);
      });
    };

    const mutationObserver = new MutationObserver(() => {
      observeContainerSizes();
      scheduleMeasure();
    });

    mutationObserver.observe(page, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });

    observeContainerSizes();
    window.addEventListener("resize", scheduleMeasure);
    scheduleMeasure();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [pageRef, resumePageNumber, dispatch]);

  if (!showEndPageMarker) return null;
  return null;

  // return <p>Content exceeds one page</p>
  // return <OverFlowResumePaper />;
  // return <div className={styles.endPageMarker}>Content exceeds one page</div>;
};

export default EndPageMarker;
