import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { updateUser } from '@/store/userSlice';

// import styles from './Account.module.css';
import { updateUserApi } from '@/services/userServices';
import { formatDateTime } from '@/utils/formatters';

import styles from './AccountSettings.module.css';

const AccountSettings = () => {

   const dispatch = useDispatch();
   const user = useSelector(state => state.user);

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
      alert('Account updated successfully.')
   };

   return (
      <>
         <div className={styles.accountSettingsHeaderWrapper}>
            <h1>Account Settings</h1>
            {/* <p>Here you can update your account information, change your password, and manage other account settings.</p> */}
         </div>
         <form
            className={styles.accountSettingsForm}
            onSubmit={(e) => submitUserAccountSettings(e)}
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
                  value={userFormData.email}
                  placeholder='Email'
                  onChange={changeUserFormData}
               />
            </div>
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
            <span className={styles.accountTimeStampsSpan}>
               Areated on {formatDateTime(userFormData.createdAt)}
            </span>
            <span className={styles.accountTimeStampsSpan}>
               Account last updated on {formatDateTime(userFormData.updatedAt)}.
            </span>
            <button
               className={styles.accountSubmitButton}
               type='submit'
            >
               Update Account
            </button>
            {/* Future implementation: Password fields for changing password */}
         </form>
         {/* Future implementation: Form for updating account information and changing password */}
      </>
   );
};

export default AccountSettings;
