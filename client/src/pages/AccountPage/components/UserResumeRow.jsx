import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setResumeId } from "@/store/resumeSlice";
import {
  copyResumeToApi,
  deleteResumeFromApi,
} from "@/services/resumeServices";

// import styles from './Account.module.css';
import { formatDateTime, formatCompactDateTime } from "@/utils/formatters";
import ResumePreviewCard from "@/features/ResumePreview/ResumePreviewCard";

import styles from "./UserResumes.module.css";

const UserResumeRow = ({ resume, fetchUserResumes }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const user = useSelector((state) => state.user);

  const handleEditResume = () => {
    dispatch(setResumeId(resume.id));
    navigate(`/editor/${resume.id}`);
  };

  const handleDeleteResume = async () => {
    if (
      !confirm(`Are you sure you want to delete resume titled ${resume.title}?`)
    ) {
      return;
    }

    const resumeIsDeleted = await deleteResumeFromApi(resume.id);
    if (!resumeIsDeleted) {
      return;
    }
    fetchUserResumes(user.id);
  };

  const handleCopyResume = async () => {
    const copiedResume = await copyResumeToApi(resume.id);
    if (!copiedResume) {
      alert("An error occured when copying your resume.");
      return;
    }
    fetchUserResumes(user.id);
  };

  return (
    <>
      {!isMobile && (
        <div className={styles.userResumeRow}>
          <div className="flexRow">
            <ResumePreviewCard
              hoverPreview
              styling={{ height: "6rem" }}
              resumeId={resume.id}
              caption={false}
            />
            <div className={styles.resumeInfoWrapper}>
              <h2 className={styles.resumeTitle}>{resume.title}</h2>
              <div className={styles.resumeDetailsWrapper}>
                <p>
                  Created On: {formatDateTime(resume.createdAt)}
                </p>
                <p>
                  Last Updated On: {formatDateTime(resume.updatedAt)}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.userResumeRowButtons}>
            <button
              className={styles.editResumeButton}
              onClick={handleEditResume}
            >
              Edit
            </button>
            <button
              className={styles.editResumeButton}
              onClick={handleCopyResume}
            >
              Make Copy
            </button>
            <button
              className={styles.deleteResumeButton}
              onClick={handleDeleteResume}
            >
              Delete
            </button>
            {/* Future implementation: Buttons for viewing, editing, and deleting the resume */}
          </div>
        </div>
      )}
      {isMobile && (
        <div className={styles.mobileResumeRowWrapper}>
          <h2 className={styles.resumeTitle}>{resume.title}</h2>
          <div className={styles.mobileResumeRow}>
            <ResumePreviewCard
              hoverPreview
              styling={{ height: !isMobile ? "4rem" : "9rem" }}
              resumeId={resume.id}
              caption={false}
            />
            <div className={styles.mobileResumeRowContent}>
              {/* <div className={styles.resumeDetailsWrapper}> */}
                <p><span>Created: </span><span>{formatCompactDateTime(resume.createdAt)}</span></p>
                <p><span>Updated: </span><span>{formatCompactDateTime(resume.updatedAt)}</span></p>
              {/* </div> */}
              <div className={styles.userResumeRowButtons}>
                <button
                  className={styles.editResumeButton}
                  onClick={handleEditResume}
                >
                  Edit
                </button>
                <button
                  className={styles.editResumeButton}
                  onClick={handleCopyResume}
                >
                  Copy
                </button>
                <button
                  className={styles.deleteResumeButton}
                  onClick={handleDeleteResume}
                >
                  Delete
                </button>
                {/* Future implementation: Buttons for viewing, editing, and deleting the resume */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserResumeRow;
