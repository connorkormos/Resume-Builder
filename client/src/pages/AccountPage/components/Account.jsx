import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useCallback, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import AccountOutline from './AccountOutline';
import AccountSettings from './AccountSettings';
import { TbMenu2Filled } from "react-icons/tb";

import { getResumeFromApi } from '@/services/resumeServices';
import { getUserResumeIdsFromApi, logUserOutOfApi } from '@/services/userServices';
import { clearUser } from '@/store/userSlice';

import styles from './Account.module.css';

const AccountContent = ({ user }) => {

   const isMobile = useMediaQuery("(max-width: 768px)");
   const location = useLocation();

   const [resumeData, setResumeData] = useState({
      ids: null, // null means not fetched; [] means the user has no resumes.
      resumes: {},
      startIndex: 0,
      error: false,
   });
   const pendingIds = useRef(null);
   const pendingResumes = useRef(new Map());

   const fetchUserResumeIds = useCallback(async (refresh = false) => {
      if (!user.id) return;
      if (pendingIds.current) {
         if (!refresh) return pendingIds.current;
         await pendingIds.current;
      }
      pendingIds.current = (async () => {
         try {
            const ids = await getUserResumeIdsFromApi(user.id);
            if (!ids) {
               setResumeData(previous => ({ ...previous, error: true }));
               return;
            }
            setResumeData(previous => ({
               ...previous,
               ids,
               error: false,
               resumes: Object.fromEntries(
                  ids.filter(id => previous.resumes[id]).map(id => [id, previous.resumes[id]]),
               ),
               startIndex: Math.min(previous.startIndex, Math.max(0, Math.ceil(ids.length / 10) - 1) * 10),
            }));
         } finally {
            pendingIds.current = null;
         }
      })();
      return pendingIds.current;
   }, [user.id]);

   const fetchResume = useCallback(async resumeId => {
      if (resumeData.resumes[resumeId]) return;
      if (pendingResumes.current.has(resumeId)) return pendingResumes.current.get(resumeId);
      const request = (async () => {
         try {
            const resume = await getResumeFromApi(resumeId);
            if (resume) {
               setResumeData(previous => previous.ids?.includes(resumeId) ? {
                  ...previous,
                  resumes: { ...previous.resumes, [resumeId]: resume },
               } : previous);
            }
         } finally {
            pendingResumes.current.delete(resumeId);
         }
      })();
      pendingResumes.current.set(resumeId, request);
      return request;
   }, [resumeData.resumes]);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogUserOut = async () => {
      if (!confirm('Are you sure you want to log out?')) {
         return;
      }
      const userIsLoggedOut = await logUserOutOfApi();
      if (!userIsLoggedOut) {
         window.alert('Error logging user out.')
         return;
      }
      dispatch(clearUser());
      confirm('You have been logged out successfully.');
      navigate('/');
   };

   const [sideBarIsOpen, setSideBarIsOpen] = useState(true);

   return (
      <div className={styles.accountContainer}>
         <div className={`${sideBarIsOpen ? styles.accountSideBar : styles.hiddenAccountSideBar}`}>

            <div className={styles.sideBarRow}>
               <Link
                  to='/'
                  className={styles.homeButton}
               >
                  Home
               </Link>
               {(isMobile && sideBarIsOpen && location.pathname !== '/account/' && location.pathname !== '/account') &&
                  <TbMenu2Filled
                     style={{ fontSize: '2.5rem' }}
                     // className={styles.menuIcon}
                     // style={{position: 'absolute', right: 0}}
                     onClick={() => setSideBarIsOpen(!sideBarIsOpen)} />
               }
            </div>
            {/* <div className={styles.sideBarDivider}></div> */}
            <div className={styles.sideBarRow}>
               <Link
                  // className={styles.accountTabLink}
                  to='/account/my-resumes'
                  onClick={() => {
                     isMobile && setSideBarIsOpen(false)
                  }}
               >
                  {!isMobile && "View "}Resumes
               </Link>
            </div>
            {/* <div className={styles.sideBarDivider}></div> */}
            <div className={styles.sideBarRow}>
               <Link
                  // className={styles.accountTabLink}
                  to='/account/settings'
                  onClick={() => {
                     isMobile && setSideBarIsOpen(false)
                  }}
               >
                  Settings
               </Link>
            </div>
            <div className={styles.sideBarRow}>
               <Link
                  // className={styles.accountTabLink}
                  onClick={handleLogUserOut}
               >
                  Logout
               </Link>
            </div>
         </div>
         <div className={styles.accountContentWrapper}>
            {/* {(isMobile && !sideBarIsOpen) && <TbMenu2Filled className={styles.menuIcon} onClick={() => setSideBarIsOpen(!sideBarIsOpen)} />} */}
            {((isMobile && !sideBarIsOpen) || (!isMobile)) && (
               // location.pathname === '/account/settings' && <AccountSettings setSideBarIsOpen={setSideBarIsOpen} />
               <Outlet context={{
                  setSideBarIsOpen, resumeData, setResumeData, fetchUserResumeIds, fetchResume,
               }} />
            )}
         </div>
      </div>
   );
};

// Reset account state if the signed-in user changes.
const Account = () => {
   const user = useSelector(state => state.user);
   return <AccountContent key={user.id} user={user} />;
};

export default Account;