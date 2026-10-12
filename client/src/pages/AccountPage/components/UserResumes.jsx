import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOutletContext } from 'react-router-dom';

import { TbMenu2Filled } from "react-icons/tb";

import UserResumeRow from './UserResumeRow.jsx';


import styles from './UserResumes.module.css';

const UserResumes = () => {
   const isMobile = useMediaQuery("(max-width: 768px)");
   const { setSideBarIsOpen, resumeData, setResumeData, fetchUserResumeIds, fetchResume } = useOutletContext();
   const navigate = useNavigate();
   const { ids, resumes, startIndex, error } = resumeData;
   const userResumeIds = ids ?? [];
   const setStartIndex = startIndex => setResumeData(previous => ({ ...previous, startIndex }));

   useEffect(() => {
      if (ids === null) void fetchUserResumeIds();
   }, [ids, fetchUserResumeIds]);

   const currentPage = Math.floor(startIndex / 10);
   const endIndex = startIndex + 10;
   const pageCount = Math.ceil(userResumeIds.length / 10);
   const renderResumes = () => {
      if (ids === null) {
         return <p>{error ? 'Unable to load resumes.' : 'Loading resumes...'}</p>;
      }
      if (userResumeIds.length === 0) {
         return (
            <>
               <p>You have not created any resumes yet.</p>
            </>
         );
      }

      // only map the first 10 resumes for performance reasons
      return userResumeIds.slice(startIndex, endIndex).map(resumeId => (
         // return userResumeIds.map(resumeId => (
         <React.Fragment key={resumeId}>
            <UserResumeRow resumeId={resumeId} resume={resumes[resumeId]} fetchResume={fetchResume} fetchUserResumeIds={fetchUserResumeIds} />
            <div className={styles.userResumeRowDivider}></div>
         </React.Fragment>
      ));
   }

   // Slot limits include ellipses. Use whole numbers; values below 5 become 5.
   const mobilePageSlots = 7;
   const desktopPageSlots = 11;
   const maxPageSlots = Math.max(5, isMobile ? mobilePageSlots : desktopPageSlots);
   const edgePageCount = maxPageSlots - 2;
   const middlePageCount = maxPageSlots - 4;
   const middleStart = currentPage - Math.floor((middlePageCount - 1) / 2);
   const middleEnd = middleStart + middlePageCount - 1;

   let paginationItems;
   if (pageCount <= maxPageSlots) {
      paginationItems = Array.from({ length: pageCount }, (_, i) => i);
   } else if (middleStart <= 2) {
      paginationItems = [...Array.from({ length: edgePageCount }, (_, i) => i), 'end-ellipsis', pageCount - 1];
   } else if (middleEnd >= pageCount - 3) {
      paginationItems = [0, 'start-ellipsis', ...Array.from({ length: edgePageCount }, (_, i) => pageCount - edgePageCount + i)];
   } else {
      paginationItems = [0, 'start-ellipsis', ...Array.from({ length: middlePageCount }, (_, i) => middleStart + i), 'end-ellipsis', pageCount - 1];
   }

   const pageNumbers = paginationItems.map(item => {
      if (typeof item === 'string') {
         return <span key={item} className={styles.pageNumberButton}>...</span>;
      }
      return (
         <button
            key={item}
            className={`${styles.pageNumberButton} ${item === currentPage ? styles.active : styles.inactive}`}
            onClick={() => setStartIndex(item * 10)}
         >
            {item + 1}
         </button>
      );
   });
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
         <div className={styles.footer}>
            <div className={styles.paginationWrapper}>
               <p>Showing {userResumeIds.length ? startIndex + 1 : 0} - {Math.min(endIndex, userResumeIds.length)} of {userResumeIds.length} resumes</p>
               <div className={styles.paginationButtonsWrapper}>
                  {pageNumbers}


                  {/* {Array.from({ length: pageCount }, (_, i) => {
                     
                     return (
                        <button
                           key={i}
                           className={styles.paginationButton}
                           onClick={() => setStartIndex(i * 10)}
                        >
                           {i + 1}
                        </button>
                     );
                  })} */}
               </div>
               <div className={styles.paginationButtonsWrapper}>
                  {startIndex > 0 && (
                     <button
                        className={styles.paginationButton}
                        onClick={() => setStartIndex(Math.max(startIndex - 10, 0))}
                     >
                        Previous
                     </button>
                  )}
                  {endIndex < userResumeIds.length && (
                     <button
                        className={styles.paginationButton}
                        onClick={() => setStartIndex(startIndex + 10)}
                        style={{ marginLeft: 'auto' }}
                     >
                        Next
                     </button>
                  )}
               </div>
            </div>
            <div className={styles.accountSubmitButtonWrapper}>
               <button
                  className={styles.accountSubmitButton}
                  onClick={() => navigate('/editor/new')}
               >
                  Create New Resume
               </button>
            </div>
         </div>
      </div>
   );
};

export default UserResumes;
