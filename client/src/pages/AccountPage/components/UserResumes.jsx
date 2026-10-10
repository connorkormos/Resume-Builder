import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOutletContext } from 'react-router-dom';

import { BASE_URL } from '@/config.js';
import { TbMenu2Filled } from "react-icons/tb";

import UserResumeRow from './UserResumeRow.jsx';

// import styles from './Account.module.css';
import { getUserResumesFromApi, getUserResumeIdsFromApi } from '@/services/userServices.js';

import styles from './UserResumes.module.css';

const UserResumes = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   const { setSideBarIsOpen } = useOutletContext();

   const user = useSelector(state => state.user);
   const navigate = useNavigate();

   const [userResumes, setUserResumes] = useState([]);
   const [userResumeIds, setUserResumeIds] = useState([]);

   const fetchUserResumes = useCallback(
      async (userId) => {
         const userData = await getUserResumesFromApi(userId);
         if (!userData) {
            return;
         }
         setUserResumes(userData.resumes);
      }, [])

   const fetchUserResumeIds = useCallback(
      async (userId) => {
         const userResumeIds = await getUserResumeIdsFromApi(userId);
         console.log(userResumeIds);
         if (!userResumeIds) {
            return;
         }
         setUserResumeIds(userResumeIds);
      }, [])

   // useEffect(() => {
   //    if (!user.id) return;
   //    fetchUserResumes(user.id);
   // }, [user.id, fetchUserResumes])
   useEffect(() => {
      if (!user.id) return;
      fetchUserResumeIds(user.id);
   }, [user.id, fetchUserResumeIds])


   const renderResumes = () => {
      if (!userResumeIds || userResumeIds.length === 0) {
         return (
            <>
               <p>You have not created any resumes yet.</p>
            </>
         );
      }

      // only map the first 10 resumes for performance reasons
      return userResumeIds.slice(0, 10).map(resumeId => (
      // return userResumeIds.map(resumeId => (
         <>
            <UserResumeRow key={resumeId} resumeId={resumeId} fetchUserResumeIds={fetchUserResumeIds} />
            {console.log('Rendering resume with ID: ', resumeId)}
            <div className={styles.userResumeRowDivider}></div>
         </>
      ));
   }

   return (
      <div className={styles.userResumesWrapper}>
         <div className={styles.accountHeaderWrapper}>
            <h1>{!isMobile && "Your "}Resumes</h1>
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
         <p>Showing {Math.min(userResumeIds.length, 10)} of {userResumeIds.length} resumes</p>
         
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