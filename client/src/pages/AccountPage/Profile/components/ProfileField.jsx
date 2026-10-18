import React, { useState } from 'react';

import styles from '../Profile.module.css';

export default function ProfileField({ field, fieldChanges = {}, onFieldChange, onFieldLinkChange }) {

    const changes = fieldChanges[field.id] ?? {};
    const fieldLink = Object.hasOwn(changes, 'link') ? changes.link ?? '' : field.link ?? '';
    const [isLinkInputOpen, setIsLinkInputOpen] = useState(Boolean(field.link));

    const isMultiline = ['summary', 'description'].includes((field.label ?? '').trim().toLowerCase());
    console.log('FIELD LINK: ', fieldLink)

    return (
        <div key={field.id} className={styles.profileFieldWrapper}>
            <div className={styles.profileFieldHeaderWrapper}>
                <label className={styles.profileFormLabel} style={{ marginBottom: isMultiline ? 'auto' : undefined }} htmlFor={`profile-field-${field.id}`}>{field.label}:</label>

                {isLinkInputOpen || fieldLink ? (
                    <div className={styles.profileFieldLinkWrapper}>
                    <input
                        id={`profile-field-link-${field.id}`}
                        className={styles.profileFormInput}
                        value={fieldLink}
                        aria-label={`Link for ${field.label}`}
                        placeholder="Link URL"
                        style={{ overflowX: 'hidden'}}
                        // rows={1}
                        // style={{ padding: isMultiline ? '0.5rem' : undefined, resize: 'none' }}
                        onChange={(event) => onFieldLinkChange(field, event.target.value)}
                        readOnly={!onFieldLinkChange}
                    />
                    <button className={styles.removeLinkButton} type="button" disabled={!onFieldLinkChange} onClick={() => {
                        onFieldLinkChange(field, '');
                        setIsLinkInputOpen(false);
                    }}>Remove Link</button>
                    </div>
                )
                    : (
                        <button className={styles.addLinkButton} type="button" disabled={!onFieldLinkChange} onClick={() => setIsLinkInputOpen(true)}>+ Link</button>
                    )}
            </div>
            <textarea
                id={`profile-field-${field.id}`}
                className={styles.profileFormInput}
                // {...(isMultiline ? { rows: '10' } : { type: 'text' })}
                value={changes.value ?? field.value ?? ''}
                style={{ padding: isMultiline ? '0.5rem' : undefined, resize: 'none' }}
                onChange={(event) => onFieldChange(field, event.target.value)}
                readOnly={!onFieldChange}
            />
        </div>
    );
}
