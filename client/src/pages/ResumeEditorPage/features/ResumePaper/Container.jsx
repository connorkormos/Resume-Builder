import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { useSelector } from "react-redux";

import Section from "./Section.jsx";

import { CollisionPriority } from "@dnd-kit/abstract";

import styles from "./ResumePaper.module.css";

const Container = ({
  container,
  presentation,
  sectionPresentations,
  sectionsById,
  containerPreviewWidths,
  rightContainerId,
  resizeTrackId,
  onStartResize,
  onResizeWithKeyboard,
  resumePageNumber,
}) => {
  const { ref } = useDroppable({
    id: container.id,
    type: "container",
    accept: "section",
    collisionPriority: CollisionPriority.High,
  });

  const renderedIds = presentation.sectionIds;

  const reduxSubsectionsById = useSelector(state => state.resume.present.subsections.byId);
  const reduxFieldsById = useSelector(state => state.resume.present.fields.byId);

  const renderedSections = renderedIds.map((sectionId, index) => {
    const section = sectionsById[sectionId];
    if (!section) return null;
    let sectionHasContentOnCurrentResumePage = section.pageNumber === resumePageNumber;
    const sectionSubsections = section.subsectionIds.map(subsectionId => reduxSubsectionsById[subsectionId]);
    if (!sectionHasContentOnCurrentResumePage) {

      for (const subsection of sectionSubsections) {
        if (subsection?.pageNumber === resumePageNumber) {
          sectionHasContentOnCurrentResumePage = true;
          break;
        }
        const subsectionFields = subsection.fieldIds.map(fieldId => reduxFieldsById[fieldId]);
        for (const field of subsectionFields ?? []) {
          if (field.pageNumber === resumePageNumber) {
            sectionHasContentOnCurrentResumePage = true;
            break;
          }
        }
        if (sectionHasContentOnCurrentResumePage) break;
      }
    };
    if (!sectionHasContentOnCurrentResumePage) return null;
    
    return (
      <Section
        key={sectionId}
        section={section}
        index={index}
        presentation={sectionPresentations[sectionId]}
        orderedSectionIds={renderedIds}
        resumePageNumber={resumePageNumber}
      />
    );
  });

  const isResizingPair = containerPreviewWidths?.[resizeTrackId] != null
    && containerPreviewWidths?.[rightContainerId] != null;
  const previewWidthStrings = isResizingPair
    ? [resizeTrackId, rightContainerId].map(id => `${containerPreviewWidths[id].toFixed(1)}%`)
    : [];

  return (
    <div
      id={container.id}
      className={styles.containerWrapperDiv}
      style={presentation.style}
      ref={ref}
    >
      {renderedSections}
      {!renderedIds.length && <p>Drop a section here</p>}
      {rightContainerId && (
        <div>
          {isResizingPair && (
            <p className={styles.containerPreviewWidthLeft}>
              {previewWidthStrings[0]}
            </p>
          )}
          <button
            type="button"
            className={styles.containerResizeHandle}
            aria-label="Resize adjacent containers"
            onPointerDown={(event) => onStartResize(resizeTrackId, event)}
            onKeyDown={(event) => onResizeWithKeyboard(resizeTrackId, event)}
          />
          {isResizingPair && (
            <p className={styles.containerPreviewWidthRight}>
              {previewWidthStrings[1]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Container;
