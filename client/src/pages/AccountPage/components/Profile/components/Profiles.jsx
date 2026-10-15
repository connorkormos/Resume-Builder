import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { formatCompactDateTime } from "@/utils/formatters";

import styles from '../Profile.module.css';

export default function Profiles() {
    const { profiles, isLoading, error } = useOutletContext();

    const profileRows = profiles.map((profile) => (
        <div className={styles.profileRowWrapper} key={profile.id}>
            <p className={styles.profileRowTitle}>{profile.title}</p>
            <div className={styles.profileRowTimeStampsWrapper}>
                <span><strong>Created:</strong> {formatCompactDateTime(profile.createdAt)}</span>
                <span><strong>Updated:</strong> {formatCompactDateTime(profile.updatedAt)}</span>
            </div>
            <Link
                className={styles.editProfileButton}
                to={`edit?profileId=${profile.id}`}
            >
                Edit
            </Link>
        </div>
    ));

    return (
        <div className={styles.profileRowsContainer}>
            <h2 className={styles.profileHeading}>Your Profiles</h2>
            <Link to="create">Create Profile</Link>
            {isLoading ? <p>Loading profiles...</p> : error ? (
                <p>Unable to load profiles.</p>
            ) : profiles.length === 0 ? (
                <p>You have not created any profiles yet.</p>
            ) : profileRows}
        </div>
    );
}
