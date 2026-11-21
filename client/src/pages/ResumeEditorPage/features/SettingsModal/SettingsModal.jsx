import React, { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { MdClose } from "react-icons/md";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import ContainerSettings from "./ContainerSettings";
import SectionSettings from "./SectionSettings";

import styles from "./SettingsModal.module.css";

const SettingsModal = ({ isSettingsModalOpen, setIsSettingsModalOpen }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
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

    const updatePosition = () => {
      if (isMobile) return;

      const modal = modalRef.current;
      const anchor = anchorRef.current.getBoundingClientRect();
      const parent = modal.offsetParent?.getBoundingClientRect() ?? { left: 0, top: 0 };
      const left = Math.max(16, anchor.left);
      const availableWidth = Math.max(0, document.documentElement.clientWidth - left - 16);

      // Position in the editor's coordinates, but constrain width in viewport coordinates.
      modal.style.setProperty("--settings-left", `${left - parent.left}px`);
      modal.style.setProperty("--settings-available-width", `${availableWidth}px`);

      // Wrapping can change the height, so measure after applying the width constraint.
      const { height } = modal.getBoundingClientRect();
      const top = Math.max(16, Math.min(anchor.top, window.innerHeight - height - 16));
      modal.style.setProperty("--settings-top", `${top - parent.top}px`);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isSettingsModalOpen, portalTarget, isMobile]);

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
            <MdClose
              className={styles.closeSettingsModalButton}
              onClick={() => setIsSettingsModalOpen(false)}
            />
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
