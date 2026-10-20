import { deriveSectionBoundaries } from '@/utils/resumeLayout.js';
import React from "react";
import { useDroppable } from "@dnd-kit/react";

import Section from "./Section.jsx";

import styles from "./ResumePaper.module.css";
import { CollisionPriority } from "@dnd-kit/abstract";

const Container = ({
  container,
  sectionIds = [],
  sectionById,
  placement,
  boundaries,
  containerPreviewWidths,
  rightContainerId,
  resizeTrackId,
  onStartResize,
  onResizeWithKeyboard,
}) => {
  const { ref } = useDroppable({
    id: container.id,
    type: "container",
    accept: "section",
    collisionPriority: CollisionPriority.High,
  });

  const containerStyling = {
    position: 'relative',
    gridRow: `${placement.rowStart} / span ${placement.rowSpan}`,
    gridColumn: `${placement.columnStart} / span ${placement.columnSpan}`,
  };
  const renderedIds = sectionIds.filter(id => sectionById[id]);

  const renderedSections = renderedIds.map((sectionId, index) => (
    <Section
      key={sectionId}
      section={sectionById[sectionId]}
      container={container}
      index={index}
      hasNextSection={index < renderedIds.length - 1}
      orderedSectionIds={renderedIds}
      boundaries={deriveSectionBoundaries(boundaries, renderedIds, sectionId)}
    />
  ));

  const isResizingPair = containerPreviewWidths?.[resizeTrackId] != null
    && containerPreviewWidths?.[rightContainerId] != null;
  const previewWidthStrings = isResizingPair
    ? [resizeTrackId, rightContainerId].map(id => `${containerPreviewWidths[id].toFixed(1)}%`)
    : [];

  return (
    <div
      id={container.id}
      className={styles.containerWrapperDiv}
      style={containerStyling}
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
