import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOutletContext } from 'react-router-dom';

import { BASE_URL } from '@/config.js';
import { TbMenu2Filled } from "react-icons/tb";

import UserResumeRow from './UserResumeRow.jsx';

// import styles from './Account.module.css';
import { getUserResumesFromApi } from '@/services/userServices.js';

import styles from './UserResumes.module.css';

const UserResumes = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   const { setSideBarIsOpen } = useOutletContext();

   const user = useSelector(state => state.user);
   const navigate = useNavigate();

   const [userResumes, setUserResumes] = useState([]);

   const fetchUserResumes = useCallback(
      async (userId) => {
         const userData = await getUserResumesFromApi(userId);
         if (!userData) {
            return;
         }
         setUserResumes(userData.resumes);
      }, [])

   useEffect(() => {
      if (!user.id) return;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchUserResumes(user.id);
   }, [user.id])


   const renderResumes = () => {
      if (!userResumes || userResumes.length === 0) {
         return (
            <>
               <p>You have not created any resumes yet.</p>
            </>
         );
      }

      return userResumes.map(resume => (
         <>
            <UserResumeRow key={resume.id} resume={resume} fetchUserResumes={fetchUserResumes} />
            <div className={styles.userResumeRowDivider}></div>
         </>
      ));
   }

   return (
      <div className={styles.userResumesWrapper}>
         <div className={styles.accountHeaderWrapper}>
            <h1>Your Resumes</h1>
            {isMobile && (
               <TbMenu2Filled
                  style={{ fontSize: '2.5rem' }}
                  // className={styles.menuIcon}
                  // style={{position: 'absolute', right: 0}}
                  onClick={() => setSideBarIsOpen(true)} />
            )}
         </div>
         <div className={styles.userResumeRowsWrapper}>
            {renderResumes()}
         </div>
         <button
            className={styles.accountSubmitButton}
            onClick={() => navigate('/editor/new')}
         >
            Create New Resume
         </button>
      </div>
   );
};

export default UserResumes;