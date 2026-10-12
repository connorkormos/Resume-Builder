import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from "react-router-dom";

import { updateUser } from '@/store/userSlice';

// import styles from './Account.module.css';
import { updateUserApi } from '@/services/userServices';
import { formatDateTime, formatCompactDateTime } from '@/utils/formatters';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { TbMenu2Filled } from 'react-icons/tb';

import styles from './AccountSettings.module.css';

const AccountSettings = () => {
   const { setSideBarIsOpen } = useOutletContext();
   const isMobile = useMediaQuery('(max-width: 768px)');

   const dispatch = useDispatch();
   const user = useSelector(state => state.user);
   const [showConfirmPasswordModal, setShowConfirmPasswordModal] = useState(false);

   const [userFormData, setUserFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      currentPassword: '',
      createdAt: '',
      updatedAt: '',
   });

   useEffect(() => {
      if (user) {
         setUserFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            currentPassword: '',
            createdAt: user.createdAt || '',
            updatedAt: user.updatedAt || '',
         });
      }
   }, [user, setUserFormData]);

   const changeUserFormData = (e) => {
      const { name: field, value } = e.target;
      setUserFormData({ ...userFormData, [field]: value });
   };

   const updateUserAccountSettings = async () => {
      if (userFormData.firstName === user.firstName && userFormData.lastName === user.lastName && userFormData.email === user.email) {
         alert('All information is current.');
         return;
      }
      setShowConfirmPasswordModal(true)
   }

   const submitUserAccountSettings = async (e) => {
      e.preventDefault();
      if (!confirm('Are you sure you want to save all changes?')) {
         return;
      };

      const updatedUserData = await updateUserApi(user.id, userFormData);
      if (!updatedUserData) {
         return;
      }
      dispatch(updateUser(updatedUserData));
      alert('Account updated successfully.');
      setShowConfirmPasswordModal(false);
   };

   return (
      <>
         <div className={styles.accountSettingsWrapper}>
            <div className={styles.accountSettingsHeaderWrapper}>
               <h1>{isMobile ? '' : 'Account '}Settings</h1>
               {isMobile && (
                  <TbMenu2Filled
                     style={{ fontSize: '2.5rem' }}
                     onClick={() => setSideBarIsOpen(true)} />
               )}
            </div>
            <form
               className={styles.accountSettingsForm}
               onSubmit={(e) => {
                  e.preventDefault();
                  updateUserAccountSettings();
               }}
            >
               <div className={styles.accountFormGroup}>
                  <label htmlFor="firstName">
                     First Name:
                  </label>
                  <input
                     id="firstName"
                     name='firstName'
                     type='text'
                     value={userFormData.firstName}
                     placeholder='First Name'
                     onChange={changeUserFormData}
                  />
               </div>
               <div className={styles.accountFormGroup}>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                     id="lastName"
                     name='lastName'
                     type='text'
                     value={userFormData.lastName}
                     placeholder='Last Name'
                     onChange={changeUserFormData}
                  />
               </div>
               <div className={styles.accountFormGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                     id="email"
                     name='email'
                     type='email'
                     autoComplete='email'
                     value={userFormData.email}
                     placeholder='Email'
                     onChange={changeUserFormData}
                  />
               </div>
               {!isMobile && (

                  <div className={styles.accountFormGroup}>

                     <label htmlFor='currentPassword'>Current password:</label>
                     <input
                        id='currentPassword'
                        type='password'
                        name='currentPassword'
                        autoComplete='current-password'
                        value={userFormData.currentPassword}
                        onChange={changeUserFormData}
                        required={userFormData.email.trim().toLowerCase() !== user.email}
                     />
                  </div>
               )}
               <span className={styles.accountTimeStampWrapper}>
                  <span>Account Created:</span>
                  <span>
                     {isMobile
                        ? `${formatCompactDateTime(userFormData.createdAt)}`
                        : `${formatDateTime(userFormData.createdAt)}`
                     }
                  </span>
               </span>
               <span className={styles.accountTimeStampWrapper}>
                  <span>Account Updated:</span>
                  <span>
                     {isMobile
                        ? `${formatCompactDateTime(userFormData.updatedAt)}`
                        : `${formatDateTime(userFormData.updatedAt)}`
                     }
                  </span>
               </span>
               <div className={styles.accountSubmitButtonWrapper}>
                  <button
                     className={styles.accountSubmitButton}
                     type='submit'
                  >
                     Update Account
                  </button>
               </div>
            </form>
            {isMobile && showConfirmPasswordModal && (
               <div className={styles.confirmPasswordModalContainer}>
                  <form className={`${styles.confirmPasswordModal}`} onSubmit={(e) => submitUserAccountSettings(e)}>
                     <div className={styles.confirmPasswordFormGroup}>
                        <label htmlFor='currentPassword'>Confirm current password:</label>
                        <input
                           id='currentPassword'
                           type='password'
                           name='currentPassword'
                           autoComplete='current-password'
                           value={userFormData.currentPassword}
                           onChange={changeUserFormData}
                           required={userFormData.email.trim().toLowerCase() !== user.email}
                        />
                     </div>
                     <div className={styles.accountSubmitButtonWrapper}>
                        <button type='submit' className={styles.accountSubmitButton}>Submit</button>
                     </div>
                     <button className={styles.cancelConfirmPasswordButton} onClick={() => setShowConfirmPasswordModal(false)}>Cancel</button>
                  </form>
               </div>
            )}
         </div>
      </>
   );
};

export default AccountSettings;
