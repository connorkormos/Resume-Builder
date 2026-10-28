import { resolveResumePresentation } from '@/utils/resumePresentation.js';
import { PaddingPreviewContext } from './helpers/PaddingPreviewContext.js';
import { resizeColumnWidths } from '@/utils/resumeLayout.js';
import { EditorLayoutContext } from './helpers/EditorLayoutContext.js';
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { forwardRef, useEffect, useRef, useState, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";

import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";

import Container from "./Container.jsx";
import EndPageMarker from "./components/EndPageMarker.jsx";
import MarginRuler from "./components/MarginRuler.jsx";

import styles from "./ResumePaper.module.css";
import { dndReorderSections, resizeContainerPair } from "@/store/resumeSlice.js";
import { ActionCreators as UndoActionCreators } from "redux-undo";


const ResumePaper = forwardRef(function ResumePaper(props, ref) {

  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const localEditorRef = useRef(null);
  const editorRef = props.editorPageRef ?? localEditorRef;

  const resume = useSelector(state => state.resume.present);
  const containers = resume.containers;
  const sectionsById = resume.sections.byId;
  const paddingPreview = useContext(PaddingPreviewContext)?.preview;

  const [sectionOrderPreview, setSectionOrderPreview] = useState(null);
  const containerOrder = containers.allIds;
  const storedSectionIds = Object.fromEntries(containerOrder.map(id => [id, containers.byId[id]?.sectionIds ?? []]));
  const containerSectionIds = sectionOrderPreview ?? storedSectionIds;
  const [previewWidths, setPreviewWidths] = useState(null);
  const resizeState = useRef(null);
  const previewWidthsRef = useRef(null);

  const presentation = resolveResumePresentation(resume, {
    sectionIds: containerSectionIds,
    widths: previewWidths,
    padding: paddingPreview,
  });
  const resolvedLayout = presentation.layout;
  const getContainerWidth = (containerId) => resolvedLayout.widthsById[containerId] ?? 0;

  const finishResize = () => {
    const resize = resizeState.current;
    if (!resize) return;

    const widths = previewWidthsRef.current ?? resize.startWidths;
    const leftWidth = widths[resize.leftContainerId];
    const rightWidth = widths[resize.rightContainerId];
    resize.handle.removeEventListener("pointermove", resize.onPointerMove);

    if (leftWidth !== resize.startWidths[resize.leftContainerId]) {
      dispatch(resizeContainerPair({
        leftContainerId: resize.leftContainerId,
        rightContainerId: resize.rightContainerId,
        leftWidth,
        rightWidth,
      }));
    }

    resizeState.current = null;
    previewWidthsRef.current = null;
    setPreviewWidths(null);
  };

  const startResize = (leftContainerId, event) => {
    const rightContainerId = resolvedLayout.resizeNeighborsByContainerId[leftContainerId];
    const pageWidth = editorRef.current?.getBoundingClientRect().width;
    const leftWidth = getContainerWidth(leftContainerId);
    const rightWidth = getContainerWidth(rightContainerId);
    if (!rightContainerId || !pageWidth || !leftWidth || !rightWidth) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const startWidths = { [leftContainerId]: leftWidth, [rightContainerId]: rightWidth };
    const onPointerMove = (moveEvent) => {
      const resize = resizeState.current;
      if (!resize) return;

      const delta = ((moveEvent.clientX - resize.startX) / pageWidth) * 100;
      const resized = resizeColumnWidths(leftWidth, rightWidth, delta);
      const widths = {
        [leftContainerId]: resized.leftWidth,
        [rightContainerId]: resized.rightWidth,
      };
      previewWidthsRef.current = widths;
      setPreviewWidths(widths);
    };

    resizeState.current = {
      leftContainerId,
      rightContainerId,
      startX: event.clientX,
      startWidths,
      handle: event.currentTarget,
      onPointerMove,
    };
    event.currentTarget.addEventListener("pointermove", onPointerMove);
    event.currentTarget.addEventListener("pointerup", finishResize, { once: true });
    event.currentTarget.addEventListener("pointercancel", finishResize, { once: true });
  };

  const resizeWithKeyboard = (leftContainerId, event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const rightContainerId = resolvedLayout.resizeNeighborsByContainerId[leftContainerId];
    const leftWidth = getContainerWidth(leftContainerId);
    const rightWidth = getContainerWidth(rightContainerId);
    const adjustment = event.key === "ArrowRight" ? 1 : -1;
    if (!rightContainerId) return;
    const resized = resizeColumnWidths(leftWidth, rightWidth, adjustment);

    event.preventDefault();
    dispatch(resizeContainerPair({
      leftContainerId,
      rightContainerId,
      ...resized,
    }));
  };

  useEffect(() => {

    const handleKeyDown = (e) => {

      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        dispatch(UndoActionCreators.undo());
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        dispatch(UndoActionCreators.redo());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const resumeContainers = presentation.containerIds.map((containerId) => {
    const container = containers.byId[containerId];

    if (!container) {
      console.error(`Container with ID ${containerId} not found.`);
      return null;
    }

    return (
      <Container
        key={container.id}
        container={container}
        presentation={presentation.containersById[containerId]}
        sectionPresentations={presentation.sectionsById}
        sectionById={sectionsById}
        onStartResize={startResize}
        containerPreviewWidths={previewWidths}
        rightContainerId={resolvedLayout.resizeNeighborsByContainerId[containerId]}
        resizeTrackId={resolvedLayout.resizeTrackByContainerId[containerId]}
        onResizeWithKeyboard={resizeWithKeyboard}
      />
    );
  });


  return (
    <EditorLayoutContext.Provider value={presentation.sectionsById}>
    <div className={styles.printPageRef} ref={ref}>
      {resolvedLayout.errors.length > 0 && <p role="alert">{resolvedLayout.errors.join(" ")}</p>}
      {!isMobile && <MarginRuler pageRef={editorRef} />}
      <div
        className={styles.editingPageContainer}
        style={presentation.pageStyle}
        ref={editorRef}
        id="editorPage"
      >
        <DragDropProvider
          onDragOver={(event) => {
            const { source } = event.operation;

            if (source?.type === "container") return;

            setSectionOrderPreview((currentItems) => move(currentItems ?? storedSectionIds, event));
          }}
          onDragEnd={(event) => {
            const { source } = event.operation;

            if (event.canceled) {
              if (source?.type === "section") {
                setSectionOrderPreview(null);
              }

              return;
            }

            if (source?.type === "container") return;
            dispatch(dndReorderSections({ dndKitDict: containerSectionIds }));
            setSectionOrderPreview(null);
          }}
        >
          {resumeContainers}
        </DragDropProvider>
        <EndPageMarker pageRef={editorRef} />
      </div>
    </div>
    </EditorLayoutContext.Provider>
  );
});

export default ResumePaper;
