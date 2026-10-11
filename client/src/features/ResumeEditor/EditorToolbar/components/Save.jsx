import { useSelector } from "react-redux";
import { saveResumeToApi } from "@/services/resumeServices";

import { PiFloppyDiskFill } from "react-icons/pi";

import styles from "../Toolbar.module.css";

export default function Save({ isMobile }) {
  const resume = useSelector((state) => state.resume.present);

  const saveResume = async () => {
    const resumeIsSaved = await saveResumeToApi(resume);
    if (!resumeIsSaved) return;

    alert("Resume saved successfully!");
  };

  return (
    <button
      data-toolbar-label="Save Resume"
      className={`buttonMain ${styles.saveCopyButton}`}
      onClick={saveResume}
    >
      {isMobile ? <PiFloppyDiskFill style={{scale: 1.2}} /> : 'Save'}
    </button>
  );
}
