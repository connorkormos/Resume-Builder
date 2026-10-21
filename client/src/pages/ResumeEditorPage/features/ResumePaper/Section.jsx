import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dndReorderSubsections,
  setActiveEditorId,
  setActiveEditorSelection,
  setActiveSectionId,
  setActiveSectionIds,
} from "@/store/resumeSlice.js";
// import { setActiveSectionId, setActiveEditorId, setActiveEditorSelection } from "../../../../../resumeSlice.js";


import useSectionPaddingResize from "./helpers/useSectionPaddingResize.js";
import { useSortable } from "@dnd-kit/react/sortable";
import {
  DragDropProvider,
  KeyboardSensor,
  PointerSensor,
} from "@dnd-kit/react";

import { MdSettings } from "react-icons/md";

import SubsectionRenderer from "./Subsection.jsx";
import SlateHeading from "@/features/Slate/SlateHeading.jsx";
import SettingsModal from "../SettingsModal/SettingsModal.jsx";
import SectionBorder from "./components/SectionBorder.jsx";

import styles from "./Section.module.css";

const sectionPointerSensor = PointerSensor.configure({
  preventActivation(event, source) {
    if (
      event.target instanceof Element &&
      event.target.closest('[data-section-dnd-exclude="true"]')
    ) {
      return true;
    }

    return PointerSensor.defaults.preventActivation(event, source);
  },
});

const sectionSensors = [sectionPointerSensor, KeyboardSensor];

const Section = ({ section, container, index, presentation, orderedSectionIds }) => {

  const { hasNextSection } = presentation;
  const { handleProps } = useSectionPaddingResize(section, container, orderedSectionIds);
  const dispatch = useDispatch();

  const { ref } = useSortable({
    id: section.id,
    index,
    type: "section",
    accept: "section",
    group: container.id,
    data: { containerId: container.id },
    sensors: sectionSensors,
  });

  const activeSectionIds = useSelector(
    (state) => state.resume.present.activeSectionIds,
  );
  const subsections = useSelector((state) => state.resume.present.subsections);


  const renderedSubsections = section.subsectionIds?.map((subId) => {
    const subsection = subsections.byId[subId];
    if (!subsection) {
      console.error(`Subsection with ID ${subId} not found.`);
      return null;
    }
    return <SubsectionRenderer key={subsection.id} subsection={subsection} />;
  });

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSettingsIconClick = (e) => {
    e.stopPropagation();
    dispatch(setActiveEditorId(null));
    dispatch(setActiveEditorSelection(null));
    dispatch(setActiveSectionId(section.id));
    setIsSettingsModalOpen(!isSettingsModalOpen);
  };

  const handleSetActiveSection = (e) => {
    if (e.ctrlKey) {
      dispatch(setActiveSectionIds(section.id));
    } else {
      dispatch(setActiveSectionId(section.id));
    }
    //  If clicking on the section container itself, not on a subsection or field, clear the active editor and selection to allow changes directly on the section
    if (e.target.dataset.sectionId) {
      dispatch(setActiveEditorId(null));
      dispatch(setActiveEditorSelection([]));
    }
  };

  const sectionIsActive = activeSectionIds.includes(section.id);

  const sectionBorder = section.styling?.border;

  return (
    <div
      className={`${styles.sectionContainerDiv} ${sectionIsActive && styles.activeSectionContainer}`}
      ref={ref}
      data-id={section.id}
      data-container-id={section.containerId}
      data-position={section.position}
      data-section-id={section.id}
      data-section-container-id={section.containerId}
      data-section-position={section.position}
      style={{
        ...presentation.style,
        outlineColor: section.styling?.color,
        cursor: "all-scroll",
      }}
      onClick={(e) => handleSetActiveSection(e)}
    >
      <div
        className={`${styles.sectionContentWrapper} ${sectionIsActive && styles.active}`}
        data-section-id={section.id}
        style={{ cursor: "auto" }}
      >
        <button className={styles.sectionSettingsButton}>
          <span
            className={styles.sectionSettingsButtonIcon}
            onClick={handleSettingsIconClick}
          >
            <MdSettings />
          </span>
        </button>
        {section.showHeading !== false && (
          <SlateHeading key={section.id} section={section} id={section.id} />
        )}
        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            const { source } = event.operation;
            if (!source) return;

            const fromIndex = source.initialIndex;
            const toIndex = source.index;
            const ids = section.subsectionIds;

            if (
              !Number.isInteger(fromIndex) ||
              !Number.isInteger(toIndex) ||
              fromIndex < 0 ||
              toIndex < 0 ||
              fromIndex >= ids.length ||
              toIndex >= ids.length ||
              fromIndex === toIndex
            ) return;

            dispatch(dndReorderSubsections({
              fromSubsectionId: ids[fromIndex],
              toSubsectionId: ids[toIndex],
            }));
          }}
        >
          {renderedSubsections}
        </DragDropProvider>
      </div>
      {isSettingsModalOpen && (
        <SettingsModal
          section={section}
          isSettingsModalOpen={isSettingsModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          container={container}
        />
      )}
      {sectionBorder?.top && (
        <SectionBorder sectionBorder={sectionBorder.top} borderSide="top" />
      )}
      {sectionBorder?.bottom && (
        <SectionBorder
          sectionBorder={sectionBorder.bottom}
          borderSide="bottom"
        />
      )}
      {sectionBorder?.left && (
        <SectionBorder sectionBorder={sectionBorder.left} borderSide="left" />
      )}
      {sectionBorder?.right && (
        <SectionBorder sectionBorder={sectionBorder.right} borderSide="right" />
      )}
      {hasNextSection && (
        <button
          type="button"
          className={styles.sectionResizeHandle}
          aria-label="Adjust section bottom padding"
          data-section-dnd-exclude="true"
          {...handleProps}
        />
      )}
    </div>
  );
};

export default Section;
