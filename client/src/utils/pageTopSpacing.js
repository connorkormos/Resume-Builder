// Work from laid-out containers: empty grid rows may collapse, and a header
// may sit above some columns but not a full-height sidebar. The section wrapper
// owns the inset even when it contains only a continued subsection/field.
export function applyPageTopSpacing(page, pageNumber) {
  const top = page.getBoundingClientRect().top;
  const candidates = new Set();
  if (pageNumber > 1) {
    for (const container of page.querySelectorAll('[data-container-id]:not([data-section-id])')) {
      if (Math.abs(container.getBoundingClientRect().top - top) > 1) continue;
      const first = container.querySelector('.resumeSection');
      if (first) candidates.add(first);
    }
  }
  for (const section of page.querySelectorAll('.resumeSection')) {
    section.toggleAttribute('data-pagination-page-top', candidates.has(section));
  }
}
