import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useState, useEffect, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { setResume, updateResume } from "@/store/resumeSlice.js";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import { getResumeFromApi } from "@/services/resumeServices";

import { FaArrowLeft } from "react-icons/fa6";

import CurrentlyEditing from "./CurrentlyEditing";
import Save from "./Save";
import Copy from "./Copy";
import Print from "./Print";



import styles from "../Toolbar.module.css";

// const TopBar = forwardRef(function TopBar({  }, ref) {
const TopBar = ({ handlePrint }) => {
  const dispatch = useDispatch();
  const { resumeId } = useParams();

  const resume = useSelector((state) => state.resume.present);
  const user = useSelector((state) => state.user);

  const fetchResumeById = useCallback(
    async (resumeId) => {
      const normalizedResumeData = await getResumeFromApi(resumeId);
      if (!normalizedResumeData) {
        return;
      }

      dispatch(setResume(normalizedResumeData));
      dispatch(UndoActionCreators.clearHistory());
    },
    [dispatch],
  );

  useEffect(() => {
    if (resumeId) fetchResumeById(resumeId);
  }, [resumeId, fetchResumeById]);

  const [resumeTitle, setResumeTitle] = useState(resume.title);

  useEffect(() => {
    // if (!resume) return;
    setResumeTitle(resume?.title);
  }, [resume]);

  const handleSetResumeTitle = (e) => {
    const value = e.currentTarget.innerText.trim();

    setResumeTitle(value);
    dispatch(
      updateResume({
        title: value,
      }),
    );
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  //   const resumeTitleString = !isMobile
  //     ? resumeTitle
  //     : resumeTitle.slice(0, 10) + "...";

  return (
    <div className={styles.topBarContainer}>
      {isMobile && (

        <Link to="/" data-toolbar-label="Home" className={styles.homeLink}>
          <FaArrowLeft />
          {/* Home */}
        </Link>
      )}
      <div
        className={`buttonMain ${styles.resumeTitle}`}
        // className="buttonMain"
        contentEditable
        data-toolbar-label="Resume Title"
        suppressContentEditableWarning
        onBlur={handleSetResumeTitle}
      >
        <span className={styles.resumeTitleSpan}>{resumeTitle}</span>
      </div>
      {!isMobile && <CurrentlyEditing />}
      {/* <CurrentlyEditing /> */}
      {/* <AddSection /> */}
      {/* <div className={styles.saveCopyPrintButtonsWrapper}> */}
      {!isMobile && (
        <>
          {user?.id === resume?.userId ? (
            <Save isMobile={isMobile} />
          ) : (
            <Copy isMobile={isMobile} />
          )}
          <Print handlePrint={handlePrint} />
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default TopBar;
