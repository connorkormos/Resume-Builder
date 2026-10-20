import { normalizeResumeLayout } from '@/utils/sectionSpacing.js';
import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "@/store/resumeSlice.js";
import { parseRemValue } from "@/utils/formatters.js";
import { PaddingPreviewContext } from "./PaddingPreviewContext";

export default function useSectionPaddingResize(section, container, orderedSectionIds = container.sectionIds) {
  const dispatch = useDispatch();
  const sectionGap = useSelector((state) => normalizeResumeLayout(state.resume.present.layout).gap.section);
  const activeIds = useSelector((state) => state.resume.present.activeSectionIds);
  const nextId = orderedSectionIds[orderedSectionIds.indexOf(section.id) + 1];
  const nextSection = useSelector((state) => state.resume.present.sections.byId[nextId]);
  const lowerIsSelected = !!nextSection && activeIds.length === 1 && activeIds[0] === nextId;

  const { setPreview } = useContext(PaddingPreviewContext);
  const dragRef = useRef(null);

  useEffect(() => () => {
    if (dragRef.current) setPreview(null);
    dragRef.current = null;
  }, [setPreview]);

  // Capture selection and effective padding once, before the drag starts.
  const startValues = () => {
    const side = lowerIsSelected ? 'top' : 'bottom';
    const minimumPadding = -parseRemValue(sectionGap) - parseRemValue(container.layout?.padding?.[side]);
    return {
      id: lowerIsSelected ? nextId : section.id,
      side,
      direction: lowerIsSelected ? -1 : 1,
      startValue: Math.max(minimumPadding, parseRemValue(lowerIsSelected
        ? nextSection.layout?.padding?.top
        : section.layout?.padding?.bottom)),
      minimumPadding,
    };
  };
  const valueAtDelta = (delta, drag) => Math.max(
    drag.minimumPadding, drag.startValue + drag.direction * delta,
  );
  const valueAtPointer = (event, drag) => valueAtDelta(
    (event.clientY - drag.startY) / drag.pixelsPerRem, drag,
  );
  const commit = (value, drag) => {
    if (value === drag.startValue) return;
    dispatch(updateSection({
      id: drag.id,
      layout: {
        padding: {
          [drag.side]: `${value}rem`
        }
      },
    }));
  };
  const finish = (event, canceled = false) => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) return;
    dragRef.current = null;
    if (!canceled) commit(valueAtPointer(event, drag), drag);
    setPreview(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return {
    handleProps: {
      "aria-label": lowerIsSelected ? "Adjust lower section top padding" : "Adjust section bottom padding",
      title: lowerIsSelected ? "Drag to adjust top padding, or use arrow keys" : "Drag to adjust bottom padding, or use arrow keys",
      onClick: (event) => event.stopPropagation(),
      onPointerDown: (event) => {
        event.stopPropagation();
        if (event.button !== 0 || dragRef.current) return;
        event.preventDefault();
        const page = event.currentTarget.closest('#editorPage');
        if (!page) return;
        const scale = page.getBoundingClientRect().height / page.offsetHeight;
        const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        if (!(scale > 0) || !(remSize > 0)) return;
        dragRef.current = {
          ...startValues(),
          pointerId: event.pointerId,
          startY: event.clientY,
          pixelsPerRem: scale * remSize,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      onPointerMove: (event) => {
        const drag = dragRef.current;
        if (!drag || event.pointerId !== drag.pointerId) return;
        setPreview({
          target: 'section', id: drag.id, side: drag.side, value: valueAtPointer(event, drag),
        });
      },
      onPointerUp: (event) => finish(event),
      onPointerCancel: (event) => finish(event, true),
      onLostPointerCapture: (event) => finish(event, true),
      onKeyDown: (event) => {
        event.stopPropagation();
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
        event.preventDefault();
        if (dragRef.current) return;
        const drag = startValues();
        const delta = event.key === "ArrowDown" ? 0.1 : -0.1;
        commit(Math.max(drag.minimumPadding, Math.round(valueAtDelta(delta, drag) * 1000) / 1000), drag);
      },
    },
  };
}
