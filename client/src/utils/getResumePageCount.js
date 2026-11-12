export const getResumePageCount = (resume) => {
  let count = 1;
  const includePage = (pageNumber) => {
    if (Number.isSafeInteger(pageNumber) && pageNumber >= 1) {
      count = Math.max(count, pageNumber);
    }
  };

  for (const container of Object.values(resume.containers.byId)) {
    for (const sectionId of container.sectionIds) {
      const section = resume.sections.byId[sectionId];
      if (!section) continue;
      includePage(section.pageNumber);
      for (const subsectionId of section.subsectionIds) {
        const subsection = resume.subsections.byId[subsectionId];
        if (!subsection) continue;
        includePage(subsection.pageNumber);
        for (const fieldId of subsection.fieldIds) {
          includePage(resume.fields.byId[fieldId]?.pageNumber);
        }
      }
    }
  }
  return count;
};
