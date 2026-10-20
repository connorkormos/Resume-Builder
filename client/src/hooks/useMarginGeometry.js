import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Measure indicator offsets in pixels relative to the page.
export default function useMarginGeometry(pageRef, containerId, sectionId) {
   // Recalculate when Redux container data changes.
   const containers = useSelector(state => state.resume.present.containers);
   const [geometry, setGeometry] = useState(null);
   // Observe layout after React updates the DOM.
   useLayoutEffect(() => {
      const page = pageRef.current;
      if (!page) return;
      let frame;
      const measure = () => {
         // Find the selected container and outer section element.
         const container = Array.from(page.children).find(
            element => element.id === String(containerId),
         );
         const section = container && Array.from(container.children).find(
            element => element.dataset.sectionId === String(sectionId),
         );
         let next = null;
         if (container && section) {
            // Convert viewport coordinates to page offsets.
            const pageRect = page.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            const scaleX = pageRect.width / page.offsetWidth || 1;
            const scaleY = pageRect.height / page.offsetHeight || 1;
            next = {
               containerId,
               sectionId,
               left: (containerRect.left - pageRect.left) / scaleX,
               right: (containerRect.right - pageRect.left) / scaleX,
               top: (sectionRect.top - pageRect.top) / scaleY,
               bottom: (sectionRect.bottom - pageRect.top) / scaleY,
            };
         }
         // Skip state updates when positions are unchanged.
         setGeometry(previous => (
            JSON.stringify(previous) === JSON.stringify(next) ? previous : next
         ));
      };
      // Batch measurements into the next animation frame.
      const scheduleMeasure = () => {
         cancelAnimationFrame(frame);
         frame = requestAnimationFrame(measure);
      };
      // Track size changes across the page, containers, and sections.
      const resizeObserver = new ResizeObserver(scheduleMeasure);
      const observeLayout = () => {
         resizeObserver.disconnect();
         resizeObserver.observe(page);
         for (const container of page.children) {
            resizeObserver.observe(container);
            for (const section of container.children) resizeObserver.observe(section);
         }
      };
      // Refresh observers when DOM content or styles change.
      const mutationObserver = new MutationObserver(() => {
         observeLayout();
         scheduleMeasure();
      });
      mutationObserver.observe(page, {
         childList: true,
         subtree: true,
         attributes: true,
         characterData: true,
      });
      // Start observation and take the initial measurement.
      observeLayout();
      scheduleMeasure();

      // Release observers and pending work on cleanup.
      return () => {
         cancelAnimationFrame(frame);
         resizeObserver.disconnect();
         mutationObserver.disconnect();
      };
   }, [pageRef, containers, containerId, sectionId]);
   // Hide old measurements while a new selection is being measured.
   return geometry?.containerId === containerId && geometry?.sectionId === sectionId
      ? geometry
      : null;
}
