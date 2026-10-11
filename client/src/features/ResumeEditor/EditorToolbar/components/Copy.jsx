import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { copyResumeToApi } from "@/services/resumeServices";
import styles from "../Toolbar.module.css";

export default function Copy({ isMobile }) {
  const navigate = useNavigate();
  const resumeId = useSelector((state) => state.resume.present.id);
  const userId = useSelector((state) => state.user?.id);

  const copyResume = async () => {
    if (userId == null) {
      return alert("You must be logged in to copy the resume.");
    }
    const newResume = await copyResumeToApi(resumeId);
    if (!newResume) {
      return alert("Failed to copy the resume.");
    }
    alert("Resume copied successfully! Happy editing.");
    navigate(`/editor/${newResume.id}`);
  };

  return (
    <button
      data-toolbar-label="Copy Resume"
      className={`buttonMain ${styles.saveCopyButton}`}
      onClick={copyResume}
    >
      Copy {!isMobile && "Resume"}
    </button>
  );
}
