import React from 'react';

import styles from '../Profile.module.css';

export default function ProfileSection({ section, fieldChanges = {}, onFieldChange, disabled = false }) {

    if (!section) {
        return null;
    }

    return (
        <div className={styles.profileSectionWrapper}>
            <h2>{section.label}</h2>
            {(section.subsections ?? []).map((subsection) => {
                return (
                    <div key={subsection.id} className={styles.profileSubsectionWrapper}>
                        {(subsection.fields ?? []).map((field) => (
                            <div key={field.id} className={styles.profileFieldWrapper}>
                                <label className={styles.profileFormLabel} htmlFor={`profile-field-${field.id}`}>{field.label}:</label>
                                <input
                                    id={`profile-field-${field.id}`}
                                    className={styles.profileFormInput}
                                    type="text"
                                    value={fieldChanges[field.id] ?? field.value ?? ''}
                                    onChange={(event) => onFieldChange(field, event.target.value)}
                                    readOnly={!onFieldChange}
                                    disabled={disabled}
                                />
                            </div>
                        ))}
                        {/* Render subsection content here */}
                    </div>
                );
            })}

        </div>
    );
}
