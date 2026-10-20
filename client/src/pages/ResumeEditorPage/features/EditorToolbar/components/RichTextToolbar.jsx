import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { resolveEditorContext } from "@/utils/resumeContext.js";

import LineHeight from "@/pages/ResumeEditorPage/features/TextFormatting/LineHeight.jsx";
import FontSize from "@/pages/ResumeEditorPage/features/TextFormatting/FontSize.jsx";
import FontColor from "@/pages/ResumeEditorPage/features/TextFormatting/FontColor.jsx";
import HighlightColor from "@/pages/ResumeEditorPage/features/TextFormatting/HighlightColor.jsx";
import BackgroundColor from "@/pages/ResumeEditorPage/features/TextFormatting/BackgroundColor.jsx";
import TextAlign from "@/pages/ResumeEditorPage/features/TextFormatting/TextAlign.jsx";
import Lists from "@/pages/ResumeEditorPage/features/TextFormatting/Lists.jsx";
import Marks from "@/pages/ResumeEditorPage/features/TextFormatting/Marks.jsx";

import Containers from "./Containers.jsx";
import Gap from "./Gap.jsx";
import Links from "../../TextFormatting/Links.jsx";
import Icons from "../../TextFormatting/Icons.jsx";
import Borders from "./Borders.jsx";

import FontFamily from "../../TextFormatting/FontFamily.jsx";
import AddSection from "./AddSection.jsx";
import ResetStyling from "./ResetStyling.jsx";
import Indentation from "../../TextFormatting/Indentation.jsx";
import UndoRedo from "./UndoRedo.jsx";
import Copy from './Copy.jsx';
import Save from './Save.jsx';
import Print from './Print.jsx';

import styles from "../Toolbar.module.css";

const RichTextToolbar = ({ editor, handlePrint }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
    const user = useSelector((state) => state.user);
    const resume = useSelector((state) => state.resume.present);
  
  const resumeStyling = useSelector((state) => state.resume.present.styling);
  const sections = useSelector((state) => state.resume.present.sections);
  const containers = useSelector((state) => state.resume.present.containers);
  const fields = useSelector((state) => state.resume.present.fields);
  const subsections = useSelector((state) => state.resume.present.subsections);

  const activeSectionIds = useSelector(
    (state) => state.resume.present.activeSectionIds,
  );
  const activeSectionId = activeSectionIds[0] ?? null;
  const activeEditorId = useSelector(
    (state) => state.resume.present.activeEditorId,
  );
  const selection = useSelector(
    (state) => state.resume.present.activeEditorSelection,
  );

  // Keep the context stable during local input edits and unrelated UI updates.
  const editorContext = useMemo(
    () => resolveEditorContext({
      fields, subsections, sections, containers, styling: resumeStyling,
    }, activeEditorId),
    [fields, subsections, sections, containers, resumeStyling, activeEditorId],
  );

  const lineHeightComponent = (
    <LineHeight
      editor={editor}
      selection={selection}
      context={editorContext}
      activeSectionId={activeSectionId}
      activeSectionIds={activeSectionIds}
      resumeStyling={resumeStyling}
    />
  );
  const fontSizeComponent = (
    <FontSize
      editor={editor}
      selection={selection}
      containers={containers}
      context={editorContext}
      activeSectionId={activeSectionId}
      activeSectionIds={activeSectionIds}
      resumeStyling={resumeStyling}
    />
  );
  const fontColorComponent = (
    <FontColor
      editor={editor}
      selection={selection}
      context={editorContext}
      activeSectionIds={activeSectionIds}
    />
  );
  const highlightColorComponent = (
    <HighlightColor editor={editor} selection={selection} />
  );
  const backgroundColorComponent = (
    <BackgroundColor
      activeSectionId={activeSectionId}
      activeSectionIds={activeSectionIds}
    />
  );
  const fontFamilyComponent = <FontFamily />;
  const marksComponent = <Marks editor={editor} />;
  const linksComponent = <Links editor={editor} selection={selection} />;
  const iconsComponent = <Icons editor={editor} />;
  const containersComponent = <Containers label="Containers:" />;
  const textAlignComponent = (
    <TextAlign
      editor={editor}
      selection={selection}
      activeSectionId={activeSectionId}
      activeSectionIds={activeSectionIds}
    />
  );
  const listsComponent = <Lists editor={editor} />;
  const indentationComponent = <Indentation />;
  const resetStylingComponent = <ResetStyling />;
  const undoRedoComponent = <UndoRedo />;
  const bordersComponent = (
    <Borders
      activeSectionId={activeSectionId}
      activeSectionIds={activeSectionIds}
    />
  );
  const gapComponent = <Gap />;
  const addSectionComponent = <AddSection />;

  if (isMobile) {
    return (
      <div className={styles.richTextToolbarContainer}>
        <div className={styles.richTextToolbarWrapper}>
          <div className={styles.mobileToolbarRow}>

            {lineHeightComponent}
            {fontSizeComponent}
            {fontFamilyComponent}
            {fontColorComponent}
            {marksComponent}
          </div>
          <div className={styles.mobileToolbarRow}>
            {textAlignComponent}
            {listsComponent}
            {indentationComponent}
            {backgroundColorComponent}
            {highlightColorComponent}
            {linksComponent}
            {iconsComponent}
          </div>
          <div className={styles.mobileToolbarRow}>
            {containersComponent}
            {gapComponent}
            {bordersComponent}
            {addSectionComponent}
            {resetStylingComponent}
            {undoRedoComponent}
            <div>
              {user?.id === resume?.userId ? (
                <Save isMobile={isMobile} />
              ) : (
                <Copy isMobile={isMobile} />
              )}
              <Print handlePrint={handlePrint} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.richTextToolbarContainer}>
      <div className={styles.richTextToolbarWrapper}>
        {fontSizeComponent}
        {lineHeightComponent}
        {fontFamilyComponent}
        {fontColorComponent}
        {highlightColorComponent}
        {backgroundColorComponent}
        {marksComponent}
        {textAlignComponent}
        {listsComponent}
        {indentationComponent}
        {linksComponent}
        {iconsComponent}
        {containersComponent}
        {bordersComponent}
        {gapComponent}
        {addSectionComponent}
        {resetStylingComponent}
        {undoRedoComponent}
      </div>
    </div>
  );
};

export default RichTextToolbar;
