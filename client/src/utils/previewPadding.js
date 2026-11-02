export function previewPadding(layout, preview, target, id) {
  if (!preview || preview.target !== target || preview.id !== id) return layout;
  const updatedLayout = {
    ...layout,
    padding: { ...layout?.padding, [preview.side]: `${preview.value}rem` },
  };
  console.log("UPDATED PREVIEW LAYOUT", updatedLayout);
  return updatedLayout;
}
