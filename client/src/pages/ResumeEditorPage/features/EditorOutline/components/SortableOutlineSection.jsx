import { useSortable } from "@dnd-kit/react/sortable";
import React from "react";

import OutlineSection from "./OutlineSection";
import { useDispatch } from "react-redux";
import { deleteSectionFromApi } from "@/services/resumeServices";
import { deleteSection } from "@/store/resumeSlice.js";

import { MdExpandMore, MdExpandLess } from "react-icons/md";

import styles from "../Outline.module.css";

const SortableOutlineSection = ({
  id,
  index,
  getNodeString,
  getSectionById,
  sectionId,
  toggleSection,
  collapsedSections,
  dragItem,
  setDragItem,
  renderFieldRow,
}) => {
  const { ref } = useSortable({ id, index });

  const dispatch = useDispatch();

  const handleDeleteSection = async (sectionId) => {
    const section = getSectionById(sectionId);
    const sectionTitle = getNodeString(section.value[0]);
    if (
      !confirm(
        `Are you sure you want to delete the entire ${sectionTitle} section?`,
      )
    ) {
      return;
    }

    const autoSave = false;

    if (autoSave) {
      const sectionIsDeleted = await deleteSectionFromApi(sectionId);
      if (!sectionIsDeleted) {
        return;
      }
    }
    dispatch(deleteSection(sectionId));
  };
  return (
    <div ref={ref}
      className={`${styles.sectionBlock}`}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.dragHandle}>⋮⋮</div>

        <div className={styles.sectionTitle}>
          {getNodeString(getSectionById(sectionId).value[0])}{" "}
        </div>

        <button
          className={styles.collapseButton}
          onClick={() => toggleSection(sectionId)}
        >
          {collapsedSections[sectionId] ?? true 
          ? <MdExpandMore />
          : <MdExpandLess />
        }
        </button>
      </div>
      {!(collapsedSections[sectionId] ?? true) && (
        <div className={styles.sectionContent}>
          <OutlineSection
            dispatch={dispatch}
            section={getSectionById(sectionId)}
            sectionTitle={getNodeString(getSectionById(sectionId).value[0])}
            dragItem={dragItem}
            setDragItem={setDragItem}
            renderFieldRow={renderFieldRow}
          />

          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteSection(sectionId)}
          >
            Delete Section
          </button>
        </div>
      )}
    </div>
  );
};

export default SortableOutlineSection;
