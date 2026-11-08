import React, { useContext, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { useResolvedSectionSpacing } from '@/context/EditorLayoutContext.js';
import { PaddingPreviewContext } from "@/context/PaddingPreviewContext.js";
import { previewPadding } from "@/utils/resumePresentation.js";
import { parseRemValue } from "@/utils/formatters.js";

import { resolvePageNumbers } from "@/utils/resolvePageNumbers";

import MarginIndicator from "./MarginIndicator";

import styles from "./MarginRuler.module.css";

export default function MarginRulerSide({
  renderMarginRuler,
  geometry,
  pageRef,
  resumePageNumber,
  visibleMarginLabels,
  showMarginLabel,
  delayHideMarginLabel,
  flashLabel,
}) {
  const reduxResume = useSelector((state) => state.resume.present);
  
  const { preview } = useContext(PaddingPreviewContext);
  const section = reduxResume.sections.byId[preview?.target === 'section' ? preview.id : reduxResume.activeSectionIds[0]];
  const padding = previewPadding(reduxResume.layout, preview, "resume", null)?.padding;
  const effectivePadding = useResolvedSectionSpacing(section?.id);
  const sectionInset = side => parseRemValue(effectivePadding[`padding${side[0].toUpperCase()}${side.slice(1)}`]);
  const topInset = sectionInset('top');

  const { sections, subsections, fields } = reduxResume;
  const sectionId = section?.id;

  const sectionPageNumbers = useMemo(
    () => sectionId
      ? resolvePageNumbers(reduxResume, "section", sectionId)
      : [],
    [
      sectionId,
      sections,
      subsections,
      fields,
    ],
  );
  // const sectionPageNumbers = section ? resolvePageNumbers(reduxResume, "section", section.id) : []

  const showTopSectionMarginIndicator = sectionPageNumbers[0] === resumePageNumber;
  const showBottomSectionMarginIndicator = sectionPageNumbers.at(-1) === resumePageNumber;

  return (
    <div className={styles.marginRulerSideWrapper} data-prevent-blur="true">
      {renderMarginRuler(11, 0.1, ["0"], "bottom")}
      <MarginIndicator
        target="resume"
        side="top"
        value={reduxResume.layout.padding.top}

        pageRef={pageRef}
        className={styles.resumeMarginIndicatorTop}
        style={{ marginTop: padding.top }}
        onLabelShow={() => showMarginLabel("resume-top")}
        onLabelHide={() => delayHideMarginLabel("resume-top")}
        onLabelFlash={() => flashLabel("resume-top")}


      />
      <span
        className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has("resume-top") ? styles.marginIndicatorLabelVisible : ""}`}
        aria-hidden={!visibleMarginLabels.has("resume-top")}
        style={{
          top: padding.top,
          right: "150%",
          transform: `translateY(-50%)`,
        }}
      >
        {parseFloat(padding.top).toFixed(2) + "rem"}
      </span>


      {section && geometry && showTopSectionMarginIndicator && (
        <>
          <MarginIndicator
            key={`${sectionId}-top`}
            target="section"
            id={sectionId}
            side="top"
            value={section.layout?.padding?.top}
            pageRef={pageRef}
            className={styles.sectionMarginIndicatorTop}
            style={{ marginTop: `calc(${geometry.top}px + ${topInset}rem)` }}
            onLabelShow={() => showMarginLabel(`${sectionId}-top`)}
            onLabelHide={() => delayHideMarginLabel(`${sectionId}-top`)}
            onLabelFlash={() => flashLabel(`${sectionId}-top`)}
          />
          <span
            className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has(`${sectionId}-top`) ? styles.marginIndicatorLabelVisible : ""}`}
            aria-hidden={!visibleMarginLabels.has(`${sectionId}-top`)}
            style={{
              top: `calc(${geometry.top}px + ${topInset}rem)`,
              right: "150%",
              transform: `translateY(-50%)`,
            }}
          >
            {parseFloat(sectionInset("top") || 0).toFixed(2) + "rem"}
          </span>
        </>
      )}
      {section && geometry && showBottomSectionMarginIndicator && (
        <>
          <MarginIndicator
            key={`${sectionId}-bottom`}
            target="section"
            id={sectionId}
            side="bottom"
            value={section.layout?.padding?.bottom}
            pageRef={pageRef}
            className={styles.sectionMarginIndicatorBottom}
            style={{ marginTop: geometry.bottom }}
            onLabelShow={() => showMarginLabel(`${sectionId}-bottom`)}
            onLabelHide={() => delayHideMarginLabel(`${sectionId}-bottom`)}
            onLabelFlash={() => flashLabel(`${sectionId}-bottom`)}
          />
          <span
            className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has(`${sectionId}-bottom`) ? styles.marginIndicatorLabelVisible : ""}`}
            aria-hidden={!visibleMarginLabels.has(`${sectionId}-bottom`)}
            style={{
              marginTop: geometry.bottom,
              right: "150%",
              transform: `translateY(-50%)`,
            }}
          >
            {parseFloat(sectionInset("bottom") || 0).toFixed(2) + "rem"}
          </span>
        </>
      )}
    </div>
  );
}
