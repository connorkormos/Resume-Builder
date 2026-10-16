import React from 'react';

import styles from '../Profile.module.css';

export default function ProfileSection({ section, fieldChanges = {}, onFieldChange, disabled = false, onAddSubsection, isAddingSubsection = false, subsectionError = '', onDeleteSection, onDeleteSubsection, deletingItem }) {

    if (!section) {
        return null;
    }

    return (
        <div className={styles.profileSectionWrapper}>
            <div className={styles.profileSectionHeader}>
                <h2>{section.label}</h2>
                <button className={styles.deleteSectionButton} type="button" disabled={disabled} onClick={() => onDeleteSection(section.id)}>
                    {deletingItem?.type === 'section' && deletingItem.id === section.id ? 'Deleting…' : 'Delete Section'}
                </button>
            </div>
            {(section.subsections ?? []).map((subsection, index) => {
                return (
                    <div key={subsection.id} className={styles.profileSubsectionWrapper}>
                        <div className={styles.profileSubsectionHeader}>
                            <h2>Subsection {index + 1}</h2>
                            <button className={styles.deleteSubsectionButton} type="button" disabled={disabled} onClick={() => onDeleteSubsection(section.id, subsection.id, index + 1)}>
                                {deletingItem?.type === 'subsection' && deletingItem.id === subsection.id ? 'Deleting…' : 'Delete Subsection'}
                            </button>
                        </div>
                        {(subsection.fields ?? []).map((field) => {
                            const isMultiline = ['summary', 'description'].includes((field.label ?? '').trim().toLowerCase());
                            const FieldInput = isMultiline ? 'textarea' : 'input';
                            return (
                            <div key={field.id} className={styles.profileFieldWrapper}>
                                <label className={styles.profileFormLabel} style={{ marginBottom: isMultiline ? 'auto' : undefined}} htmlFor={`profile-field-${field.id}`}>{field.label}:</label>
                                <FieldInput
                                    id={`profile-field-${field.id}`}
                                    className={styles.profileFormInput}
                                    {...(isMultiline ? { rows: 4 } : { type: 'text' })}
                                    value={fieldChanges[field.id] ?? field.value ?? ''}
                                    style={{ padding: isMultiline ? '0.5rem' : undefined }}
                                    onChange={(event) => onFieldChange(field, event.target.value)}
                                    readOnly={!onFieldChange}
                                    disabled={disabled}
                                />
                            </div>
                            );
                        })}
                        {/* Render subsection content here */}
                    </div>
                );
            })}
            {onAddSubsection && (
                <button
                    className={styles.addSubsectionButton}
                    type="button"
                    disabled={disabled}
                    onClick={() => onAddSubsection(section.id)}
                >
                    {isAddingSubsection ? 'Adding…' : '+ Add Subsection'}
                </button>
            )}
            {subsectionError && <p role="alert">{subsectionError}</p>}

        </div>
    );
}
