import React, { useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { useDispatch } from "react-redux";
// import { revertToPreviousState } from "./store/resumeSlice";
import { setUser } from "./store/userSlice";
import { checkApi, checkSession } from "./services/sessionServices";

import NavbarLayout from "./components/Layout/NavbarLayout";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ResumeEditorPage from "./pages/ResumeEditorPage/ResumeEditorPage";

import AccountPage from "./pages/AccountPage/AccountPage";
import Resumes from "./pages/AccountPage/Resumes/Resumes.jsx";
import Settings from "./pages/AccountPage/Settings/Settings.jsx";
import Profile from "./pages/AccountPage/Profile/Profile.jsx";
import CreateProfileForm from "./pages/AccountPage/Profile/components/CreateProfileForm.jsx";
import EditProfile from "./pages/AccountPage/Profile/components/EditProfile.jsx";

import Search from "./pages/SearchPage/Search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const runSiteLaunch = async () => {
      const apiStatus = await checkApi();
      // console.log("API STATUS: ", apiStatus);

      const sessionData = await checkSession();
      if (sessionData !== null) {
        dispatch(setUser(sessionData));
      }
    };
    runSiteLaunch();
  }, [dispatch]);

  return (
    <BrowserRouter>
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
          <Route path="profile" element={<Profile />}>
            <Route path="create" element={<CreateProfileForm />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
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
