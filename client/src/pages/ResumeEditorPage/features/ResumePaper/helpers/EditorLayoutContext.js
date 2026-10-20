import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { PaddingPreviewContext, previewLayout } from './PaddingPreviewContext.js';
import { resolveSectionPadding } from '@/utils/sectionSpacing.js';

// Includes temporary section moves, so rulers and sections agree during dragging.
export const EditorLayoutContext = createContext({});

export function useResolvedSectionSpacing(sectionId) {
  const contexts = useContext(EditorLayoutContext);
  const resume = useSelector(state => state.resume.present);
  const preview = useContext(PaddingPreviewContext)?.preview;
  const section = resume.sections.byId[sectionId];
  const context = contexts[sectionId];
  const container = resume.containers.byId[context?.containerId ?? section?.containerId];
  return resolveSectionPadding({
    boundaries: context?.boundaries,
    resumeLayout: previewLayout(resume.layout, preview, 'resume', null),
    containerLayout: previewLayout(container?.layout, preview, 'container', container?.id),
    sectionLayout: previewLayout(section?.layout, preview, 'section', sectionId),
  });
}
