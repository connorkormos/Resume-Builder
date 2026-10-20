import { EditorLayoutContext, useResolvedSectionSpacing } from '../helpers/EditorLayoutContext.js';
import { useContext } from "react";
import { useSelector } from "react-redux";
import { PiHouseSimpleFill } from "react-icons/pi";
import styles from "./MarginRuler.module.css";
import MarginIndicator from "./MarginIndicator";
import { PaddingPreviewContext, previewLayout } from "../helpers/PaddingPreviewContext";
import { parseRemValue } from "@/utils/formatters";

export default function MarginRulerTop({
  renderMarginRuler,
  geometry,
  pageRef,
  visibleMarginLabels,
  showMarginLabel,
  delayHideMarginLabel,
  flashLabel,
}) {
  const resume = useSelector((state) => state.resume.present);
  const { preview } = useContext(PaddingPreviewContext);
  const section = resume.sections.byId[preview?.target === 'section' ? preview.id : resume.activeSectionIds[0]];
  const contexts = useContext(EditorLayoutContext);
  const container = resume.containers.byId[contexts[section?.id]?.containerId ?? section?.containerId];
  const padding = previewLayout(resume.layout, preview, "resume", null).padding;
  const effectivePadding = useResolvedSectionSpacing(section?.id);
  const inset = side => parseRemValue(effectivePadding[`padding${side[0].toUpperCase()}${side.slice(1)}`]);
  const containerLeft = geometry ? `calc(${geometry.left}px + ${inset('left')}rem)` : null;
  const contentLeft = containerLeft;
  const activeTarget = resume.activeEditorId === section?.id
    ? section
    : resume.fields.byId[resume.activeEditorId];
  const indentation = parseRemValue(activeTarget?.layout?.marginLeft);
  const showIndentation = Boolean(
    resume.activeEditorId && section && container && contentLeft != null &&
    Number.isFinite(indentation) && indentation !== 0,
  );

  return (
    <div className={styles.marginRulerTopWrapper} data-prevent-blur="true">
      <MarginIndicator
        target="resume"
        side="left"
        value={resume.layout.padding.left}
        pageRef={pageRef}
        className={styles.resumeMarginIndicatorLeft}
        style={{ marginLeft: padding.left }}
        onLabelShow={() => showMarginLabel("resume-left")}
        onLabelHide={() => delayHideMarginLabel("resume-left")}
        onLabelFlash={() => flashLabel("resume-left")}
      />
      <span
        className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has("resume-left") ? styles.marginIndicatorLabelVisible : ""}`}
        aria-hidden={!visibleMarginLabels.has("resume-left")}
        style={{
          top: "150%",
          left: padding.left,
          transform: `translateX(-50%)`,
        }}
      >
        {parseFloat(padding.left).toFixed(2) + "rem"}
      </span>
      <MarginIndicator
        target="resume"
        side="right"
        value={resume.layout.padding.right}
        pageRef={pageRef}
        className={styles.resumeMarginIndicatorRight}
        style={{ marginRight: padding.right }}
        onLabelShow={() => showMarginLabel("resume-right")}
        onLabelHide={() => delayHideMarginLabel("resume-right")}
        onLabelFlash={() => flashLabel("resume-right")}
      />
      <span
        className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has("resume-right") ? styles.marginIndicatorLabelVisible : ""}`}
        aria-hidden={!visibleMarginLabels.has("resume-right")}
        style={{
          top: "150%",
          left: `calc(100% - ${padding.right})`,
          transform: `translateX(-50%)`,
        }}
      >
        {parseFloat(padding.right).toFixed(2) + "rem"}
      </span>
      {container && geometry
        && (
          <>
            <MarginIndicator
              key={`${container.id}-left`}
              target="container"
              id={container.id}
              side="left"
              value={container.layout?.padding?.left}
              pageRef={pageRef}
              className={styles.sectionMarginIndicatorLeft}
              style={{
                marginLeft: containerLeft,
              }}
              onLabelShow={() => showMarginLabel(`${container.id}-left`)}
              onLabelHide={() => delayHideMarginLabel(`${container.id}-left`)}
              onLabelFlash={() => flashLabel(`${container.id}-left`)}
            />
            <span
              className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has(`${container.id}-left`) ? styles.marginIndicatorLabelVisible : ""}`}
              aria-hidden={!visibleMarginLabels.has(`${container.id}-left`)}
              style={{
                top: "150%",
                left: containerLeft,
                transform: `translateX(-50%)`,
              }}
            >
              {parseFloat(inset("left")).toFixed(2) + "rem"}
            </span>
          </>
        )}
      {container && geometry && (
        <>
          <MarginIndicator
            key={`${container.id}-right`}
            target="container"
            id={container.id}
            side="right"
            value={container.layout?.padding?.right}
            pageRef={pageRef}
            className={styles.sectionMarginIndicatorRight}
            style={{
              marginLeft: `calc(${geometry.right}px - ${inset("right")}rem)`,
            }}
            onLabelShow={() => showMarginLabel(`${container.id}-right`)}
            onLabelHide={() => delayHideMarginLabel(`${container.id}-right`)}
            onLabelFlash={() => flashLabel(`${container.id}-right`)}
          />
          <span
            className={`${styles.marginIndicatorLabel} ${visibleMarginLabels.has(`${container.id}-right`) ? styles.marginIndicatorLabelVisible : ""}`}
            aria-hidden={!visibleMarginLabels.has(`${container.id}-right`)}
            style={{
              top: "150%",
              left: `calc(${geometry.right}px - ${inset("right")}rem)`,
              transform: `translateX(-50%)`,
            }}
          >
            {parseFloat(inset("right")).toFixed(2) + "rem"}
          </span>
        </>
      )}
      {showIndentation && (
        <PiHouseSimpleFill
          className={styles.indentationIndicator}
          role="img"
          aria-label={`Active ${activeTarget === section ? "heading" : "field"} indentation: ${indentation}rem`}
          title={`Indentation: ${indentation}rem`}
          style={{ left: `calc(${contentLeft} + ${indentation}rem)` }}
        />
      )}
      {renderMarginRuler(8.5, 0.1, ["0"], "top")}
    </div>
  );
}
