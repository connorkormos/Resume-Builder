import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const page = pageRef?.current;

    if (!page) return;

    let animationFrameId = null;
    const observedElements = new Set();

    const getElementsByQuerySelector = (querySelector) => {
      const elementsByQuerySelector = Array.from(page.querySelectorAll(querySelector));
      // console.log(elementsByQuerySelector);
      return elementsByQuerySelector;
    };

    // const getFields = () => {
    //   const fieldsByQuerySelector = Array.from(page.querySelectorAll(`.resumeSlateField`));
    //   // console.log(fieldsByQuerySelector);
    //   return fieldsByQuerySelector;
    // }

    const getContainerContentHeight = (container) => {
      return Array.from(container.children).reduce((totalHeight, childElement) => {
        return totalHeight + childElement.getBoundingClientRect().height;
      }, 0);
    };

    const checkPageLength = () => {
      // getFields();
      const resumePaddingBottom = parseFloat(reduxResume?.layout?.padding?.bottom ?? 0);
      const pageBottom = page.getBoundingClientRect().bottom - resumePaddingBottom * 16;
      let contentHasBeenMoved = false;
      for (const field of getElementsByQuerySelector(`.resumeField`)) {
        if (field.getBoundingClientRect().bottom > pageBottom) {
          const fieldId = field.getAttribute('data-field-id');
          dispatch(updateField({ id: fieldId, pageNumber: resumePageNumber + 1}));
          const fieldSubsection = reduxSubsectionsById[reduxFieldsById[fieldId].subsectionId];
          const fieldSection = reduxSectionsById[fieldSubsection.sectionId];
          if (fieldSection.subsectionIds.length === 1) {
            dispatch(updateSection({ id: fieldSection.id, pageNumber: resumePageNumber + 1 }));
          }
          dispatch(updateSubsection({ id: fieldSubsection.id, pageNumber: resumePageNumber + 1 }));
          contentHasBeenMoved = true;
        }
      }

      if (!contentHasBeenMoved) {
        for (const section of getElementsByQuerySelector(`.resumeSection`)) {
          if (section.getBoundingClientRect().bottom > pageBottom) {
            const sectionId = section.getAttribute('data-section-id');
            const reduxSection = reduxSectionsById[sectionId];

            console.log("Section: ", section);
            console.log('Redux section:', reduxSection);
            const reduxSectionPaddingBottom = reduxSection?.layout?.padding?.bottom ? parseFloat(reduxSection.layout.padding.bottom) : 0;
            console.log('Redux section padding bottom:', reduxSectionPaddingBottom);

            const sectionBottom = section.getBoundingClientRect().bottom;
            const pageBottom = page.getBoundingClientRect().bottom - resumePaddingBottom * 16;
            const maxPaddingBottom = sectionBottom - pageBottom;

            // const paddingBottom = `${Math.max(0, sectionBottom - pageBottom) / 16}rem`;
            const newSectionPaddingBottom = parseFloat(reduxSectionPaddingBottom ) - maxPaddingBottom / 16 + 'rem';
            // convert the new padding bottom value to rem
            dispatch(updateSection(
              {
                id: sectionId,
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
  }, [pageRef]);

  if (!showEndPageMarker) return null;
  return null;

  // return <p>Content exceeds one page</p>
  // return <OverFlowResumePaper />;
  // return <div className={styles.endPageMarker}>Content exceeds one page</div>;
};

export default EndPageMarker;
