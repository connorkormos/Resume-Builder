import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useOutletContext, useSearchParams } from 'react-router-dom';

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

    return (
        <div className={styles.profilePageContainer}>
            <h1 className={styles.profilePageTitle}>Profile Page</h1>
            <Outlet context={{
                ...accountContext,
                profiles,
                selectedProfile,
            }} />
        </div>
    );
}
