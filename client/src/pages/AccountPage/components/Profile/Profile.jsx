import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './Profile.module.css';

export default function Profile() {

    const user = useSelector((state) => state.user);

    const [profileData, setProfileData] = useState({
        name: '',
        jobTitle: '',
        email: '',
        phoneNumber: '',
        location: '',
        summary: '',
    });

    useEffect(() => {
        if (!user) return;
        console.log('user', user);
        setProfileData({
            name: `${user.firstName} ${user.lastName}` || '',
            jobTitle: user.jobTitle || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || '',
            location: user.location || '',
            summary: user.summary || ''
        });
    }, [user]);

    const fieldGroups = Object.entries(profileData).map(([key, value]) => {
        const fieldGroupLabel = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        
        if (key === 'summary' || key === 'description') {
            return (
                <div className={styles.profileInfoFormGroup} key={key}>
                    <label className={styles.profileInfoFormLabel} style={{marginBottom: 'auto'}} htmlFor={key}>{fieldGroupLabel}:</label>
                    <textarea
                        className={styles.profileInfoFormInput}
                        id={key}
                        name={key}
                        value={value || ''}
                        onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                        style={{ padding: '1rem' }}
                    />
                </div>
            );
        }
        return (
            <div className={styles.profileInfoFormGroup} key={key}>
                <label className={styles.profileInfoFormLabel} htmlFor={key}>{fieldGroupLabel}:</label>
                <input
                    className={styles.profileInfoFormInput}
                    type={key === 'email' ? 'email' : key === 'phoneNumber' ? 'tel' : 'text'}
                    id={key}
                    name={key}
                    value={value || ''}
                    onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                />
            </div>
        )
    });

    return (
        <div className={styles.profilePageContainer}>
            <h1 className={styles.profilePageTitle}>Profile Page</h1>
            <form className={styles.profileInfoForm}>
                {fieldGroups}
            </form>
        </div>
    );
}