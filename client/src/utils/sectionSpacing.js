import { parseRemValue } from './formatters.js';

const GAP_BY_BOUNDARY = {
  containerHorizontal: 'horizontal',
  containerVertical: 'vertical',
  section: 'section',
};

// Missing gap.section identifies legacy data where vertical meant section spacing.
// Persist the explicit section key on the next save; normalization is idempotent.
export function normalizeResumeLayout(layout) {
  layout ??= {};
  const gap = layout.gap ?? {};
  if (gap.section != null) return layout;
  return { ...layout, gap: { ...gap, section: gap.vertical ?? '0.5rem', vertical: '0rem' } };
}

// Keep this unclamped: a section offset can cancel a negative container offset.
export function resolveSectionPaddingBase({ boundary, resumeLayout, containerLayout, side }) {
  const layout = normalizeResumeLayout(resumeLayout);
  const base = boundary === 'page' ? layout.padding?.[side]
    : layout.gap?.[GAP_BY_BOUNDARY[boundary]];
  return parseRemValue(base) + parseRemValue(containerLayout?.padding?.[side]);
}

export function resolveSectionPadding({ boundaries, resumeLayout, containerLayout, sectionLayout }) {
  return Object.fromEntries(['top', 'right', 'bottom', 'left'].map(side => {
    const value = Math.max(
      0,
      resolveSectionPaddingBase({ boundary: boundaries?.[side], resumeLayout, containerLayout, side })
        + parseRemValue(sectionLayout?.padding?.[side]),
    );
    return [`padding${side[0].toUpperCase()}${side.slice(1)}`, `${value}rem`];
  }));
}

export function previewLayout(layout, preview, target, id) {
  if (!preview || preview.target !== target || preview.id !== id) return layout;
  return {
    ...layout,
    padding: { ...layout?.padding, [preview.side]: `${preview.value}rem` },
  };
}
