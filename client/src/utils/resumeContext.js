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
  const column = section
    ? resume.columns?.byId?.[section.columnId] ?? null
    : null;

  return {
    editorId,
    kind: field ? "field" : section ? "heading" : null,
    field,
    subsection,
    section,
    column,
    styling: {
      resumeStyling: resume.styling,
      columnStyling: column?.styling,
      sectionStyling: section?.styling,
      subsectionStyling: subsection?.styling,
      fieldStyling: field?.styling,
    },
  };
}
