import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { setActiveEditorId, applyManualProfileMatch } from '@/store/resumeSlice';
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { getManualProfileMatchStatus } from '../helpers/manualProfileMatchHistory';

import { FaCheck } from "react-icons/fa6";

import styles from '../Toolbar.module.css';

export default function ImportProfileModal({ sessionId, unmatchedFields, replaceFieldValueText, onClose }) {

    const dispatch = useDispatch();
    const resumeHistory = useSelector(state => state.resume);
    const pendingMatchHistory = useRef(null);

    const [selectedProfileField, setSelectedProfileField] = useState(null);

    const handleManualMatchButtonClick = (profileField) => {
        pendingMatchHistory.current = { past: resumeHistory.past, future: resumeHistory.future };
        dispatch(setActiveEditorId(null));
        setSelectedProfileField(profileField);
        console.log("Selected Profile Field", profileField);
    }

    useEffect(() => {
        if (!selectedProfileField) return;

        const manuallyUpdateResumeFieldValue = () => {
            const pending = pendingMatchHistory.current;
            if (!pending) return;
            // Undo/redo can restore an active editor ID. That is not a new field click.
            if (pending.past !== resumeHistory.past || pending.future !== resumeHistory.future) {
                pendingMatchHistory.current = null;
                setSelectedProfileField(null);
                return;
            }
            const activeEditorId = resumeHistory.present.activeEditorId;
            const resumeField = resumeHistory.present.fields.byId[activeEditorId];
            if (!activeEditorId || !resumeField) return;

            pendingMatchHistory.current = null;
            const value = replaceFieldValueText(resumeField.value, selectedProfileField.value);
            dispatch(applyManualProfileMatch({ sessionId, profileFieldId: selectedProfileField.id, resumeFieldId: activeEditorId, value }));
            dispatch(setActiveEditorId(null));
            setSelectedProfileField(null);
        }
        manuallyUpdateResumeFieldValue();
    }, [resumeHistory, selectedProfileField, sessionId, replaceFieldValueText, dispatch]);

    const handleHistoryAction = (action) => {
        pendingMatchHistory.current = null;
        setSelectedProfileField(null);
        dispatch(action);
    };
    // group unmatched fields by their section labels
    const groupedFields = unmatchedFields.reduce((acc, field) => {
        const section = field.sectionLabel || 'Uncategorized';
        if (!acc[section]) acc[section] = [];
        acc[section].push(field);
        return acc;
    }, {});
    return (
        <div className={styles.unmatchedFieldsModalContainer}>
            {/* <div className={styles.modalOverlay}></div> */}
            <div className={styles.unmatchedFieldsModalContent}>
                <h2>Unmatched Profile Fields</h2>
                <p className={styles.unmatchedFieldsModalDescription}>Some profile fields could not be matched with your resume.</p>
                {Object.entries(groupedFields).map(([section, fields]) => (
                    <div key={section}>
                        <h3>{section}</h3>
                        <ul className={styles.unmatchedFieldsModalList}>
                            {fields.map((field) => {
                                const { isMatched, canUndo, canRedo } = getManualProfileMatchStatus(resumeHistory, sessionId, field.id);
                                return (
                                <li key={field.id} className={styles.unmatchedFieldsModalListItem}>
                                    <div className={styles.unmatchedFieldsModalRow}>
                                        <span>{field.label || 'Unnamed Field'}: </span>
                                        <span>{field.value || 'No Value'}</span>
                                    </div>
                                    <div className={styles.unmatchedFieldsModalRow}>
                                        {/* <button
                                            className={styles.foundMatchButton}
                                            onClick={() => handleManualMatchButtonClick(field)}
                                        >
                                            Select Field to Match
                                        </button> */}

                                        {isMatched
                                            ? canUndo
                                                ? (
                                                    <button
                                                        className={styles.undoMatchButton}
                                                        type="button"
                                                        onClick={() => handleHistoryAction(UndoActionCreators.undo())}
                                                    >
                                                        Undo
                                                    </button>
                                                ) : (
                                                    <FaCheck size={25} />
                                                ) : (
                                                <>
                                                    {canRedo && (
                                                        <button
                                                            className={styles.foundMatchButton}
                                                            type="button"
                                                            onClick={() => handleHistoryAction(UndoActionCreators.redo())}
                                                        >
                                                            Redo
                                                        </button>
                                                    )}
                                                    <button
                                                        className={styles.foundMatchButton}
                                                        type="button"
                                                        onClick={() => handleManualMatchButtonClick(field)}
                                                    >
                                                        Select Field to Match
                                                    </button>
                                                </>
                                            )}

                                    </div>
                                </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
                {/* <ul>
                    {unmatchedFields.map((field, index) => (
                        <li key={index}>
                            {field.label || 'Unnamed Field'}:
                            <span>{field.value || 'No Value'}</span>
                        </li>
                    ))}
                </ul> */}
                <button className={styles.closeModalButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
