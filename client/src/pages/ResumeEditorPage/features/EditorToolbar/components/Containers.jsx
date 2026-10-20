import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { deleteContainer, setResume } from "@/store/resumeSlice.js";

import styles from "@/pages/ResumeEditorPage/features/TextFormatting/TextFormatting.module.css";
import {
  addContainerToApi,
  deleteLastContainerFromApi,
  saveResumeToApi,
} from "@/services/resumeServices.js";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";

const Containers = () => {
  const dispatch = useDispatch();

  const reduxResume = useSelector((state) => state.resume.present);

  const reduxContainers = useSelector((state) => state.resume.present.containers);

  const [containerInputValue, setContainerInputValue] = useState(
    reduxContainers.allIds.length || 0,
  );

  useEffect(() => {
    setContainerInputValue(reduxContainers.allIds.length);
  }, [reduxContainers.allIds]);

  const addContainer = async () => {
   if (reduxContainers.allIds.length >= 10) {
     alert("Resumes cannot have more than 10 containers.");
     return;
   }
    const saved = await saveResumeToApi(reduxResume);
   
    if (!saved) return;
    
    const updatedNormalizedResumeData = await addContainerToApi(reduxResume.id);

    if (!updatedNormalizedResumeData) {
      return;
    }
    dispatch(setResume(updatedNormalizedResumeData));
  };

  const removeLastContainer = async () => {
    const autoSave = false;

    const lastContainerId = reduxContainers.allIds.at(-1);

    if (autoSave) {
      const updatedNormalizedResumeData = await deleteLastContainerFromApi(
        reduxResume.id,
      );
      if (!updatedNormalizedResumeData) {
        return;
      }
    }
    dispatch(deleteContainer(lastContainerId));
  };

  const containerInputLabel = containerInputValue == 1 ? "Container" : "Containers";

  return (
    <div className={`${styles.toolbarFlexWrapper} ${styles.incrementDecrementToolbarWrapper}`}>
      <button className="buttonMain" data-toolbar-label="Remove Container" onClick={() => removeLastContainer()}>
        -
      </button>
      <button className="buttonMain" data-toolbar-label="Containers">
        <TfiLayoutColumn3Alt style={{ marginRight: "0.5rem" }} />
        {containerInputValue}
      </button>
      <button className="buttonMain" data-toolbar-label="Add Container" onClick={() => addContainer()}>
        +
      </button>
    </div>
  );
};

export default Containers;
