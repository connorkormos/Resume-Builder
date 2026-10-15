import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';

import { getAvailableProfileSectionsFromApi, addProfileSectionToApi, updateProfileFieldsInApi } from '@/services/profileServices';
import { updateProfile } from '@/store/userSlice';

import ProfileSection from './ProfileSection';
import styles from '../Profile.module.css';

export default function EditProfile() {
    const { selectedProfile, isLoading, error } = useOutletContext();

    if (isLoading) return <p>Loading profile…</p>;
    if (error) return <p role="alert">Unable to load profiles.</p>;
    if (!selectedProfile) return <p>Select a profile from your profiles list to edit.</p>;

    return <ProfileEditor key={selectedProfile.id} initialProfile={selectedProfile} />;
}

function ProfileEditor({ initialProfile }) {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(initialProfile);
    const [fieldChanges, setFieldChanges] = useState({});
    const [availableSections, setAvailableSections] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [saveError, setSaveError] = useState('');
    const isBusy = isSaving || isAddingSection;
    const hasChanges = Object.keys(fieldChanges).length > 0;

    useEffect(() => {
        let active = true;
        const fetchAvailableSections = async () => {
            const sections = await getAvailableProfileSectionsFromApi(profile.id);
            if (active) setAvailableSections(sections ?? []);
        };
        void fetchAvailableSections();
        return () => { active = false; };
    }, [profile.id]);

    const changeField = (field, value) => {
        setFieldChanges((current) => {
            const next = { ...current };
            if (value === (field.value ?? '')) {
                delete next[field.id];
            } else {
                next[field.id] = value;
            }
            return next;
        });
        setSaveMessage('');
        setSaveError('');
    };

    const saveChanges = async (event) => {
        event.preventDefault();
        if (isBusy || !hasChanges) return;
        setIsSaving(true);
        setSaveMessage('');
        setSaveError('');
        try {
            const fields = Object.entries(fieldChanges).map(([id, value]) => ({ id: Number(id), value }));
            const response = await updateProfileFieldsInApi(profile.id, fields);
            if (!response) {
                setSaveError('Unable to save changes. Your edits are still here; please try again.');
                return;
            }
            const savedFields = new Map(response.fields.map((field) => [field.id, field]));
            const updatedProfile = {
                ...profile,
                sections: (profile.sections ?? []).map((section) => ({
                    ...section,
                    subsections: (section.subsections ?? []).map((subsection) => ({
                        ...subsection,
                        fields: (subsection.fields ?? []).map((field) => savedFields.get(field.id) ?? field),
                    })),
                })),
            };
            setProfile(updatedProfile);
            dispatch(updateProfile(updatedProfile));
            setFieldChanges({});
            setSaveMessage('Changes saved.');
        } finally {
            setIsSaving(false);
        }
    };

    const addProfileSection = async (sectionType) => {
        if (isBusy) return;
        setIsAddingSection(true);
        try {
            const section = await addProfileSectionToApi(profile.id, sectionType);
            if (!section) return;
            const updatedProfile = { ...profile, sections: [...(profile.sections ?? []), section] };
            setProfile(updatedProfile);
            dispatch(updateProfile(updatedProfile));
            setAvailableSections((current) => current.filter((item) => item.type !== section.type));
        } finally {
            setIsAddingSection(false);
        }
    };

    return (
        <div className={styles.editProfileContainer}>
            <h2 className={styles.profileHeading}>Edit Profile</h2>
            <form className={styles.editProfileForm} onSubmit={saveChanges} aria-busy={isBusy}>
                <div className={styles.editProfileFormGroup}>
                    <label className={styles.profileFormLabel} htmlFor="profile-title">Profile Title:</label>
                    <input className={styles.profileFormInput} type="text" id="profile-title" value={profile.title ?? ''} readOnly />
                </div>
                <div className={styles.profileSectionsWrapper}>
                    {(profile.sections ?? []).map((section) => (
                        <ProfileSection
                            key={section.id}
                            section={section}
                            fieldChanges={fieldChanges}
                            onFieldChange={changeField}
                            disabled={isBusy}
                        />
                    ))}
                </div>
                <button type="submit" disabled={isBusy || !hasChanges}>
                    {isSaving ? 'Saving…' : 'Save Changes'}
                </button>
                {saveMessage && <p role="status">{saveMessage}</p>}
                {saveError && <p role="alert">{saveError}</p>}
                {availableSections.length > 0 && (
                    <div className={styles.availableSectionsWrapper}>
                        {availableSections.map((section) => (
                            <button key={section.type} className={styles.addSectionButton} type="button" disabled={isBusy} onClick={() => addProfileSection(section.type)}>
                                + Add {section.label} Section
                            </button>
                        ))}
                    </div>
                )}
            </form>
            <Link to="..">Back to Profiles</Link>
        </div>
    );
}
