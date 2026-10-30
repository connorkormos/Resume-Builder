import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume } from '@/store/resumeSlice.js';

const SELECTORS = {
  containers: '[data-container-id]:not([data-section-id])',
  sections: '.resumeSection[data-section-id]',
  subsections: '.resumeSubsection[data-subsection-id]',
  fields: '.resumeField[data-field-id]',
};
const ATTRIBUTES = {
  containers: 'data-container-id',
  sections: 'data-section-id',
  subsections: 'data-subsection-id',
  fields: 'data-field-id',
};
const TOLERANCE = 1; // Fractional CSS-pixel rounding at page boundaries.

// Clone DOM, not React components: no editors, observers, or DnD handlers mount.
function copyElement(source) {
  const copy = source.cloneNode(true);
  for (const element of [copy, ...copy.querySelectorAll('*')]) {
    element.removeAttribute('id');
    element.removeAttribute('contenteditable');
    element.removeAttribute('autofocus');
    if (element.matches('.resumeSection, .resumeSubsection, .resumeField')) {
      element.style.transform = 'none';
      element.style.translate = 'none';
      element.style.transition = 'none';
    }
  }
  copy.querySelectorAll('button, [role="dialog"], [data-section-dnd-exclude]').forEach(node => node.remove());
  // Hover-only subsection drag icons are not resume content.
  copy.querySelectorAll('.resumeSubsection > svg').forEach(node => node.remove());
  return copy;
}

function collectTemplates(pages) {
  const templates = Object.fromEntries(Object.keys(SELECTORS).map(key => [key, new Map()]));
  for (const page of pages) {
    for (const [kind, selector] of Object.entries(SELECTORS)) {
      for (const element of page.querySelectorAll(selector)) {
        const id = element.getAttribute(ATTRIBUTES[kind]);
        if (!templates[kind].has(id)) templates[kind].set(id, element);
      }
    }
  }
  return templates;
}

/**
 * Reassemble complete subsections from all visible page fragments. If React has
 * not mounted every entity yet, postpone the entire calculation (never paginate
 * a partial document). Templates retain the application's CSS and inline styles.
 */
function prepareTemplates(resume, templates) {
  const result = { containers: new Map(), sections: new Map(), subsections: new Map() };
  for (const containerId of resume.containers.allIds) {
    const container = resume.containers.byId[containerId];
    if (!container?.sectionIds.length) continue;
    const source = templates.containers.get(String(containerId));
    if (!source) return null;
    const containerCopy = copyElement(source);
    containerCopy.replaceChildren();
    result.containers.set(containerId, containerCopy);

    for (const sectionId of container.sectionIds) {
      const section = resume.sections.byId[sectionId];
      const sourceSection = templates.sections.get(String(sectionId));
      if (!section || !sourceSection) return null;
      const sectionCopy = copyElement(sourceSection);
      // The first visible fragment may have its bottom padding suppressed.
      // Restore the resolved value before calculating new page assignments.
      sectionCopy.style.paddingBottom = sourceSection.getAttribute('data-pagination-padding-bottom')
        ?? getComputedStyle(sourceSection).paddingBottom;
      sectionCopy.querySelectorAll('.resumeSubsection').forEach(node => node.remove());
      result.sections.set(sectionId, sectionCopy);

      for (const subsectionId of section.subsectionIds) {
        const subsection = resume.subsections.byId[subsectionId];
        const sourceSubsection = templates.subsections.get(String(subsectionId));
        if (!subsection || !sourceSubsection) return null;
        const subsectionCopy = copyElement(sourceSubsection);
        subsectionCopy.replaceChildren();
        for (const fieldId of subsection.fieldIds) {
          const sourceField = templates.fields.get(String(fieldId));
          if (!resume.fields.byId[fieldId] || !sourceField) return null;
          subsectionCopy.append(copyElement(sourceField));
        }
        result.subsections.set(subsectionId, subsectionCopy);
      }
    }
  }
  return result;
}

