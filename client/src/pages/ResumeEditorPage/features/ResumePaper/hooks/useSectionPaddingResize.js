import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "@/store/resumeSlice.js";
import { parseRemValue, roundMathMax } from "@/utils/formatters.js";
import { PaddingPreviewContext } from "@/context/PaddingPreviewContext";


const GAP_BY_BOUNDARY = {
  containerHorizontal: 'horizontal',
  containerVertical: 'vertical',
  section: 'section',
};

// Keep this unclamped: a section offset can cancel a negative container offset.
export function resolveSectionPaddingBase({ boundary, resumeLayout, containerLayout, side }) {
  const base = boundary === 'page' ? resumeLayout.padding?.[side]
    : resumeLayout.gap?.[GAP_BY_BOUNDARY[boundary]];
  return parseRemValue(base) + parseRemValue(containerLayout?.padding?.[side]);
}

export function resolveSectionPadding({ boundaries, resumeLayout, containerLayout, sectionLayout }) {
  return Object.fromEntries(['top', 'right', 'bottom', 'left'].map(side => {
    const value = roundMathMax(
      0,
      resolveSectionPaddingBase({ boundary: boundaries?.[side], resumeLayout, containerLayout, side })
        + parseRemValue(sectionLayout?.padding?.[side]),
    );
    return [`padding${side[0].toUpperCase()}${side.slice(1)}`, `${value}rem`];
  }));
}


export default function useSectionPaddingResize(
  section, container, orderedSectionIds = container.sectionIds,
  { edge = 'bottom', boundaries } = {},
) {
  const dispatch = useDispatch();
  const resumeLayout = useSelector((state) => state.resume.present.layout);
  const activeIds = useSelector((state) => state.resume.present.activeSectionIds);
  const nextId = orderedSectionIds[orderedSectionIds.indexOf(section.id) + 1];
  const nextSection = useSelector((state) => state.resume.present.sections.byId[nextId]);
  const lowerIsSelected = edge === 'bottom' && !!nextSection && activeIds.length === 1 && activeIds[0] === nextId;

  const { preview, setPreview } = useContext(PaddingPreviewContext);
  const dragRef = useRef(null);

  useEffect(() => () => {
    if (dragRef.current) setPreview(null);
    dragRef.current = null;
  }, [setPreview]);

  const paddingBase = (side, isLowerSection = false) => resolveSectionPaddingBase({
    boundary: isLowerSection ? 'section' : boundaries?.[side] ?? 'section',
    resumeLayout,
    containerLayout: container.layout,
    side,
  });

  // Capture selection and effective padding once, before the drag starts.
  const startValues = () => {
    const side = lowerIsSelected ? 'top' : edge;
    const minimum = -paddingBase(side, lowerIsSelected);
    const roundedMinimum = roundMathMax(minimum);
    // Round fractional legacy bounds upward, ignoring floating-point sum noise.
    const minimumPadding = roundedMinimum < minimum - 1e-10
      ? roundMathMax(roundedMinimum + 0.01) : roundedMinimum;
    return {
      id: lowerIsSelected ? nextId : section.id,
      side,
      direction: side === 'top' ? -1 : 1,
      startValue: Math.max(minimumPadding, parseRemValue(lowerIsSelected
        ? nextSection.layout?.padding?.top
        : section.layout?.padding?.[side])),
      minimumPadding,
    };
  };
  const valueAtDelta = (delta, drag) => roundMathMax(
    drag.minimumPadding, drag.startValue + drag.direction * delta,
  );
  const valueAtPointer = (event, drag) => valueAtDelta(
    (event.clientY - drag.startY) / drag.pixelsPerRem, drag,
  );
  const commit = (value, drag) => {
    const rounded = roundMathMax(drag.minimumPadding, value);
    if (rounded === roundMathMax(drag.minimumPadding, drag.startValue)) return;
    dispatch(updateSection({
      id: drag.id,
      layout: {
        padding: {
          [drag.side]: `${rounded}rem`
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

  // The bottom handle owns the following section's top edge when selected.
  // Match both possible targets so selection changes cannot hide a live drag.
  const showsPreview = preview?.target === 'section' && (
    (preview.id === section.id && preview.side === edge)
    || (edge === 'bottom' && preview.id === nextId && preview.side === 'top')
  );
  const paddingLabel = showsPreview
    ? `${preview.side === 'top' ? 'Top' : 'Bottom'} padding: ${roundMathMax(
      0, paddingBase(preview.side, preview.id === nextId) + preview.value,
    )}rem`
    : null;
  const side = lowerIsSelected ? 'top' : edge;

  return {
    paddingLabel,
    handleProps: {
      "aria-label": lowerIsSelected ? "Adjust lower section top padding" : `Adjust section ${side} padding`,
      title: `Drag to adjust ${side} padding, or use arrow keys`,
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
        const drag = dragRef.current;
        setPreview({ target: 'section', id: drag.id, side: drag.side, value: valueAtDelta(0, drag) });
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
        commit(valueAtDelta(delta, drag), drag);
      },
    },
  };
}
