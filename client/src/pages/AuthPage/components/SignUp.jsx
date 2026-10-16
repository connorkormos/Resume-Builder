import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/store/userSlice';

import styles from './Auth.module.css';
import { addUserToApi } from '@/services/userServices';

const SignUp = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [newUser, setNewUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
   });

   const [showPassword, setShowPassword] = useState(false);

   const changeNewUser = (e) => {
      const { name, value } = e.target;
      setNewUser((prevUser) => ({
         ...prevUser,
         [name]: value
      }));
   };

   const createUser = async (e) => {
      e.preventDefault();
      const newUserData = await addUserToApi(newUser);
      if (!newUserData) {
         return;
      }

      dispatch(setUser(newUserData));
      navigate('/account');
   }

   const authInputs = ['First Name', 'Last Name', 'Email', 'Password'].map((input) => {
      let inputName = input.charAt(0).toLowerCase() + input.split(' ').join('').slice(1);
      return (
         <div className={styles.authFormGroup} key={input}>
            {inputName !== 'password' ? (
               <label
                  htmlFor={inputName}
                  className={styles.authLabel}
               >
                  {input}:
               </label>
            ) : (
               <div className={styles.showPasswordWrapper}>
                  <label
                     htmlFor={inputName}
                     className={styles.authLabel}
                  >
                     {input.charAt(0).toUpperCase() + input.slice(1)}:
                  </label>
                  <label
                     htmlFor='showPassword'
                     className={styles.showPasswordLabel}
                  >
                     <input
                        id='showPassword'
                        type="checkbox"
                        className={styles.showPasswordCheckBox}
                        checked={showPassword}
                        onChange={() => setShowPassword(prev => !prev)}
                     />
                     <span>
                        (Show Password)
                     </span>
                  </label>
               </div>
            )}
            <input
               id={inputName}
               type={input.toLowerCase() === 'password' ? (showPassword ? 'text' : 'password') : input.toLowerCase() === 'email' ? 'email' : 'text'}
               name={inputName}
               className={styles.authInput}
               value={newUser[inputName]}
               onChange={(e) => changeNewUser(e)}
            />
         </div>
      );
   });

   return (
      <div className={styles.authContainer}>
         <form
            className={styles.authForm}
            onSubmit={(e) => createUser(e)}
         >
            {authInputs}
            <button className={styles.submitButton}>
               Create Account
            </button>
         </form>
      </div >
   );
};

export default SignUp;