import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateContainer } from "@/store/resumeSlice.js";

import styles from "../SettingsModal.module.css";

const ContainerSettings = () => {
  const dispatch = useDispatch();

  const activeSectionIds = useSelector((state) => state.resume.present.activeSectionIds);
  const activeSectionId = activeSectionIds[0] ?? null;
  const section = useSelector(
    (state) => state.resume.present.sections.byId[activeSectionId],
  );
  const container = useSelector(
    (state) => state.resume.present.containers.byId[section?.containerId],
  );

  const [containerWidthInputValue, setContainerWidthInputValue] = useState(
    container?.layout?.width?.value.replace("%", "") || "auto",
  );
  const [autoWidthInputValue, setAutoWidthInputValue] = useState(
    container?.layout?.width?.auto || false,
  );

  const handleContainerWidthSubmit = (e) => {
    e.preventDefault();
    if (containerWidthInputValue < 0) {
      alert();
    }

    dispatch(
      updateContainer({
        id: container?.id,
        layout: {
          width: {
            value: containerWidthInputValue + "%",
            auto: false,
          },
        },
      }),
    );
    setAutoWidthInputValue(false);
  };

  const handleAutoWidthSubmit = () => {
    // e.preventDefault();
    dispatch(
      updateContainer({
        id: container?.id,
        layout: {
          width: {
            auto: autoWidthInputValue,
          },
        },
      }),
    );
  };

  useEffect(() => {
    handleAutoWidthSubmit();
  }, [autoWidthInputValue]);

  return (
    <div className={styles.settingsModalWrapper}>
      <h2 className={styles.settingsModalHeader}>
        Container {container?.position + 1} Settings:
      </h2>
      <div className="flexRow spaceBetween">
        <form className="flexRow" onSubmit={handleContainerWidthSubmit}>
          <label htmlFor="containerWidthInput" className="flexRow">
            <span>Width:</span>

            <input
              id="containerWidthInput"
              className="inputMain"
              style={{
                textAlign: "left",
                width: "3.5rem",
                marginRight: "-1.75rem",
                padding: "0 0 0 0.5rem",
              }}
              type="number"
              min="1"
              max="100"
              step="0.1"
              value={containerWidthInputValue}
              onChange={(e) => setContainerWidthInputValue(e.target.value)}
            />
            <span style={{ pointerEvents: "none" }}>%</span>
          </label>
        </form>
        <form className="flexRow" onSubmit={handleAutoWidthSubmit}>
          <label htmlFor="autoWidthInput" className="flexRow">
            AutoWidth:
            <input
              id="autoWidthInput"
              type="checkbox"
              checked={autoWidthInputValue}
              onChange={(e) => setAutoWidthInputValue(e.target.checked)}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default ContainerSettings;
