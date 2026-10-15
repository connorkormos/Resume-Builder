import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import styles from '../Profile.module.css';
import ProfileSection from './ProfileSection';

export default function EditProfile() {
    const { selectedProfile: profile, isLoading, error } = useOutletContext();
    
    console.log("PROFILE:", profile);
    const profileSections = profile?.sections?.map((section) => (
        <ProfileSection key={section.id} section={section} />
    ));
    
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
                        value={profile.title || ''}
                        onChange={() => {}}
                    />
                </div>
                <button className={styles.addSectionButton}>+ Add New Section</button>
                {profile?.sections?.length > 0 ? profileSections : <p>No sections available.</p>}
            </form>
            {/* ) : ( */}
                {/* <p>Select a profile from your profiles list to edit.</p> */}
            {/* )} */}
            <Link to="..">Back to Profiles</Link>
        </div>
    );
}
