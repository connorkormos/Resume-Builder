import React, { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ContainerSettings from "./ContainerSettings/ContainerSettings";
import SectionSettings from "./SectionSettings/SectionSettings";

import styles from "./SettingsModal.module.css";

const SettingsModal = ({ isSettingsModalOpen, setIsSettingsModalOpen }) => {
  const anchorRef = useRef(null);
  const modalRef = useRef(null);
  const portalTarget = document.getElementById("resume-editor") ?? document.body;

  useEffect(() => {
    if (!isSettingsModalOpen) return;

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsSettingsModalOpen(false);
      }
    };

    // Capture clicks before toolbar or editor handlers can stop propagation.
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [isSettingsModalOpen, setIsSettingsModalOpen]);

  useLayoutEffect(() => {
    if (!isSettingsModalOpen) return;

    const modal = modalRef.current;
    const anchor = anchorRef.current.getBoundingClientRect();
    const parent = modal.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const { width, height } = modal.getBoundingClientRect();
    const left = Math.max(16, Math.min(anchor.left, window.innerWidth - width - 16));
    const top = Math.max(16, Math.min(anchor.top, window.innerHeight - height - 16));

    // Position once in the editor's coordinates; scrolling then follows normal document flow.
    modal.style.setProperty("--settings-left", `${left - parent.left}px`);
    modal.style.setProperty("--settings-top", `${top - parent.top}px`);
  }, [isSettingsModalOpen, portalTarget]);

  return (
    <>
      {/* Keep the section-relative anchor while the modal escapes paper stacking contexts. */}
      <span
        ref={anchorRef}
        className={styles.settingsModalAnchor}
        aria-hidden="true"
        data-section-dnd-exclude="true"
      />
      {createPortal(
        <>
          <div
            data-section-dnd-exclude="true"
            className={styles.settingsModalOverlayDiv}
            style={{ display: isSettingsModalOpen ? "block" : "none" }}
          />
          <div
            data-section-dnd-exclude="true"
            className={styles.settingsModalContainerDiv}
            ref={modalRef}
          >
            <ContainerSettings />
            <SectionSettings setIsSettingsModalOpen={setIsSettingsModalOpen} />
          </div>
        </>,
        portalTarget,
      )}
    </>
  );
};

export default SettingsModal;
