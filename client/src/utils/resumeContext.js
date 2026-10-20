// Resolve a text editor's real ancestry, independently of selected sections.
// Return existing entities by reference; missing ancestors stay absent.
export function resolveEditorContext(resume, editorId) {
  const field = editorId == null ? null : resume.fields?.byId?.[editorId] ?? null;
  const subsection = field
    ? resume.subsections?.byId?.[field.subsectionId] ?? null
    : null;
  const sectionId = field ? subsection?.sectionId : editorId;
  const section = sectionId == null
    ? null
    : resume.sections?.byId?.[sectionId] ?? null;
  const container = section
    ? resume.containers?.byId?.[section.containerId] ?? null
    : null;

  return {
    editorId,
    kind: field ? "field" : section ? "heading" : null,
    field,
    subsection,
    section,
    container,
    styling: {
      resumeStyling: resume.styling,
      containerStyling: container?.styling,
      sectionStyling: section?.styling,
      subsectionStyling: subsection?.styling,
      fieldStyling: field?.styling,
    },
  };
}


export const getResumeContext = (resume, type, id) => {
  if (!resume) return null;
  if (resume.present) resume = resume.present;
  // console.group('getResumeContext')
  // console.log('resume', resume)
  // console.log('type', type)
  // console.log('id', id)
  // console.log('attribute', attribute)
  // console.groupEnd()

  const containers = resume.containers ?? {};
  const sections = resume.sections ?? {};
  const subsections = resume.subsections ?? {};
  const fields = resume.fields ?? {};

  let container = null;
  let section = null;
  let subsection = null;
  let field = null;

  switch (type) {

    case "container":
      container = containers.byId?.[id] ?? null;
      if (!container) return null;
      return {
        resume,
        container,
      };

    case "section":
      section = sections.byId?.[id] ?? null;
      container = containers.byId?.[section?.containerId] ?? null;
      if (!section ||!container) return null;

      return {
        resume,
        container,
        section,
      };

    case "subsection":
      subsection = subsections.byId?.[id] ?? null;
      if (!subsection) return null;
      section = sections.byId?.[subsection.sectionId] ?? null;
      container = section ? containers.byId?.[section.containerId] ?? null : null;
      return {
        resume,
        container,
        section,
        subsection,
      };

    case "field":
      field = fields.byId?.[id] ?? null;
      if (!field) return null;
      subsection = subsections.byId?.[field.subsectionId] ?? null;
      section = subsection ? sections.byId?.[subsection.sectionId] ?? null : null;
      container = section ? containers.byId?.[section.containerId] ?? null : null;
      return {
        resume,
        container,
        section,
        subsection,
        field,
      };

    default:
      return null;
  }
}