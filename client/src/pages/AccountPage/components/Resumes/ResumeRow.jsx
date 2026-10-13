import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setResumeId } from "@/store/resumeSlice";
import {
  copyResumeToApi,
  deleteResumeFromApi,
} from "@/services/resumeServices";

// import styles from './Account.module.css';
import { formatDateTime, formatCompactDateTime } from "@/utils/formatters";
import ResumePreviewCard from "@/features/ResumePreview/ResumePreviewCard";

import styles from "./Resumes.module.css";

export default function ResumeRow({ resumeId, resume, fetchResume, fetchUserResumeIds }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!resume) void fetchResume(resumeId);
  }, [resumeId, resume, fetchResume]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleEditResume = () => {
    dispatch(setResumeId(resumeId));
    navigate(`/editor/${resumeId}`);
  };

  const handleDeleteResume = async () => {
    if (!confirm(`Are you sure you want to delete resume titled ${resume.title}?`)) return;

    const resumeIsDeleted = await deleteResumeFromApi(resume.id);
    if (!resumeIsDeleted) {
      return;
    }
    await fetchUserResumeIds(true);
  };

  const handleCopyResume = async () => {
    
    const copiedResume = await copyResumeToApi(resume.id);
    if (!copiedResume) {
      alert("An error occured when copying your resume.");
      return;
    }
    await fetchUserResumeIds(true);
  };

  if (!resume) {
    return null;
  }

  return (
    <>
      {!isMobile && (
        <div className={styles.userResumeRow}>
          <div className="flexRow">
            <ResumePreviewCard
              hoverPreview
              styling={{ height: "6rem" }}
              resumeId={resume.id}
              resumeData={resume}
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
              resumeData={resume}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};