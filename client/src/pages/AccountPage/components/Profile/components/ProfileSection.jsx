import React from 'react';

import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { useMediaQuery } from '@/hooks/useMediaQuery';

import styles from '../Profile.module.css';

export default function ProfileSection({ section, fieldChanges = {}, onFieldChange, onAddSubsection, onDeleteSection, onDeleteSubsection, openSections, setOpenSections }) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (!section) {
        return null;
    }

    return (
        <div className={styles.profileSectionWrapper}>
            <div className={styles.profileSectionHeader}>
                <h2 className={styles.profileSectionTitle}>{section.label}</h2>
                <span className={styles.toggleSectionButton} type="button" onClick={() => {
                    if (openSections.includes(section.id)) {
                        setOpenSections(openSections.filter(id => id !== section.id));
                    } else {
                        setOpenSections([section.id]);
                    }
                }}>
                    <MdExpandMore className={styles.toggleShowSectionButton} />
                    {/* {openSections.includes(section.id) ? 'Collapse' : 'Expand'} */}
                </span>
                <button className={styles.deleteSectionButton} type="button" onClick={() => onDeleteSection(section.id)}>
                    Delete {!isMobile && 'Section'}
                </button>
            </div>
            {openSections.includes(section.id) && (section.subsections ?? []).map((subsection, index) => {
                return (
                    <div key={subsection.id} className={styles.profileSubsectionWrapper}>
                        <div className={styles.profileSubsectionHeader}>
                            <h2>Subsection {index + 1}</h2>
                            {/* <button className={styles.deleteSubsectionButton} type="button" onClick={() => onDeleteSubsection(section.id, subsection.id, index + 1)}>
                                Delete Subsection
                            </button> */}
                        </div>
                        {(subsection.fields ?? []).map((field) => {
                            const isMultiline = ['summary', 'description'].includes((field.label ?? '').trim().toLowerCase());
                            const FieldInput = isMultiline ? 'textarea' : 'input';
                            return (
                                <div key={field.id} className={styles.profileFieldWrapper}>
                                    <label className={styles.profileFormLabel} style={{ marginBottom: isMultiline ? 'auto' : undefined }} htmlFor={`profile-field-${field.id}`}>{field.label}:</label>
                                    <FieldInput
                                        id={`profile-field-${field.id}`}
                                        className={styles.profileFormInput}
                                        {...(isMultiline ? { rows: '10' } : { type: 'text' })}
                                        value={fieldChanges[field.id] ?? field.value ?? ''}
                                        style={{ padding: isMultiline ? '0.5rem' : undefined }}
                                        onChange={(event) => onFieldChange(field, event.target.value)}
                                        readOnly={!onFieldChange}
                                    />
                                </div>
                            );
                        })}
                        {/* Render subsection content here */}
                    </div>
                );
            })}
            {openSections.includes(section.id) && (
                <>
                    <div className={styles.subsectionButtonsWrapper}>
                        <button
                            className={styles.addSubsectionButton}
                            type="button"
                            onClick={() => onAddSubsection(section.id)}
                        >
                            + Add {!isMobile && 'Subsection'}
                        </button>
                        <button className={styles.deleteSubsectionButton} type="button" onClick={() => onDeleteSubsection(section.id, subsection.id, index + 1)}>
                            Delete {!isMobile && 'Subsection'}
                        </button>
                    </div>
                </>
            )}

        </div>
    );
}
