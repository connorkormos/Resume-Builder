import { useLayoutEffect, useState } from 'react';

const dimensions = ['height', 'width', 'top', 'bottom', 'left', 'right'];

// Viewport-relative bounds, or null before the element is mounted.
// Tracks resizing and scrolling, not arbitrary position-only animations.
export function useElementRect(ref) {
   const [rect, setRect] = useState(null);

   // Reconnect after renders so a replaced ref.current is picked up too.
   // Measurements return the previous state when unchanged, preventing a loop.
   // eslint-disable-next-line react-hooks/exhaustive-deps
   useLayoutEffect(() => {
      const element = ref.current;
      if (!element) {
         // Clear stale bounds before paint when the element is removed.
         setRect(previous => previous === null ? previous : null);
         return;
      }

      let frame;
      const measure = () => {
         const bounds = element.getBoundingClientRect();
         const next = Object.fromEntries(dimensions.map(key => [key, bounds[key]]));
         setRect(previous => (
            previous && dimensions.every(key => previous[key] === next[key])
               ? previous
               : next
         ));
      };
      const scheduleMeasure = () => {
         cancelAnimationFrame(frame);
         frame = requestAnimationFrame(measure);
      };

      measure();
      const observer = new ResizeObserver(scheduleMeasure);
      observer.observe(element, { box: 'border-box' });
      window.addEventListener('resize', scheduleMeasure);
      // Capture scroll events from nested scrolling containers as well.
      window.addEventListener('scroll', scheduleMeasure, true);

      return () => {
         observer.disconnect();
         window.removeEventListener('resize', scheduleMeasure);
         window.removeEventListener('scroll', scheduleMeasure, true);
         cancelAnimationFrame(frame);
      };
   });

   return rect;
}
