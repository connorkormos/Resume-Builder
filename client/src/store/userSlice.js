import { createSlice } from "@reduxjs/toolkit";

import { mergeDeep } from './helpers/mergeDeep';

const initialState = {
   id: null,
   firstName: null,
   lastName: null,
   // userName: null,
   email: null,
   createdAt: null,
   updatedAt: null,
   resumes: [],
   profiles: [],
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action) => ({ ...initialState, ...action.payload }),
      clearUser: () => initialState,
      updateProfile: (state, action) => {
         const index = state.profiles.findIndex((profile) => profile.id === action.payload.id);
         if (index !== -1) state.profiles[index] = action.payload;
      },
      updateUser: (state, action) => {
         const { ...changes } = action.payload;
         mergeDeep(state, changes);
      }
   },
});

export const { setUser, clearUser, updateUser, updateProfile } = userSlice.actions;

export default userSlice.reducer;