function calculateAssignments(resume, sourcePage, templates, host) {
  const pages = new Map();
  const assignments = { sections: {}, subsections: {}, fields: {} };
  const oversized = new WeakSet();

  function getPage(number) {
    if (pages.has(number)) return pages.get(number);
    const element = sourcePage.cloneNode(false);
    element.removeAttribute('id');
    Object.assign(element.style, {
      position: 'relative', top: '0', left: '0', margin: '0',
      width: `${sourcePage.offsetWidth}px`, height: `${sourcePage.offsetHeight}px`,
      boxSizing: 'border-box', transform: 'none', translate: 'none', scale: 'none',
      visibility: 'hidden', pointerEvents: 'none',
    });
    const containers = new Map();
    for (const [id, template] of templates.containers) {
      const container = template.cloneNode(false);
      containers.set(id, container);
      element.append(container);
    }
    host.append(element);
    const page = { element, containers, sections: new Map() };
    pages.set(number, page);
    return page;
  }

  function fits(page) {
    const bottom = page.element.getBoundingClientRect().bottom;
    // Include section padding and margins as well as overflowing descendants.
    // Ignore editor decorations and explicitly accepted oversized sections.
    return [...page.sections.values()].every(section => {
      if (oversized.has(section)) return true;
      return [section, ...section.querySelectorAll('.resumeSubsection, .resumeField')].every(element => {
        const margin = parseFloat(getComputedStyle(element).marginBottom) || 0;
        return element.getBoundingClientRect().bottom + margin <= bottom + TOLERANCE;
      });
    });
  }

  function append(number, containerId, sectionId, candidate, completesSection) {
    const page = getPage(number);
    let section = page.sections.get(sectionId);
    const created = !section;
    if (created) {
      section = templates.sections.get(sectionId).cloneNode(true);
      page.containers.get(containerId).append(section);
      page.sections.set(sectionId, section);
    }
    const previousPadding = section.style.paddingBottom;
    section.style.paddingBottom = completesSection
      ? templates.sections.get(sectionId).style.paddingBottom
      : '0px';
    // Section.jsx renders the heading and subsections in this inner wrapper.
    const wrapper = section.querySelector('[data-section-id]') || section;
    if (candidate) wrapper.append(candidate);
    return {
      page, section,
      undo() {
        candidate?.remove();
        section.style.paddingBottom = previousPadding;
        if (created) {
          section.remove();
          page.sections.delete(sectionId);
        }
      },
    };
  }

  function assign(kind, id, page) {
    // A parent belongs on the first page containing its content.
    assignments[kind][id] = Math.min(assignments[kind][id] ?? Infinity, page);
  }

  for (const [containerId] of templates.containers) {
    let number = 1;
    for (const sectionId of resume.containers.byId[containerId].sectionIds) {
      const section = resume.sections.byId[sectionId];
      // A heading-only section still occupies space and needs a page assignment.
      const subsectionIds = section.subsectionIds.length ? section.subsectionIds : [null];
      for (const subsectionId of subsectionIds) {
        const template = subsectionId === null ? null : templates.subsections.get(subsectionId);
        const candidate = template?.cloneNode(true) ?? null;
        const isLastSubsection = subsectionId === subsectionIds[subsectionIds.length - 1];
        let attempt = append(number, containerId, sectionId, candidate, isLastSubsection);
        if (!fits(attempt.page)) {
          attempt.undo();
          // Only advance when this page already contains accepted content.
          if (attempt.page.sections.size) number++;
          attempt = append(number, containerId, sectionId, candidate, isLastSubsection);
        }
        if (fits(attempt.page)) {
          assign('sections', sectionId, number);
          if (subsectionId !== null) {
            assign('subsections', subsectionId, number);
            for (const id of resume.subsections.byId[subsectionId].fieldIds) assign('fields', id, number);
          }
          continue;
        }
        attempt.undo();

        const fieldIds = subsectionId === null ? [] : resume.subsections.byId[subsectionId].fieldIds;
        if (!fieldIds.length) {
          // An oversized heading/empty subsection cannot be split. Keep it once.
          const accepted = append(number, containerId, sectionId, candidate, isLastSubsection);
          oversized.add(accepted.section);
          assign('sections', sectionId, number);
          if (subsectionId !== null) assign('subsections', subsectionId, number);
          number++;
          continue;
        }

        let fragment = null;
        for (let index = 0; index < fieldIds.length; index++) {
          const field = template.children[index].cloneNode(true);
          if (!fragment) fragment = template.cloneNode(false);
          fragment.append(field);
          attempt = append(number, containerId, sectionId, fragment, isLastSubsection && index === fieldIds.length - 1);
          if (!fits(attempt.page)) {
            // Preserve any accepted fields in this subsection on the old page.
            field.remove();
            if (!fragment.children.length) attempt.undo();
            else attempt.section.style.paddingBottom = '0px';
            if (attempt.page.sections.size) number++;
            fragment = template.cloneNode(false);
            fragment.append(field);
            attempt = append(number, containerId, sectionId, fragment, isLastSubsection && index === fieldIds.length - 1);
          }
          assign('sections', sectionId, number);
          assign('subsections', subsectionId, number);
          assign('fields', fieldIds[index], number);
          if (!fits(attempt.page)) {
            // Explicit fallback: an indivisible field may overflow one page.
            // Never create an unbounded sequence of empty pages for that field.
            oversized.add(attempt.section);
            number++;
            fragment = null;
          }
        }
      }
    }
  }
  return assignments;
}

