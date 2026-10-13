import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
// import { revertToPreviousState } from "./store/resumeSlice";
import { setUser } from "./store/userSlice";
import { checkApi, checkSession } from "./services/sessionServices";
import { getResumeFromApi } from "./services/resumeServices";

import NavbarLayout from "./components/Layout/NavbarLayout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ResumeEditorPage from "./pages/ResumeEditorPage/ResumeEditorPage";

import AccountPage from "./pages/AccountPage/AccountPage";
import Resumes from "./pages/AccountPage/components/Resumes/Resumes.jsx";
import Settings from "./pages/AccountPage/components/Settings/Settings.jsx";
import Profile from "./pages/AccountPage/components/Profile/Profile.jsx";

import Search from "./pages/SearchPage/Search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const runSiteLaunch = async () => {
      const apiStatus = await checkApi();
      console.log("API STATUS: ", apiStatus);

      const sessionData = await checkSession();
      if (sessionData !== null) {
        dispatch(setUser(sessionData));
      }
    };
    runSiteLaunch();
  }, []);

  return (
    <BrowserRouter>
      {/* {tempResumeData && (
         <ResumeEditor tempResumeId={tempResumeId} styling={{ scale: 0.5}} resumeData={tempResumeData} />
      )} */}
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/browse" element={<Search />} />
        </Route>

        <Route path="/account" element={<AccountPage />}>
          {/* <Route index element={<Navigate to="my-resumes" replace />} /> */}
          <Route path="my-resumes" element={<Resumes />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/editor" element={<ResumeEditorPage />} />
        <Route path="/editor/new" element={<ResumeEditorPage />} />
        <Route path="/editor/:resumeId" element={<ResumeEditorPage />} />
        <Route path="/demo" element={<ResumeEditorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
