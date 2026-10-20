import { useMediaQuery } from "@/hooks/useMediaQuery";
import React, { forwardRef, useEffect, useRef, useState } from "react";

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

  const containers = useSelector((state) => state.resume.present.containers);
  const sectionsById = useSelector((state) => state.resume.present.sections.byId);

  const [containerSectionIds, setContainerSectionIds] = useState({});
  const previousContainerSectionIds = useRef({});
  const [containerOrder, setContainerOrder] = useState([]);
  const [previewWidths, setPreviewWidths] = useState(null);
  const resizeState = useRef(null);
  const previewWidthsRef = useRef(null);

  const getContainerWidth = (containerId) =>
    parseFloat(containers.byId[containerId]?.layout?.width?.value) || 0;

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
    const leftIndex = containerOrder.indexOf(leftContainerId);
    const rightContainerId = containerOrder[leftIndex + 1];
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

      const pairWidth = leftWidth + rightWidth;
      const delta = ((moveEvent.clientX - resize.startX) / pageWidth) * 100;
      const nextLeftWidth = Math.min(Math.max(leftWidth + delta, 10), pairWidth - 10);
      const widths = {
        [leftContainerId]: nextLeftWidth,
        [rightContainerId]: pairWidth - nextLeftWidth,
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
    const leftIndex = containerOrder.indexOf(leftContainerId);
    const rightContainerId = containerOrder[leftIndex + 1];
    const leftWidth = getContainerWidth(leftContainerId);
    const rightWidth = getContainerWidth(rightContainerId);
    const adjustment = event.key === "ArrowRight" ? 1 : -1;
    const nextLeftWidth = leftWidth + adjustment;
    if (!rightContainerId || nextLeftWidth < 10 || rightWidth - adjustment < 10) return;

    event.preventDefault();
    dispatch(resizeContainerPair({
      leftContainerId,
      rightContainerId,
      leftWidth: nextLeftWidth,
      rightWidth: rightWidth - adjustment,
    }));
  };

  const gridTemplateColumns = containerOrder.map((containerId) => {
    const container = containers.byId[containerId];
    if (container.spanFullPage) return null;
    const width = containers.byId[containerId]?.layout?.width;
    const preview = previewWidths?.[containerId];

    const trackSize =
      preview != null
        ? `${preview}%`
        : width?.auto || !width?.value
          ? "1fr"
          : width.value;

    return `minmax(0, ${trackSize})`;
  }).join(" ");

  const gridTemplateRows = "repeat(auto-fill, minmax(0, auto))";

  const reduxResumeStyling = useSelector((state) => state.resume.present.styling);
  const resumeStyling = {
    ...reduxResumeStyling,
    display: 'grid',
    gridTemplateColumns: gridTemplateColumns,
    gridTemplateRows: gridTemplateRows,

  };

  useEffect(() => {
    const pressedKeys = new Set();

    const handleKeyDown = (e) => {

      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        console.log("Shortcut triggered: Ctrl + Z");
        dispatch(UndoActionCreators.undo());
      }
      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        console.log("Shortcut triggered: Ctrl + Y");
        dispatch(UndoActionCreators.redo());
      }
    };

    const handleKeyUp = (e) => {
      pressedKeys.delete(e.code);
    };

    const handleBlur = () => {
      pressedKeys.clear();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    const nextItems = {};

    containers.allIds.forEach((containerId) => {
      const container = containers.byId[containerId];
      nextItems[containerId] = Array.isArray(container?.sectionIds)
        ? [...container.sectionIds]
        : [];
    });

    setContainerSectionIds(nextItems);
    setContainerOrder([...containers.allIds]);
  }, [containers]);

  const resumeContainers = containerOrder.map((containerId, index) => {
    const container = containers.byId[containerId];

    if (!container) {
      console.error(`Container with ID ${containerId} not found.`);
      return null;
    }

    return (
      <Container
        key={container.id}
        container={container}
        sectionIds={containerSectionIds[container.id] ?? []}
        sectionById={sectionsById}
        previewWidth={previewWidths?.[container.id]}
        onStartResize={startResize}
        containerPreviewWidths={previewWidths}
        rightContainerId={containerOrder[index + 1]}
        onResizeWithKeyboard={resizeWithKeyboard}
      />
    );
  });


  return (
    <div className={styles.printPageRef} ref={ref}

    //  style={{ scale: Math.min(1, window.innerWidth / parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--width-editor-page'))) }}
    >
      {!isMobile && <MarginRuler pageRef={editorRef} />}
      <div
        className={`${props.isPrinting ? styles.printingPageContainer : styles.editingPageContainer}`}
        style={{ ...resumeStyling }}
        ref={editorRef}
        id="editorPage"
      >
        <DragDropProvider
          onDragStart={() => {
            previousContainerSectionIds.current = containerSectionIds;
          }}
          onDragOver={(event) => {
            const { source } = event.operation;

            if (source?.type === "container") return;

            setContainerSectionIds((currentItems) => move(currentItems, event));
          }}
          onDragEnd={(event) => {
            const { source } = event.operation;

            if (event.canceled) {
              if (source?.type === "section") {
                setContainerSectionIds(previousContainerSectionIds.current);
              }

              return;
            }

            if (source?.type === "container") {
              setContainerOrder((currentContainerOrder) =>
                move(currentContainerOrder, event),
              );
            }
            dispatch(dndReorderSections({ dndKitDict: containerSectionIds }));
          }}
        >
          {resumeContainers}
        </DragDropProvider>
        <EndPageMarker pageRef={editorRef} />
      </div>
    </div>
  );
});

export default ResumePaper;
