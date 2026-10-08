import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { editorRegistry } from "@/helpers/editorRegistry.js";

import { FaArrowLeft } from "react-icons/fa6";

import RichTextToolbar from "./components/RichTextToolbar.jsx";
import TopBar from "./components/TopBar";

import styles from "./Toolbar.module.css";

const Toolbar = ({ handlePrint }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [tooltip, setTooltip] = useState(null);

  const showTooltip = (event) => {
    const control = event.target.closest(
      'button, input, a, [contenteditable="true"], svg',
    );
    const label = control?.closest("[data-toolbar-label]")?.dataset
      .toolbarLabel;
    if (!label) {
      setTooltip(null);
      return;
    }
    const rect = control.getBoundingClientRect();
    setTooltip({
      label,
      left: rect.left + rect.width / 2,
      top: rect.bottom + 6,
    });
  };

  const activeEditorId = useSelector(
    (state) => state.resume.present.activeEditorId,
  );
  const editor = editorRegistry.get(activeEditorId);

  return (
    <>
    <div
      className={styles.toolbarContainer}
      onMouseOver={showTooltip}
      onMouseLeave={() => setTooltip(null)}
      onFocus={showTooltip}
      onBlur={() => setTooltip(null)}
      onMouseDown={() => setTooltip(null)}
      onKeyDown={(event) => event.key === "Escape" && setTooltip(null)}
      >
      {tooltip &&
        createPortal(
          <div
          role="tooltip"
          className={styles.tooltip}
          style={{ left: tooltip.left, top: tooltip.top }}
          >
            {tooltip.label}
          </div>,
          document.body,
        )}
        {!isMobile && (
          <Link to="/" data-toolbar-label="Home" className={styles.homeLink}>
            <FaArrowLeft />
          </Link>
        )}
      <div className={styles.toolbarContent}>
        <TopBar handlePrint={handlePrint} />
        <RichTextToolbar editor={editor} />
      </div>
    </div>
        </>
  );
};

export default Toolbar;
