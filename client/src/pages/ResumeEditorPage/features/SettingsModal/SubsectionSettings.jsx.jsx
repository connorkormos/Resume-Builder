import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addSubsectionToApi, deleteSubsectionFromApi, deleteFieldFromApi } from "@/services/resumeServices.js";
import { updateField, deleteField, updateSection, addSubsection, deleteSubsection } from "@/store/resumeSlice.js";
import { getTrimmedNodeString } from "@/features/Slate/helpers/getNodeString";

import FieldSettings from "./FieldSettings.jsx";

import styles from "./SettingsModal.module.css";

export default function SubsectionSettings ({ section, gridColumnsInput }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (section.layout?.display !== "grid") {
      dispatch(
        updateSection({
          id: section.id,
          layout: {
            display: "grid",
            grid: {
              columns: 1,
            },
          },
        }),
      );
    }
  }, [dispatch, section.id, section.layout?.display]);


  const subsectionsById = useSelector((state) => state.resume.present.subsections.byId);

  const handleDeleteSubsection = async (subId, subIndex) => {
    if (
      !confirm(
        `Are you sure you want to delete the ${section.title} subsection at index ${subIndex}?`,
      )
    ) {
      return;
    }
    const autoSave = false;

    if (autoSave) {
      const subsectionIsDeleted = await deleteSubsectionFromApi(subId);
      if (!subsectionIsDeleted) {
        return;
      }
    }
    dispatch(deleteSubsection(subId));
  };

  const handleAddSubsection = async () => {
    const subsectionData = await addSubsectionToApi(section.id);
    if (!subsectionData) {
      return;
    }
    dispatch(addSubsection({ subsectionData }));
  };

  return (
    <>
      <div className="settingsModalWrapper">
        {/* Advanced Orientation (Check Box to Start a New Row): */}
        {section.subsectionIds.map((subsectionId, index) => {
          const subsection = subsectionsById[subsectionId];
          return (
            <div key={subsectionId}>
              <p style={{ textAlign: "center", fontSize: "125%", marginBottom: "0.5rem" }}>
                Subsection {index + 1}
              </p>
              <div
                className={styles.fieldGridWrapper}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridColumnsInput}, 1fr)`,
                  backgroundColor: "var(--background-toolbar)",
                  border: "var(--border-main)",
                  borderRadius: "var(--border-radius-main)",
                  gap: "1px",
                }}
              >
                {subsection.fieldIds.map((fieldId, index) => {
                  return (
                    <FieldSettings
                      key={fieldId}
                      index={index}
                      fieldId={fieldId}
                      gridColumnsInput={gridColumnsInput}
                    />
                  );
                })}
              </div>
              <div className={styles.subsectionSettingsRowWrapper}>
                <button
                  className={styles.deleteSubsectionButton}
                  onClick={() => handleDeleteSubsection(subsection.id, index)}
                >
                  Delete Subsection
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};