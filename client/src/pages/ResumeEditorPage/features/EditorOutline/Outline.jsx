import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reorderSections } from "@/store/resumeSlice.js";

import { DragDropProvider } from "@dnd-kit/react";
import { Node } from "slate";

import { useMediaQuery } from '@/hooks/useMediaQuery.js';

import { IoClose } from "react-icons/io5";
import { SiApachearrow } from "react-icons/si";

import FieldRow from "./components/FieldRow.jsx";
import SortableOutlineSection from "@/pages/ResumeEditorPage/features/EditorOutline/components/SortableOutlineSection.jsx";
import styles from "./Outline.module.css";
import CurrentlyEditing from "../EditorToolbar/components/CurrentlyEditing.jsx";

const Outline = () => {
  const isMobile = useMediaQuery('(max-width: 768px');
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume.present);
  const sections = resume.sections;
  // const sections = useSelector((state) => state.resume.present.sections);

  const [showOutline, setShowOutline] = useState(false);

  // Collapse state for SECTIONS
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (id) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? true),
    }));
  };

  // Drag state
  const [dragItem, setDragItem] = useState(null);

  const renderFieldRow = (sectionId, subsectionId, fieldId, fieldIndex) => {
    const isHeaderOrSummary = subsectionId === null;

    return (
      <React.Fragment key={fieldIndex}>
        <FieldRow
          key={fieldId}
          fieldId={fieldId}
          fieldIndex={fieldIndex}
          sectionId={sectionId}
          subsectionId={subsectionId}
          // handleFieldChange={handleFieldChange}
          isHeaderOrSummary={isHeaderOrSummary}
          dragItem={dragItem}
          setDragItem={setDragItem}
        />
      </React.Fragment>
    );
  };

  const getSectionById = (sectionId) => {
    return sections.byId[sectionId];
  };

  const getNodeString = (slateValue) => {
    return Node.string(slateValue);
  };

  const [lastDraggedOverSectionId, setLastDraggedOverSectionId] = useState(null);

  return (
    <>
      <div
        className={`${showOutline ? styles.outlineContainer : styles.hiddenOutlineContainer}`}
      >

        {!isMobile ? (
          <div className={styles.outlineHeaderRow}>
            <h1 className={styles.outlineTitle}>Resume Outline</h1>

            <button
              className={
                showOutline ? styles.hideOutlineButton : styles.showOutlineButton
              }
              onClick={() => setShowOutline(!showOutline)}
            >
              <span>{showOutline ? "⟨⟨⟨" : "⟩⟩⟩"}</span>
            </button>
          </div>
        )
          : (
            <div className={styles.outlineHeaderRow}>
              <h1 className={styles.outlineTitle}>Resume Outline</h1>
              {showOutline && (
                <IoClose
                  className={styles.hideOutlineButton}
                  onClick={() => setShowOutline(!showOutline)}
                />
              )}
            </div>
          )}
        <DragDropProvider
          onDragOver={({ operation }) => {
            const { source, target } = operation;
            console.log(`${source.id} is over ${target?.id}`);
            //  if (!target.id) return;
            if (target?.id && source.id != target?.id) {
              setLastDraggedOverSectionId(target.id);
            }
          }}
          onDragEnd={({ operation }) => {
            const { source, target } = operation;
            console.log(`Dropped ${source.id} onto ${lastDraggedOverSectionId}`);
            if (
              !lastDraggedOverSectionId ||
              source.id === lastDraggedOverSectionId
            ) {
              return;
            }

            dispatch(
              reorderSections({
                fromId: source.id,
                toId: lastDraggedOverSectionId,
              }),
            );
          }}
        >


          <div className={styles.outlineWrapper}>
            {!sections.allIds.length ? (
              <h2>No Sections to Display</h2>
            ) : (
              sections.allIds.map((sectionId, index) => (
                <SortableOutlineSection
                  getNodeString={getNodeString}
                  getSectionById={getSectionById}
                  sectionId={sectionId}
                  toggleSection={toggleSection}
                  key={sectionId}
                  id={sectionId}
                  index={index}
                  collapsedSections={collapsedSections}
                  dragItem={dragItem}
                  setDragItem={setDragItem}
                  renderFieldRow={renderFieldRow}
                />
              ))
            )}
          </div>
        </DragDropProvider>
      </div>
      {/* {!showOutline && ( */}
      {isMobile && (

        <div className={styles.currentlyEditingShowOutlineWrapper}>
          <button
            className={styles.showOutlineButton}
            onClick={() => setShowOutline(!showOutline)}
          >
            <SiApachearrow
            />
          </button>
          <CurrentlyEditing />
        </div>
      )}
      {/* )} */}
    </>
  );
};

export default Outline;
