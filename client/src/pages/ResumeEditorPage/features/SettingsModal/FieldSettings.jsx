import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFieldFromApi } from "@/services/resumeServices.js";
import { deleteField, updateField } from "@/store/resumeSlice.js";
import { getTrimmedNodeString } from "@/features/Slate/helpers/getNodeString";

import styles from "./SettingsModal.module.css";

export default function FieldSettings({ fieldId, index, gridColumnsInput }) {
    if (!fieldId) return null;

    const dispatch = useDispatch();
    const reduxFieldsById = useSelector((state) => state.resume.present.fields.byId);
    const field = reduxFieldsById[fieldId];
    const subsection = useSelector((state) => state.resume.present.subsections.byId[field.subsectionId]);

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

    let fieldString = getTrimmedNodeString(field);
    // if (fieldString.length > 20) fieldString = fieldString.slice(0, 15) + "...";
    // else if (!fieldString.length) fieldString = `Field ${index + 1} (Empty)`;


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
            <p className={styles.fieldText}>{fieldString}</p>
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
    );

}