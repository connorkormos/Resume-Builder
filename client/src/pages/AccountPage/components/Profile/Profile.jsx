import React, { useEffect } from 'react';
import { formatCompactDateTime } from '@/utils/formatters';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useOutletContext, useSearchParams } from 'react-router-dom';
import { copyUserProfile, deleteUserProfile } from '@/services/profileServices';
import { Link } from 'react-router-dom';
import { getUserProfiles } from '@/services/profileServices';
import { updateUser } from '@/store/userSlice';

import styles from './Profile.module.css';

export default function Profile() {
    const accountContext = useOutletContext();
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const profiles = user.profiles ?? [];
    const selectedProfileId = searchParams.get('profileId');
    const selectedProfile = profiles.find((profile) => String(profile.id) === selectedProfileId);

    useEffect(() => {
        if (!user.id) return;
        let active = true;

        const loadProfiles = async () => {
            const data = await getUserProfiles();
            if (!active) return;
            if (data !== null) {
                dispatch(updateUser({ profiles: data }));
            }
        };

        void loadProfiles();
        return () => {
            active = false;
        };
    }, [user.id, dispatch]);

    const copyProfile = async (profileId) => {
        const copiedProfile = await copyUserProfile(profileId);
        if (copiedProfile) {
            dispatch(updateUser({ profiles: [copiedProfile, ...profiles] }));
        }
    };

    const deleteProfile = async (profileId) => {
        if (!window.confirm('Are you sure you want to delete this profile?')) return;
        const remainingProfiles = await deleteUserProfile(profileId);
        if (remainingProfiles) {
            dispatch(updateUser({ profiles: remainingProfiles }))
        }
    };

    const profileRows = profiles.map((profile) => {
        console.log(profile)
        return (
        <div className={styles.profileRowWrapper} key={profile.id}>
            <p className={styles.profileRowTitle}>{profile.title}</p>
            <div className={styles.profileRowTimeStampsWrapper}>
                <span><strong>Created:</strong> {formatCompactDateTime(profile.createdAt)}</span>
                <span><strong>Updated:</strong> {formatCompactDateTime(profile.updatedAt)}</span>
            </div>
            <div className={styles.profileRowButtonsWrapper}>
                <Link
                    className={styles.editProfileButton}
                    to={`edit?profileId=${profile.id}`}
                >
                    Edit
                </Link>
                <button
                    className={styles.editProfileButton}
                    type="button"
                    onClick={() => copyProfile(profile.id)}
                >
                    Copy
                </button>
                <button className={styles.deleteProfileButton} onClick={() => deleteProfile(profile.id)}>Delete</button>
            </div>
        </div>
    )});

    return (
        <div className={styles.profilePageContainer}>
            <h1 className={styles.profilePageTitle}>Profile Page</h1>
            {location.pathname === '/account/profile' && (
            <> 
                <div className={styles.profileRowsContainer}>
                    <h2 className={styles.profileHeading}>Your Profiles</h2>
                    {profiles.length === 0 ? (
                        <p>You have not created any profiles yet.</p>
                    ) : profileRows}
                </div>
                <Link to="create" className={styles.createNewProfileButton}>Create New Profile</Link>
            </> 
            )}
            <Outlet context={{
                ...accountContext,
                profiles,
                selectedProfile,
            }} />
        </div>
    );
}
