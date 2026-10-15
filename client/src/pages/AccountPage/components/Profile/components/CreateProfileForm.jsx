import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

import { updateUser } from '@/store/userSlice';
import { createUserProfile } from '@/services/profileServices';

import styles from '../Profile.module.css';

export default function CreateProfileForm() {
    const { profiles, isLoading } = useOutletContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileData, setProfileData] = useState({
        title: '',
    });

    const submitCreateProfile = async (e) => {
        e.preventDefault();
        if (isLoading || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const createdProfile = await createUserProfile(profileData.title);
            if (!createdProfile) return;
            dispatch(updateUser({ profiles: [createdProfile, ...profiles] }));
            navigate(`../edit?profileId=${createdProfile.id}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.createProfileFormContainer}>
            <h2 className={styles.profileHeading}>Create {profiles.length > 0 ? 'a' : 'your first'} profile below.</h2>
            <form className={styles.createProfileForm} onSubmit={submitCreateProfile}>
                <div className={styles.createProfileFormGroup}>
                    <label className={styles.profileFormLabel} htmlFor="title">Profile Title:</label>
                    <input
                        className={styles.profileFormInput}
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={profileData.title || ''}
                        onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                    />
                </div>
                <button type="submit" className={styles.profileFormSubmitButton} disabled={isLoading || isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Profile'}
                </button>
            </form>
            <Link to="..">Back to Profiles</Link>
        </div>
    );
}
