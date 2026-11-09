// * ------------------------------ V
// * API TO FRONT END NORMALIZATION V
// * ------------------------------ V
import { normalizeSlateValue } from "./normalizeSlateValue.js";

import { roundParseFloat } from '../formatters.js';

import { normalizeNumbers } from './normalizeNumbers.js';

// // Only these formatting properties represent independently rounded settings.
// const roundedFormattingKeys = new Set([
//   'fontSize', 'fontSizeOffset', 'lineHeight', 'lineHeightOffset',
//   'marginLeft', 'top', 'right', 'bottom', 'left',
//   'horizontal', 'vertical', 'section', 'subsection', 'field', 'header',
//   'width', 'height',
// ]);

// // Match a complete decimal value, optionally followed by a supported CSS unit.
// const numericFormattingValue = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(rem|px|%)?$/;

// const normalizeFormattingValue = (key, value) => {
//   if (!roundedFormattingKeys.has(key)) return value;

//   if (typeof value === 'number') {
//     return Number.isFinite(value) ? roundParseFloat(value) : value;
//   }

//   if (typeof value !== 'string') return value;

//   const match = value.trim().match(numericFormattingValue);
//   if (!match || !Number.isFinite(Number(match[1]))) return value;

//   const rounded = roundParseFloat(match[1]);
//   return match[2] ? `${rounded}${match[2]}` : rounded;
// };

const deepNormalize = (object, skippedKeys = []) => {
  if (!object || typeof object !== 'object') return {};

  if (Array.isArray(object)) {
    return object.map(value => value && typeof value === 'object'
      ? deepNormalize(value) : value);
  }

  return Object.fromEntries(Object.entries(object).map(([key, value]) => {
    if (skippedKeys.includes(key)) return [key, value];

    return [key, value && typeof value === 'object'
      ? deepNormalize(value)
      : normalizeNumbers(key, value)];
  }));
};

// Width allocation needs coordinated rounding; grid settings need integer rules.
const normalizeLayout = layout => deepNormalize(layout, ['width', 'rowContentWidth', 'grid']);

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

    styling: deepNormalize(apiResume.styling ?? { backgroundColor: 'rgba(255, 255, 255, 1)' }),
    layout: {
      ...normalizeLayout(apiResume.layout),
    },

    createdAt: apiResume.createdAt ?? null,
    updatedAt: apiResume.updatedAt ?? null,

    activeSectionIds: [],
    activeEditorId: null,
    activeEditorSelection: null,
  };

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
      styling: deepNormalize(container.styling),
      layout: normalizeLayout(container.layout),
      position: container.position ?? 0,
      sectionIds: orderedSections.map((section) => section.id),
      pageNumber: 1,
    };

    normalizedResume.containers.allIds.push(container.id);

    orderedSections.forEach((section) => {
      const sectionLayout = normalizeLayout(section.layout);
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
        layout: {
          ...sectionLayout,
          display: 'grid',
          grid: {
            ...sectionLayout.grid,
            columns: sectionLayout.display === 'grid' ? sectionLayout.grid?.columns ?? 1 : 1,
          },
        },
        styling: deepNormalize(section.styling),
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
          layout: normalizeLayout(subsection.layout),
          styling: deepNormalize(subsection.styling),
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
            layout: normalizeLayout(field.layout),
            styling: deepNormalize(field.styling),
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
