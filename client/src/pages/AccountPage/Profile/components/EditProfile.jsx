import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useOutletContext } from 'react-router-dom';

import { getAvailableProfileSectionsFromApi, addProfileSectionToApi, addProfileSubsectionToApi, deleteProfileSectionFromApi, deleteProfileSubsectionFromApi, updateProfileFieldsInApi } from '@/services/profileServices';
import { updateProfile } from '@/store/userSlice';

import ProfileSection from './ProfileSection';
import styles from '../Profile.module.css';

export default function EditProfile() {
    const { selectedProfile } = useOutletContext();

    if (!selectedProfile) return <p>Select a profile from your profiles list to edit.</p>;

    return <ProfileEditor key={selectedProfile.id} initialProfile={selectedProfile} />;
}

function ProfileEditor({ initialProfile }) {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(initialProfile);
    const [title, setTitle] = useState(initialProfile.title ?? '');
    const [fieldChanges, setFieldChanges] = useState({});
    const [availableSections, setAvailableSections] = useState([]);
    const titleChanged = title !== (profile.title ?? '');
    const hasChanges = titleChanged || Object.keys(fieldChanges).length > 0;

    useEffect(() => {
        let active = true;
        const fetchAvailableSections = async () => {
            const sections = await getAvailableProfileSectionsFromApi(profile.id);
            if (active) setAvailableSections(sections ?? []);
        };
        void fetchAvailableSections();
        return () => { active = false; };
    }, [profile.id]);

    const changeField = (field, value, property = 'value') => {
        const nextValue = property === 'link' && !value.trim() ? null : value;
        const originalValue = property === 'link' ? field.link || null : field.value ?? '';
        setFieldChanges((current) => {
            const next = { ...current };
            const changes = { ...current[field.id] };
            if (nextValue === originalValue) {
                delete changes[property];
            } else {
                changes[property] = nextValue;
            }
            if (Object.keys(changes).length > 0) next[field.id] = changes;
            else delete next[field.id];
            return next;
        });
    };

    const saveChanges = async (event) => {
        event.preventDefault();
        if (!hasChanges) {
            window.alert('No changes to save.');
            return;
        };
        if (titleChanged && !title.trim()) return;
        const originalFields = new Map(profile.sections
            .flatMap((section) => section.subsections)
            .flatMap((subsection) => subsection.fields)
            .map((field) => [field.id, field]));
        const fields = Object.entries(fieldChanges).map(([id, changes]) => ({
            id: Number(id),
            // The endpoint requires a value even when only the link changed.
            value: changes.value ?? originalFields.get(Number(id))?.value ?? '',
            ...(Object.hasOwn(changes, 'link') ? { link: changes.link } : {}),
        }));
        const response = await updateProfileFieldsInApi(profile.id, fields, titleChanged ? title : undefined);
        if (!response) return;
        const savedFields = new Map(response.fields.map((field) => [field.id, field]));
        const updatedProfile = {
            ...profile,
            title: response.title ?? profile.title,
            sections: (profile.sections ?? []).map((section) => ({
                ...section,
                subsections: (section.subsections ?? []).map((subsection) => ({
                    ...subsection,
                    fields: (subsection.fields ?? []).map((field) => savedFields.get(field.id) ?? field),
                })),
            })),
        };
        setProfile(updatedProfile);
        setTitle(updatedProfile.title ?? '');
        dispatch(updateProfile(updatedProfile));
        setFieldChanges({});
        window.alert('Changes saved successfully.');
    };

    const addProfileSection = async (sectionType) => {
        const section = await addProfileSectionToApi(profile.id, sectionType);
        if (!section) return;
        const updatedProfile = { ...profile, sections: [...(profile.sections ?? []), section] };
        setProfile(updatedProfile);
        dispatch(updateProfile(updatedProfile));
        setAvailableSections((current) => current.filter((item) => item.type !== section.type));
    };

    const addProfileSubsection = async (sectionId) => {
        const subsection = await addProfileSubsectionToApi(sectionId);
        if (!subsection) return;
        const updatedProfile = {
            ...profile,
            sections: profile.sections.map((section) => section.id === sectionId ? {
                ...section,
                subsections: [...(section.subsections ?? []), subsection]
                    .sort((a, b) => a.position - b.position || a.id - b.id),
            } : section),
        };
        setProfile(updatedProfile);
        dispatch(updateProfile(updatedProfile));
    };

    const removeFieldChanges = (fieldIds) => {
        setFieldChanges((current) => {
            const next = { ...current };
            for (const id of fieldIds) delete next[id];
            return next;
        });
    };

    const deleteProfileSubsection = async (sectionId, subsectionId, number) => {
        const section = profile.sections.find((item) => item.id === sectionId);
        const subsection = section?.subsections?.find((item) => item.id === subsectionId);
        if (!subsection || !window.confirm(`Delete subsection ${number} from ${section.label}? Its fields will also be deleted.`)) return;

        if (!await deleteProfileSubsectionFromApi(sectionId, subsectionId)) return;
        const updatedProfile = {
            ...profile,
            sections: profile.sections.map((item) => item.id === sectionId ? {
                ...item,
                subsections: item.subsections.filter((child) => child.id !== subsectionId),
            } : item),
        };
        removeFieldChanges(subsection.fields.map((field) => field.id));
        setProfile(updatedProfile);
        dispatch(updateProfile(updatedProfile));
    };

    const deleteProfileSection = async (sectionId) => {
        const section = profile.sections.find((item) => item.id === sectionId);
        if (!section || !window.confirm(`Delete the ${section.label} section? Its subsections and fields will also be deleted.`)) return;

        if (!await deleteProfileSectionFromApi(sectionId)) return;
        const updatedProfile = {
            ...profile,
            sections: profile.sections.filter((item) => item.id !== sectionId),
        };
        removeFieldChanges(section.subsections.flatMap((subsection) => subsection.fields.map((field) => field.id)));
        setProfile(updatedProfile);
        dispatch(updateProfile(updatedProfile));
        setAvailableSections((current) => current.some((item) => item.type === section.type)
            ? current : [...current, { type: section.type, label: section.label }]);
    };

    const [openSections, setOpenSections] = useState([]);

    return (
        <div className={styles.editProfileContainer}>
            <h2 className={styles.profileHeading}>Edit Profile</h2>
            <form className={styles.editProfileForm} onSubmit={saveChanges}>
                <div className={styles.editProfileFormGroup}>
                    <label className={styles.profileFormLabel} htmlFor="profile-title"><h2>Profile Title:</h2></label>
                    <input
                        className={styles.profileFormInput}
                        type="text"
                        id="profile-title"
                        value={title}
                        required
                        pattern=".*\S.*"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className={styles.profileSectionsWrapper}>
                    {(profile.sections ?? []).map((section) => (
                        <ProfileSection
                            key={section.id}
                            section={section}
                            fieldChanges={fieldChanges}
                            onFieldChange={changeField}
                            onFieldLinkChange={(field, link) => changeField(field, link, 'link')}
                            onAddSubsection={addProfileSubsection}
                            onDeleteSection={deleteProfileSection}
                            onDeleteSubsection={deleteProfileSubsection}
                            openSections={openSections}
                            setOpenSections={setOpenSections}
                        />
                    ))}
                </div>
                <button className={styles.saveChangesButton} type="submit">
                    Save Changes
                </button>
                {availableSections.length > 0 && (
                    <div className={styles.availableSectionsWrapper}>
                        {availableSections.map((section) => (
                            <button key={section.type} className={styles.addSectionButton} type="button" onClick={() => addProfileSection(section.type)}>
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
