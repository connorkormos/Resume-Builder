import React from 'react';

import styles from '../Profile.module.css';

export default function ProfileSection({section}) {

    if (!section) {
        return null;
    }

    return (
        <div className={styles.profileSectionWrapper}>
            <h2>{section.label}</h2>
            {section.subsections.map((subsection) => {
                return (
                    <div key={subsection.id} className={styles.profileSubsectionWrapper}>
                        {subsection.fields.map((field) => (
                            <div key={field.id} className={styles.profileFieldWrapper}>
                                <label className={styles.profileFormLabel}>{field.label}:</label>
                                <input className={styles.profileFormInput} type="text" value={field.value || ''} readOnly />
                            </div>
                        ))}
                        {/* Render subsection content here */}
                    </div>
                );
            })}

        </div>
    );
}