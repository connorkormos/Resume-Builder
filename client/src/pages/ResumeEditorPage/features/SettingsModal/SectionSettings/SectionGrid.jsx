import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addSubsectionToApi, deleteSubsectionFromApi, deleteFieldFromApi } from "@/services/resumeServices.js";
import { updateField, deleteField, updateSection, addSubsection, deleteSubsection } from "@/store/resumeSlice.js";
import { getTrimmedNodeString } from "@/features/Slate/helpers/getNodeString";

import styles from "../SettingsModal.module.css";

const SectionGrid = ({ section }) => {
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
  const gridColumnsInput = section.layout?.display === "grid"
    ? section.layout?.grid?.columns ?? 1
    : 1;

  const subsectionsById = useSelector((state) => state.resume.present.subsections.byId);
  const reduxFieldsById = useSelector((state) => state.resume.present.fields.byId);

  const updateColumnCount = (newColumnCount) => {
    if (newColumnCount < 1) return;
    dispatch(
      updateSection({
        id: section.id,
        layout: {
          grid: {
            columns: newColumnCount,
          },
        },
      }),
    );
  };

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

  const handleDeleteField = async (fieldId) => {
    if (!confirm(`Are you sure you want to delete this field?`)) {
      return;
    }
    const autoSave = false;

    if (autoSave) {
      const fieldIsDeleted = await deleteFieldFromApi(fieldId);
      if (!fieldIsDeleted) {
        return;
      }
    }
    dispatch(deleteField(fieldId));
  };

  return (
    <>
      {/* <h2>Grid Settings</h2> */}
      <div className="flexColumn">
        <h3>Advanced Orientation:</h3>
        <label htmlFor="flex-direction-select" className="flexRow">
          Columns:
          <button className="buttonMain" onClick={() => updateColumnCount(gridColumnsInput - 1)}>
            -
          </button>
          <input
            className="inputMain"
            type="number"
            value={gridColumnsInput}
            onChange={(e) => {
              updateColumnCount(Number(e.target.value));
            }}
            style={{ width: "3rem" }}
          />
          <button className="buttonMain" onClick={() => updateColumnCount(gridColumnsInput + 1)}>
            +
          </button>

        </label>
        {/* <div className={styles.subsectionSettingsRowWrapper}>
          <button
            className={styles.addSubsectionButton}
            onClick={handleAddSubsection}
          >
            Add Subsection
          </button>
        </div> */}
      </div>

      <div className="flexColumn">
        {/* Advanced Orientation (Check Box to Start a New Row): */}
        {section.subsectionIds.map((subsectionId, index) => {
          const subsection = subsectionsById[subsectionId];
          return (
            <div key={subsectionId}>
              <p style={{ textAlign: "center", fontSize: "125%", marginBottom: "0.5rem" }}>
                Subsection {index + 1}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridColumnsInput}, 1fr)`,
                  backgroundColor: "var(--background-toolbar)",
                  border: "var(--border-main)",
                  borderRadius: "var(--border-radius-main)",
                  gap: "1px",
                  // border: '1px solid white',
                  // gap: "1rem",
                }}
              >
                {subsection.fieldIds.map((fieldId, index) => {
                  const field = reduxFieldsById[fieldId];
                  const fieldIsNewRow = field.layout.startNewRow;
                  const fieldShouldFillRow =
                    field.layout.grid?.fillRow || false;
                  const nextField =
                    reduxFieldsById[subsection.fieldIds[index + 1]];
                  const totalColumns = Math.max(
                    1,
                    Number(gridColumnsInput) || 1,
                  );
                  let currentColumn = 1;

                  for (let i = 0; i < index; i += 1) {
                    const nextRenderedField =
                      reduxFieldsById[subsection.fieldIds[i + 1]];
                    const shouldResetBeforeNext =
                      nextRenderedField?.layout?.startNewRow;

                    if (
                      shouldResetBeforeNext ||
                      currentColumn >= totalColumns
                    ) {
                      currentColumn = 1;
                    } else {
                      currentColumn += 1;
                    }
                  }

                  let isLastColumn = currentColumn === totalColumns;
                  const remainingColumnsInRow =
                    totalColumns - currentColumn + 1;
                  const columnSpanValue = Math.max(1, remainingColumnsInRow);
                  const isOnlyItemInRow =
                    currentColumn === 1 &&
                    (Boolean(nextField?.layout?.startNewRow) || !nextField);
                  const isLastItemInIncompleteRow = !nextField && !isLastColumn;
                  const shouldSpanRemainingColumns =
                    fieldShouldFillRow && isOnlyItemInRow;

                  // console.log(checked);
                  let fieldString = getTrimmedNodeString(field);
                  if (fieldString.length > 20) fieldString = fieldString.slice(0, 15) + "...";
                  else if (!fieldString.length) fieldString = `Field ${index + 1} (Empty)`;
                  return (
                    <div
                      key={fieldId}
                      className={styles.fieldGridItemWrapper}
                      style={{
                        gridColumnEnd: shouldSpanRemainingColumns
                          ? `span ${columnSpanValue}`
                          : "auto",
                        gridColumnStart: fieldIsNewRow ? 1 : "auto",

                      }}
                    >
                      {/* <p>Field {index + 1}</p> */}
                      <p>{fieldString}</p>
                      <button
                        className={styles.deleteFieldButton}
                        onClick={() => handleDeleteField(fieldId)}
                      >
                        X
                      </button>
                      <div className="flexColumn">
                        {(currentColumn !== 1 || fieldIsNewRow) && (
                          <div className="flexRow">
                            <input
                              type="checkbox"
                              checked={fieldIsNewRow}
                              onChange={(event) => {
                                // setStartNewRow(event.target.checked)
                                dispatch(
                                  updateField({
                                    id: fieldId,
                                    layout: {
                                      startNewRow: event.target.checked,
                                    },
                                  }),
                                );
                              }}
                            />
                            <span>Start New Row</span>
                          </div>
                        )}
                        {(isLastItemInIncompleteRow || isOnlyItemInRow) && (
                          <div className="flexRow">
                            <input
                              type="checkbox"
                              checked={fieldShouldFillRow}
                              onChange={(event) => {
                                // setStartNewRow(event.target.checked)
                                dispatch(
                                  updateField({
                                    id: fieldId,
                                    layout: {
                                      grid: {
                                        fillRow: event.target.checked,
                                      },
                                    },
                                  }),
                                );
                              }}
                            />
                            <span>Fill Row</span>
                          </div>
                        )}
                      </div>
                      {/* {fieldLabel} */}
                      {/* {fieldId} */}
                    </div>
                    // <span>{fieldId}</span>
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

export default SectionGrid;
