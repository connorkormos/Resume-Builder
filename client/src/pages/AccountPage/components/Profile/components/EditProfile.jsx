import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { getAvailableProfileSectionsFromApi, addProfileSectionToApi, getUserProfile } from '@/services/profileServices';

import ProfileSection from './ProfileSection';

import styles from '../Profile.module.css';

export default function EditProfile() {
    const { selectedProfile, isLoading, error } = useOutletContext();

    const [profile, setProfile] = useState(selectedProfile);

    const [profileFormData, setProfileFormData] = useState({
        title: profile?.title || '',
    });

    const [availableSections, setAvailableSections] = useState([]);

    useEffect(() => {
        if (!profile?.id) return;
        const fetchAvailableSections = async () => {
            const availableSections = await getAvailableProfileSectionsFromApi(profile.id);
            console.log("Available Sections:", availableSections);
            setAvailableSections(availableSections);
        };
        fetchAvailableSections();
    }, [profile]);


    const addProfileSection = async (sectionType) => {
        const response = await addProfileSectionToApi(profile.id, sectionType);
        if (response) {
            const updatedProfile = await getUserProfile(profile.id);
            setProfile(updatedProfile);
            // setAvailableSections(availableSections.filter(section => !updatedProfile.sections.some(s => s.type === section.type)));
        }
    };

    const renderAvailableSections = () => {
        if (!availableSections || Object.keys(availableSections).length === 0) return null;
        // return null;
        return (
            <div className={styles.availableSectionsWrapper}>
                {/* <h3>Available Sections</h3> */}
                {availableSections.map((section) => (
                    // <div className={styles.availableSectionRow}>
                    //     <p key={section.id}>{section.label}</p>
                    <button className={styles.addSectionButton} type="button" onClick={() => addProfileSection(section.type)}>+ Add {section.label} Section</button>
                    // </div>
                ))}
            </div>
        );
    };

    if (!profile) {
        return <p>Select a profile from your profiles list to edit.</p>;
    }

    return (
        <div className={styles.editProfileContainer}>
            <h2 className={styles.profileHeading}>Edit Profile</h2>
            {/* {isLoading ? <p>Loading profile...</p> : error ? ( */}
            {/* <p>Unable to load profiles.</p> */}
            {/* ) : profile ? ( */}
            <form className={styles.editProfileForm}>
                <div className={styles.editProfileFormGroup}>
                    <label className={styles.profileFormLabel} htmlFor="title">Profile Title:</label>
                    <input
                        className={styles.profileFormInput}
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={profileFormData.title || profile.title || ''}
                        onChange={(e) => setProfileFormData({...profileFormData, title: e.target.value})}
                    />
                </div>
                {profile?.sections?.length > 0 && (
                    <div className={styles.profileSectionsWrapper}>
                        {profile.sections.map((section) => (
                            <ProfileSection key={section.id} section={section} />
                        ))}
                    </div>
                )}
                <button type="submit">Save Changes</button>


                {/* {profile?.sections?.length > 0 ? profileSections : <p>No sections available.</p>} */}
                {renderAvailableSections()}
            </form>
            {/* ) : ( */}
            {/* <p>Select a profile from your profiles list to edit.</p> */}
            {/* )} */}
            <Link to="..">Back to Profiles</Link>
        </div>
    );
}
