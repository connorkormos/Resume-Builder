import { resolveResumeLayout, deriveSectionBoundaries } from './resumeLayout.js';
import { normalizeResumeLayout, previewLayout, resolveSectionPadding } from './sectionSpacing.js';

// Stored border/typography metadata is consumed by the content renderers, not CSS.
function sectionCss(styling = {}) {
  const css = { ...styling };
  delete css.border;
  delete css.fontSizeOffset;
  delete css.lineHeightOffset;
  return css;
}

// Independent of React/Redux. Thumbnails pass their own document; the editor can
// overlay transient widths, section moves, and padding without mutating it.
export function resolveResumePresentation(resume, overrides = {}) {
  const resumeLayout = previewLayout(normalizeResumeLayout(resume.layout), overrides.padding, 'resume', null);
  const layout = resolveResumeLayout({
    containersById: resume.containers.byId,
    orderedContainerIds: resume.containers.allIds,
    rowContentWidth: resumeLayout.rowContentWidth,
    widthOverrides: overrides.widths ?? {},
  });
  const containersById = {};
  const sectionsById = {};
  const containerIds = resume.containers.allIds.filter(id => layout.placementsByContainerId[id]);
  for (const containerId of containerIds) {
    const container = resume.containers.byId[containerId];
    const placement = layout.placementsByContainerId[containerId];
    const sectionIds = (overrides.sectionIds?.[containerId] ?? container.sectionIds ?? [])
      .filter(id => resume.sections.byId[id]);
    containersById[containerId] = {
      sectionIds,
      style: {
        position: 'relative',
        alignSelf: 'stretch',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gridRow: `${placement.rowStart} / span ${placement.rowSpan}`,
        gridColumn: `${placement.columnStart} / span ${placement.columnSpan}`,
      },
    };
    const containerLayout = previewLayout(container.layout, overrides.padding, 'container', containerId);
    sectionIds.forEach((sectionId, index) => {
      const section = resume.sections.byId[sectionId];
      const boundaries = deriveSectionBoundaries(layout.boundariesByContainerId[containerId], sectionIds, sectionId);
      const sectionLayout = previewLayout(section.layout, overrides.padding, 'section', sectionId);
      const padding = resolveSectionPadding({ boundaries, resumeLayout, containerLayout, sectionLayout });
      const hasNextSection = index < sectionIds.length - 1;
      sectionsById[sectionId] = {
        containerId, boundaries, padding, hasNextSection,
        style: {
          ...sectionCss(section.styling),
          ...padding,
          position: 'relative',
          height: 'min-content',
          boxSizing: 'border-box',
          minWidth: 0,
          flex: hasNextSection ? '0 0 auto' : '1 0 auto',
          backgroundColor: section.styling?.backgroundColor ?? resume.styling?.backgroundColor ?? 'transparent'
        },
      };
    });
  }
  return {
    layout, resumeLayout, containerIds, containersById, sectionsById,
    pageStyle: {
      ...resume.styling,
      '--resume-page-padding-top': resumeLayout.padding?.top ?? '0rem',
      display: 'grid',
      gridTemplateColumns: layout.gridTemplateColumns,
      gridTemplateRows: layout.gridTemplateRows,
      gap: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      wordBreak: 'break-word',
    },
  };
}
