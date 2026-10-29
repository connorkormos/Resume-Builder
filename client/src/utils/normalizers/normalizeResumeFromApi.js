import { normalizeResumeLayout } from '../sectionSpacing.js';
// * ------------------------------ V
// * API TO FRONT END NORMALIZATION V
// * ------------------------------ V
import { normalizeSlateValue } from "./normalizeSlateValue.js";

import { normalizeSectionLayout } from "./normalizeSectionLayout.js";

const normalizeResumeFromApi = (apiResume) => {
  let normalizedResume = {
    id: apiResume.id ?? null,
    title: apiResume.title ?? '',
    userId: apiResume.userId ?? null,
    tags: [...(apiResume.tags ?? [])],

    containers: {
      byId: {},
      allIds: [],
    },

    sections: {
      byId: {},
      allIds: [],
    },

    subsections: {
      byId: {},
      allIds: [],
    },

    fields: {
      byId: {},
      allIds: [],
    },

    styling: apiResume.styling ?? {backgroundColor: 'rgba(255, 255, 255, 1)'},
    layout: {
      ...apiResume.layout,
      // display: 'grid',

    },
    // layout: normalizeResumeLayout(apiResume.layout),

    createdAt: apiResume.createdAt ?? null,
    updatedAt: apiResume.updatedAt ?? null,

    activeSectionIds: [],
    activeEditorId: null,
    activeEditorSelection: null,
  };

  // normalizedResume.layout = {
  //   ...normalizedResume.layout,
  //   display: 'grid'
  // };

  const orderedContainers = [...(apiResume.containers ?? [])].sort(
    (a, b) => a.position - b.position
  );

  orderedContainers.forEach((container) => {    
    const orderedSections = [...(container.sections ?? [])].sort(
      (a, b) => a.position - b.position
    );

    normalizedResume.containers.byId[container.id] = {
      id: container.id,
      resumeId: container.resumeId,
      type: container.type ?? 'column',
      spanFullPage: container.spanFullPage ?? false,
      styling: container.styling ?? {},
      layout: container.layout ?? {},
      position: container.position ?? 0,
      sectionIds: orderedSections.map((section) => section.id),
      pageNumber: 1,
    };

    normalizedResume.containers.allIds.push(container.id);

    orderedSections.forEach((section) => {
      const orderedSubsections = [...(section.subsections ?? [])].sort(
        (a, b) => a.position - b.position
      );

      normalizedResume.sections.byId[section.id] = {
        id: section.id,
        containerId: section.containerId,
        label: section.label,
        type: section.type,
        position: section.position ?? 0,
        value: normalizeSlateValue(section.value ?? []),
        showHeading: section.showHeading ?? true,
        layout: normalizeSectionLayout(section.layout),
        styling: section.styling ?? {},
        subsectionIds: orderedSubsections.map((subsection) => subsection.id),
        pageNumber: 1,
      };

      normalizedResume.sections.allIds.push(section.id);

      orderedSubsections.forEach((subsection) => {
        const orderedFields = [...(subsection.fields ?? [])].sort(
          (a, b) => a.position - b.position
        );

        normalizedResume.subsections.byId[subsection.id] = {
          id: subsection.id,
          sectionId: subsection.sectionId,
          label: subsection.label ?? '',
          position: subsection.position ?? 0,
          layout: subsection.layout ?? {},
          styling: subsection.styling ?? {},
          fieldIds: orderedFields.map((field) => field.id),
          pageNumber: 1,
        };

        normalizedResume.subsections.allIds.push(subsection.id);

        orderedFields.forEach((field) => {
          normalizedResume.fields.byId[field.id] = {
            id: field.id,
            subsectionId: field.subsectionId,
            label: field.label ?? '',
            position: field.position ?? 0,
            value: normalizeSlateValue(field.value ?? []),
            layout: field.layout ?? {},
            styling: field.styling ?? {},
            pageNumber: 1,
          };

          normalizedResume.fields.allIds.push(field.id);
        });
      });
    });
  });
  
  return normalizedResume;
};

export default normalizeResumeFromApi;
