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
    layout: normalizeResumeLayout(apiResume.layout),

    createdAt: apiResume.createdAt ?? null,
    updatedAt: apiResume.updatedAt ?? null,

    activeSectionIds: [],
    activeEditorId: null,
    activeEditorSelection: null,
  };

  const sortedContainers = [...(apiResume.containers ?? [])].sort(
    (a, b) => a.position - b.position
  );

  sortedContainers.forEach((container) => {    
    const sortedSections = [...(container.sections ?? [])].sort(
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
      sectionIds: sortedSections.map((section) => section.id),
    };

    normalizedResume.containers.allIds.push(container.id);

    sortedSections.forEach((section) => {
      const sortedSubsections = [...(section.subsections ?? [])].sort(
        (a, b) => a.position - b.position
      );

      normalizedResume.sections.byId[section.id] = {
        id: section.id,
        containerId: section.containerId,
        label: section.label ?? '',
        type: section.type ?? 'defaultSection',
        position: section.position ?? 0,
        value: normalizeSlateValue(section.value ?? []),
        showHeading: section.showHeading ?? true,
        layout: normalizeSectionLayout(section.layout),
        styling: section.styling ?? {},
        subsectionIds: sortedSubsections.map((subsection) => subsection.id),
      };

      normalizedResume.sections.allIds.push(section.id);

      sortedSubsections.forEach((subsection) => {
        const sortedFields = [...(subsection.fields ?? [])].sort(
          (a, b) => a.position - b.position
        );

        normalizedResume.subsections.byId[subsection.id] = {
          id: subsection.id,
          sectionId: subsection.sectionId,
          label: subsection.label ?? '',
          position: subsection.position ?? 0,
          layout: subsection.layout ?? {},
          styling: subsection.styling ?? {},
          fieldIds: sortedFields.map((field) => field.id),
        };

        normalizedResume.subsections.allIds.push(subsection.id);

        sortedFields.forEach((field) => {
          normalizedResume.fields.byId[field.id] = {
            id: field.id,
            subsectionId: field.subsectionId,
            label: field.label ?? '',
            position: field.position ?? 0,
            value: normalizeSlateValue(field.value ?? []),
            layout: field.layout ?? {},
            styling: field.styling ?? {},
          };

          normalizedResume.fields.allIds.push(field.id);
        });
      });
    });
  });
  
  return normalizedResume;
};

export default normalizeResumeFromApi;
