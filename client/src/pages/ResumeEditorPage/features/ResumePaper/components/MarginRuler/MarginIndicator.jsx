import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateResume, updateContainer, updateSection } from "@/store/resumeSlice";
import { PaddingPreviewContext } from "@/context/PaddingPreviewContext";
import { parseRemValue, roundMathMax } from "@/utils/formatters";

export default function MarginIndicator({
  target,
  id = null,
  side,
  value,
  pageRef,
  onLabelShow,
  onLabelHide,
  onLabelFlash,
  ...props
}) {
  const dispatch = useDispatch();
  const reduxResume = useSelector((state) => state.resume.present);
  const resumePadding = reduxResume.layout.padding;

  const { setPreview } = useContext(PaddingPreviewContext);
  const drag = useRef(null);
  const hovered = useRef(false);
  const horizontal = side === "left" || side === "right";
  // Offsets may be negative without a per-level clamp; sections clamp the final sum.
  const minimumPadding = target === 'resume' ? 0 : -Infinity;
  // Section bottom handles grow the section down; page bottom moves inward.
  const direction =
    side === "right" || (side === "bottom" && target === "resume") ? -1 : 1;
  const commit = (next, startValue = parseRemValue(value)) => {
    const rounded = roundMathMax(minimumPadding, next);
    if (rounded === roundMathMax(minimumPadding, startValue)) return false;
    const padding = { [side]: `${rounded}rem` };
    dispatch(
      target === "resume"
        ? updateResume({
          layout: { padding: { ...resumePadding, ...padding } },
        })
        : (target === "container" ? updateContainer : updateSection)({
          id,
          layout: { padding }
        }),
    );
    return true;
  };
  useEffect(
    () => () => {
      if (drag.current) {
        drag.current = null;
        setPreview(null);
      }
    },
    [setPreview],
  );

  const nextValue = (event) =>
    roundMathMax(
      minimumPadding,
      drag.current.startValue +
      (direction *
        ((horizontal ? event.clientX : event.clientY) - drag.current.start)) /
      drag.current.pixelsPerRem,
    );
  const finish = (event, canceled = false) => {
    if (!drag.current || event.pointerId !== drag.current.pointerId) return;
    if (!canceled) {
      commit(nextValue(event), drag.current.startValue);
    }
    drag.current = null;
    if (!hovered.current) onLabelHide?.();
    setPreview(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };
  return (
    <button
      {...props}
      type="button"
      aria-label={`Adjust ${target === "resume" ? "page" : target} ${side} padding`}
      title={`Drag to adjust ${side} padding, or use arrow keys`}
      onClick={(event) => event.stopPropagation()}
      onMouseEnter={() => {
        hovered.current = true;
        onLabelShow?.();
      }}
      onMouseLeave={() => {
        hovered.current = false;
        if (!drag.current) onLabelHide?.();
      }}
      onPointerDown={(event) => {
        event.stopPropagation();
        if (event.button !== 0 || drag.current) return;
        event.preventDefault();
        const page = pageRef.current;
        if (!page) return;
        // Rulers can remain unscaled while the paper preview is zoomed.
        const ruler = event.currentTarget.parentElement;
        const rect = ruler.getBoundingClientRect();
        const scale = horizontal
          ? rect.width / ruler.offsetWidth
          : rect.height / ruler.offsetHeight;
        const pixelsPerRem =
          scale *
          parseFloat(getComputedStyle(document.documentElement).fontSize);
        if (!(pixelsPerRem > 0)) return;
        event.currentTarget.focus();
        drag.current = {
          startValue: parseRemValue(value),
          start: horizontal ? event.clientX : event.clientY,
          pixelsPerRem,
          pointerId: event.pointerId,
        };
        onLabelShow?.();
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (drag.current && event.pointerId === drag.current.pointerId) {
          setPreview({ target, id, side, value: nextValue(event) });
        }
      }}
      onPointerUp={(event) => finish(event)}
      onPointerCancel={(event) => finish(event, true)}
      onLostPointerCapture={(event) => finish(event, true)}
      onKeyDown={(event) => {
        const keys = horizontal
          ? ["ArrowLeft", "ArrowRight"]
          : ["ArrowUp", "ArrowDown"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        if (drag.current) return;
        const current = parseRemValue(value);
        const next = current + direction * (event.key === keys[1] ? 0.1 : -0.1);
        if (commit(next)) {
          if (hovered.current) onLabelShow?.();
          else onLabelFlash?.();
        }
      }}
    />
  );
}
