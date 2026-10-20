import React from "react";
import { useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/react";

import Section from "./Section.jsx";

import styles from "./ResumePaper.module.css";
import { CollisionPriority } from "@dnd-kit/abstract";

const Container = ({
  container,
  sectionIds,
  sectionById,
  previewWidth,
  containerPreviewWidths,
  rightContainerId,
  onStartResize,
  onResizeWithKeyboard,
}) => {
  const reduxContainers = useSelector(
    (state) => state.resume.present.containers.allIds,
  );
  const isFirstContainer = reduxContainers[0] === container.id;
  const isLastContainer = reduxContainers[reduxContainers.length - 1] === container.id;
  const { ref } = useDroppable({
    id: container.id,
    type: "container",
    accept: "section",
    collisionPriority: CollisionPriority.High,
  });

  if (!sectionIds) {
    console.error(`Container with ID ${container.id} is missing sectionIds.`);
    return (
      <div key={container.id} className={styles.containerWrapperDiv}>
        <p>No sections to display.</p>
      </div>
    );
  }

  // If the container doesn't have a valid width, set it to a default value that splits remaining space evenly.
  let containerStyling = {
    flex: previewWidth
      ? `0 0 ${previewWidth}%`
      : container?.layout?.width?.auto
        ? "1 1 0%"
        : `0 0 ${container?.layout?.width?.value}`,
    // paddingLeft: container?.layout?.padding?.left ?? resumeLayout.padding.left,
    // paddingRight: container?.layout?.padding?.right ?? resumeLayout.padding.right,
  };

  const renderedSections = sectionIds.map((sectionId, index) => {
    const section = sectionById[sectionId];
    if (!sectionId) {
      console.error(
        `Container with ID ${container.id} has an invalid section ID: ${sectionId}`,
      );
      return null;
    } else if (!section) {
      return (
        <div key={sectionId}>
          <p>No Section to Display.</p>
        </div>
      );
    } else {
      return (
        <Section
          key={sectionId}
          id={sectionId}
          section={section}
          container={container}
          index={index}
          hasNextSection={Boolean(sectionById[sectionIds[index + 1]])}
        />
      );
    }
  });

  const isResizingPair = containerPreviewWidths?.[container.id] != null
    && containerPreviewWidths?.[rightContainerId] != null;
  let previewWidthStrings = [];
  if (isResizingPair) {
    previewWidthStrings.push(
      String(containerPreviewWidths[container.id]).slice(0, 4) + "%",
    );
    previewWidthStrings.push(
      String(containerPreviewWidths[rightContainerId]).slice(0, 4) + "%",
    );
  }

  return (
    <div
      key={container.id}
      id={container.id}
      className={styles.containerWrapperDiv}
      style={{ ...containerStyling, position: "relative" }}
      ref={ref}
    >
      {renderedSections}
      {!isLastContainer && (
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
            onPointerDown={(event) => onStartResize(container.id, event)}
            onKeyDown={(event) => onResizeWithKeyboard(container.id, event)}
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
