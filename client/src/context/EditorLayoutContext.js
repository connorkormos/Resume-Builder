import { createContext, useContext } from 'react';

// The editor supplies the shared presentation, including transient drag changes.
export const EditorLayoutContext = createContext({});
const NO_PADDING = {};

export function useResolvedSectionSpacing(sectionId) {
  return useContext(EditorLayoutContext)[sectionId]?.padding ?? NO_PADDING;
}