function changedPages(resume, assignments) {
  const patch = {};
  for (const [kind, entities] of Object.entries(assignments)) {
    for (const [id, pageNumber] of Object.entries(entities)) {
      if (resume[kind].byId[id].pageNumber === pageNumber) continue;
      patch[kind] ??= { byId: {} };
      patch[kind].byId[id] = { pageNumber };
    }
  }
  return patch;
}

/**
 * Call at the editor's top level: useResumePagination(editorPageRefMap).
 * Refs are read after commit. Run after every commit because adding/removing
 * entries in a ref Map (including mounting a new page) is not a dependency change.
 * The previous EndPageMarker pagination must remain disabled.
 */
export default function useResumePagination(pageRefMap) {
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.present);

  useLayoutEffect(() => {
    const map = pageRefMap?.current ?? pageRefMap;
    if (!(map instanceof Map)) return;
    const pages = [...map.entries()].sort(([a], [b]) => a - b)
      .map(([, ref]) => ref?.current).filter(element => element?.isConnected);
    if (!pages.length) return;
    let stopped = false;
    let frame = null;

    const measure = () => {
      frame = null;
      if (stopped || !pages[0].offsetWidth || !pages[0].offsetHeight) return;
      const templates = prepareTemplates(resume, collectTemplates(pages));
      if (!templates) return;
      const host = document.createElement('div');
      host.setAttribute('aria-hidden', 'true');
      host.setAttribute('inert', '');
      Object.assign(host.style, {
        position: 'fixed', left: '0', top: '0', width: '0', height: '0',
        overflow: 'hidden', visibility: 'hidden', pointerEvents: 'none',
      });
      // Same ancestry preserves inherited editor styles and CSS variables.
      pages[0].parentElement.append(host);
      let patch;
      try {
        patch = changedPages(resume, calculateAssignments(resume, pages[0], templates, host));
      } finally {
        host.remove();
      }
      if (Object.keys(patch).length) dispatch(updateResume(patch));
    };
    const schedule = () => {
      if (!stopped && frame === null) frame = requestAnimationFrame(measure);
    };
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    const mutations = new MutationObserver(schedule);
    for (const page of pages) {
      resize?.observe(page);
      page.querySelectorAll('.resumeSection, .resumeSubsection, .resumeField').forEach(node => resize?.observe(node));
      mutations.observe(page, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['style', 'class'] });
      page.addEventListener('load', schedule, true);
    }
    window.addEventListener('resize', schedule);
    document.fonts?.addEventListener('loadingdone', schedule);
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      stopped = true;
      if (frame !== null) cancelAnimationFrame(frame);
      resize?.disconnect();
      mutations.disconnect();
      for (const page of pages) page.removeEventListener('load', schedule, true);
      window.removeEventListener('resize', schedule);
      document.fonts?.removeEventListener('loadingdone', schedule);
    };
  });
}
