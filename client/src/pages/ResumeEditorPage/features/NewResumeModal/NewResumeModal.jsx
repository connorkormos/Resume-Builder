import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setResumeId } from "@/store/resumeSlice";

import { addResumeToApi, getSectionTypesFromApi } from "@/services/resumeServices";


import styles from "./NewResumeModal.module.css";

const NewResumeModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [resumeInfo, setResumeInfo] = useState({
    userId: user.id,
    title: "",
  });

  const [sectionTypes, setSectionTypes] = useState({});

  useEffect(() => {
    const fetchSectionTypes = async () => {
      const sectionTypeData = await getSectionTypesFromApi();
      if (!sectionTypeData) {
        return;
      }

      setSectionTypes(sectionTypeData);
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        sections: Object.fromEntries(
          Object.keys(sectionTypeData).map((key) => [key, false])
        ),
      }));
    };

    fetchSectionTypes();
  }, []);

  const handleResumeInfoChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === "checkbox") {
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        sections: {
          ...prevInfo.sections,
          [id]: checked,
        },
      }));
    } else {
      setResumeInfo((prevInfo) => ({
        ...prevInfo,
        [id]: value,
      }));
    }
  };



  const handleCreateResume = async () => {
    if (!resumeInfo.title) {
      alert("Please enter a title for your resume.");
      return;
    }
    if (!confirm("Are you sure you want to create a new resume?")) {
      return;
    }
    console.log("Creating resume with info:", resumeInfo);

    const normalizedResumeData = await addResumeToApi(resumeInfo);
    if (!normalizedResumeData) {
      return;
    }

    dispatch(setResumeId(normalizedResumeData.id));
    navigate(`/editor/${normalizedResumeData.id}`);
  };

  const renderSectionOptions = resumeInfo.sections && Object.keys(resumeInfo.sections).map((key) => {
    const section = sectionTypes[key];
    const id = section.type;
    return (
      <label htmlFor={id} key={id} className={styles.checkboxLabel}>
        <input
          type="checkbox"
          className={styles.sectionCheckbox}
          checked={resumeInfo.sections[id] || false}
          onChange={(e) => handleResumeInfoChange(e)}
          id={id}
          name={section.label}
        />
        {section.label}
      </label>
    )
  })

  // const resumeOptionsArr = [
  //   "header",
  //   "contact",
  //   "skills",
  //   "summary",
  //   "workHistory",
  //   "education",
  //   "projects",
  //   "custom"
  // ];
  // const resumeOptions = resumeOptionsArr.map((option, index) => {
  //   let splitOption = option.replace(
  //     option.match(/[A-Z]/g),
  //     " " + option.match(/[A-Z]/g),
  //   );
  //   let capitalizedOption =
  //     splitOption.charAt(0).toUpperCase() + splitOption.slice(1);

  //   return (
  //     <label htmlFor={option} className={styles.checkboxLabel}>
  //       <input
  //         type="checkbox"
  //         className={styles.sectionCheckbox}
  //         checked={resumeInfo.sections[option] || false}
  //         onChange={(e) => handleResumeInfoChange(e)}
  //         id={option}
  //         name={option}
  //       />
  //       {capitalizedOption}
  //     </label>
  //   );
  // });

  return (
    <div className={styles.modalOverlayContainer}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.resumeInfoWrapper}>
          <h2 className={styles.startResumeTitle}>Start a New Resume</h2>
          <label htmlFor="title" className={styles.inputLabel}>
            <span className={styles.primarySpan}>Resume Title:</span>
            <input
              id="title"
              type="text"
              name="title"
              className={styles.resumeInfoInput}
              placeholder="e.g. Software Engineer Resume"
              value={resumeInfo.title}
              onChange={(e) => handleResumeInfoChange(e)}
            />
          </label>
          <div className={styles.sectionsToIncludeWrapper}>
            <p>
              <span className={styles.primarySpan}>Sections to Include:</span>
              <br></br>
              <span>(You can always change this later)</span>
            </p>
            <div className={styles.checkboxOptionsWrapper}>
              {renderSectionOptions}
            </div>
          </div>
          <button
            className={styles.createResumeButton}
            onClick={handleCreateResume}
            disabled={Object.keys(sectionTypes).length === 0}
          >
            Create Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewResumeModal;
