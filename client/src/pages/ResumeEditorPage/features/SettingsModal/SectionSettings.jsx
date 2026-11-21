import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SubsectionSettings from "./SubsectionSettings.jsx.jsx";

import { updateSection } from "@/store/resumeSlice.js";


import styles from "./SettingsModal.module.css";

const SectionSettings = () => {
  const dispatch = useDispatch();

  const activeSectionIds = useSelector((state) => state.resume.present.activeSectionIds);
  const section = useSelector(
    (state) => state.resume.present.sections.byId[activeSectionIds?.[0]],
  );

  if (!section) {
    return null;
  }

  const hideOrShowHeading = () => {
    const newShowHeadingValue = !section.showHeading;
    dispatch(
      updateSection({
        id: section.id,
        showHeading: newShowHeadingValue,
      }),
    );
  };

  const gridColumnsInput = section.layout?.display === "grid"
    ? section.layout?.grid?.columns ?? 1
    : 1;

  const updateColumnCount = (newColumnCount) => {
    if (newColumnCount < 1) return;
    dispatch(
      updateSection({
        id: section.id,
        layout: {
          grid: {
            columns: newColumnCount,
          },
        },
      }),
    );
  };

  return (
    <div className={styles.settingsModalWrapper}>
      <h2 className={styles.settingsModalHeader}>{section.label} Settings:</h2>
      <div className="flexRow">
        <label className="flexRow" htmlFor="hideOrShowHeading">
          Show Section {section.label} Heading:
          <input
            id="hideOrShowHeading"
            type="checkbox"
            checked={section.showHeading}
            onChange={() => hideOrShowHeading()}
          />
        </label>
      </div>
      <div className="flexColumn">
        <h3>Advanced Orientation:</h3>
        <label htmlFor="flex-direction-select" className="flexRow">
          Columns:
          <button className="buttonMain" onClick={() => updateColumnCount(gridColumnsInput - 1)}>
            -
          </button>
          <input
            className="inputMain"
            type="number"
            value={gridColumnsInput}
            onChange={(e) => {
              updateColumnCount(Number(e.target.value));
            }}
            style={{ width: "3rem" }}
          />
          <button className="buttonMain" onClick={() => updateColumnCount(gridColumnsInput + 1)}>
            +
          </button>

        </label>

      </div>
      <SubsectionSettings section={section} gridColumnsInput={gridColumnsInput} />
    </div>
  );
};

export default SectionSettings;
