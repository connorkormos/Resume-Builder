// Reserved track identifier; never inserted into the container entities.
export const ROW_CONTENT_TRACK = '__row_content__';

// Layout is derived from ordered entities; CSS and spacing consume this same result.
export function resolveColumnWidths(containersById, columnIds, overrides = {}) {
  const widths = {};
  const automatic = [];
  let fixed = 0;
  for (const id of columnIds) {
    const width = containersById[id]?.layout?.width;
    const parsed = Number.parseFloat(overrides[id] ?? width?.value);
    const value = Number.isFinite(parsed) ? parsed : 0;
    if (overrides[id] == null && (width?.auto || !(value > 0))) {
      automatic.push(id);
    } else {
      widths[id] = value > 0 ? value : 1;
      fixed += widths[id];
    }
  }
  const share = fixed < 100
    ? (100 - fixed) / Math.max(1, automatic.length)
    : 100 / Math.max(1, columnIds.length);
  for (const id of automatic) widths[id] = share;
  const total = Object.values(widths).reduce((sum, width) => sum + width, 0);
  for (const id of columnIds) widths[id] = widths[id] / total * 100;
  return widths;
}

function arrangeContainers(containersById, orderedContainerIds) {
  const ids = [...new Set(orderedContainerIds)].filter(id => containersById[id]);
  const columnIds = ids.filter(id => containersById[id].type !== 'row');
  const rowIds = ids.filter(id => containersById[id].type === 'row');
  const errors = [];
  let first = 0;
  let last = columnIds.length - 1;
  while (first <= last && containersById[columnIds[first]].spanFullPage) first++;
  while (last >= first && containersById[columnIds[last]].spanFullPage) last--;
  const bodyIds = columnIds.slice(first, last + 1);
  const hasRowContentTrack = rowIds.length > 0 && bodyIds.length === 0;
  if (hasRowContentTrack) {
    const firstRowIndex = ids.indexOf(rowIds[0]);
    const lastRowIndex = ids.indexOf(rowIds.at(-1));
    first = columnIds.filter(id => ids.indexOf(id) < firstRowIndex).length;
    if (ids.slice(firstRowIndex, lastRowIndex).some(id => containersById[id].type !== 'row')) {
      errors.push('Keep rows together between full-height side columns.');
    }
  }
  const trackIds = [...columnIds];
  if (hasRowContentTrack) trackIds.splice(first, 0, ROW_CONTENT_TRACK);
  if (bodyIds.some(id => containersById[id].spanFullPage)) {
    errors.push('Full-height columns must be at the outside edges.');
  }
  const bodyStart = ids.indexOf(bodyIds[0]);
  const bodyEnd = ids.indexOf(bodyIds.at(-1));
  if (bodyStart >= 0 && ids.slice(bodyStart, bodyEnd).some(id => containersById[id].type === 'row')) {
    errors.push('Keep ordinary columns together; intervening rows are shown below the column group.');
  }
  const before = rowIds.filter(id => bodyStart < 0 || ids.indexOf(id) < bodyStart);
  const after = rowIds.filter(id => !before.includes(id));
  const rows = [...before.map(id => [id]), ...(bodyIds.length ? [bodyIds] : []), ...after.map(id => [id])];
  if (!rows.length) rows.push([]);
  return {
    ids, columnIds, trackIds, bodyIds, rows, errors, hasRowContentTrack,
    firstBodyColumn: first + 1,
    fillRowIndex: bodyIds.length ? before.length : rows.length - 1,
  };
}

function placeContainers(containersById, arrangement) {
  const { ids, trackIds, bodyIds, rows, firstBodyColumn } = arrangement;
  const placementsByContainerId = {};
  for (const id of ids) {
    const columnIndex = trackIds.indexOf(id);
    const isRow = containersById[id].type === 'row';
    const sidebar = !isRow && !bodyIds.includes(id);
    const rowStart = sidebar ? 1 : rows.findIndex(row => row.includes(id)) + 1;
    const rowSpan = sidebar ? rows.length : 1;
    const columnStart = isRow ? firstBodyColumn : columnIndex + 1;
    const columnSpan = isRow ? Math.max(1, bodyIds.length) : 1;
    placementsByContainerId[id] = { rowStart, rowSpan, columnStart, columnSpan };
  }
  return placementsByContainerId;
}

function resolveContainerBoundaries(placements, rowCount, columnCount) {
  return Object.fromEntries(Object.entries(placements).map(([id, placement]) => {
    const { rowStart, rowSpan, columnStart, columnSpan } = placement;
    return [id, {
      top: rowStart === 1 ? 'page' : 'containerVertical',
      bottom: rowStart + rowSpan - 1 === rowCount ? 'page' : 'containerVertical',
      left: columnStart === 1 ? 'page' : 'containerHorizontal',
      right: columnStart + columnSpan - 1 === columnCount ? 'page' : 'containerHorizontal',
    }];
  }));
}

export function resolveResumeLayout({ containersById, orderedContainerIds, widthOverrides, rowContentWidth }) {
  const arrangement = arrangeContainers(containersById, orderedContainerIds);
  const { columnIds, trackIds, rows, fillRowIndex, errors, hasRowContentTrack } = arrangement;
  const placementsByContainerId = placeContainers(containersById, arrangement);
  const boundariesByContainerId = resolveContainerBoundaries(
    placementsByContainerId, rows.length, Math.max(1, trackIds.length),
  );
  const resizeNeighborsByContainerId = Object.fromEntries(
    trackIds.map((id, index) => [id, trackIds[index + 1] ?? null]),
  );
  const widthSources = hasRowContentTrack
    ? { ...containersById, [ROW_CONTENT_TRACK]: { layout: { width: rowContentWidth ?? { auto: true } } } }
    : containersById;
  const widthsById = resolveColumnWidths(widthSources, trackIds, widthOverrides);
  const resizeTrackByContainerId = Object.fromEntries(arrangement.ids.map(id => [
    id, hasRowContentTrack && containersById[id].type === 'row' ? ROW_CONTENT_TRACK : id,
  ]));
  for (const id of arrangement.ids) {
    if (resizeTrackByContainerId[id] === ROW_CONTENT_TRACK) {
      resizeNeighborsByContainerId[id] = resizeNeighborsByContainerId[ROW_CONTENT_TRACK];
    }
  }
  return {
    errors, columnIds, trackIds, widthsById, placementsByContainerId, boundariesByContainerId,
    resizeTrackByContainerId, hasRowContentTrack, bodyColumnIds: arrangement.bodyIds,
    resizeNeighborsByContainerId,
    gridTemplateColumns: trackIds.length
      ? trackIds.map(id => `minmax(0, ${widthsById[id]}fr)`).join(' ')
      : 'minmax(0, 1fr)',
    // The body fills remaining height. For rows-only layouts, the last row fills it.
    gridTemplateRows: rows.map((_, index) =>
      index === fillRowIndex ? 'minmax(min-content, 1fr)' : 'auto'
    ).join(' '),
  };
}

export function deriveSectionBoundaries(containerBoundaries, orderedSectionIds, sectionId, flow = 'vertical') {
  if (!containerBoundaries || !orderedSectionIds.includes(sectionId)) return null;
  const start = flow === 'horizontal' ? 'left' : 'top';
  const end = flow === 'horizontal' ? 'right' : 'bottom';
  return {
    ...containerBoundaries,
    [start]: orderedSectionIds[0] === sectionId ? containerBoundaries[start] : 'section',
    [end]: orderedSectionIds.at(-1) === sectionId ? containerBoundaries[end] : 'section',
  };
}

export function planContainerRole(containers, id, role) {
  const layout = resolveResumeLayout({ containersById: containers.byId, orderedContainerIds: containers.allIds });
  const remaining = containers.allIds.filter(candidate => candidate !== id);
  const left = remaining.filter(candidate => getContainerRole(layout, containers.byId[candidate]) === 'leftSidebar');
  const right = remaining.filter(candidate => getContainerRole(layout, containers.byId[candidate]) === 'rightSidebar');
  const middle = remaining.filter(candidate => !left.includes(candidate) && !right.includes(candidate));
  const container = containers.byId[id];
  const next = {
    ...container,
    type: ['row', 'header', 'footer'].includes(role) ? 'row' : 'column',
    spanFullPage: role !== 'column',
  };
  if (container.type === 'row' && next.type === 'column') {
    next.layout = { ...container.layout, width: { auto: true } };
  }
  const byId = { ...containers.byId, [id]: next };
  if (role === 'leftSidebar') left.unshift(id);
  else if (role === 'rightSidebar') right.push(id);
  else if (role === 'header') middle.unshift(id);
  else if (role === 'footer') middle.push(id);
  else {
    const ordinary = middle.findIndex(candidate => byId[candidate].type !== 'row' && !byId[candidate].spanFullPage);
    const oldIndex = remaining.slice(0, containers.allIds.indexOf(id)).filter(candidate => middle.includes(candidate)).length;
    middle.splice(role === 'column' && ordinary >= 0 ? ordinary : Math.min(oldIndex, middle.length), 0, id);
  }
  const ids = [...left, ...middle, ...right];
  return { ids, next, errors: resolveResumeLayout({ containersById: byId, orderedContainerIds: ids }).errors };
}

// Both input methods preserve the pair's total and use the same lower bound.
// Small existing pairs remain resizable instead of requiring 20% combined width.
export function resizeColumnWidths(leftWidth, rightWidth, delta) {
  const total = leftWidth + rightWidth;
  const minimum = Math.min(10, total / 4);
  const left = Math.min(Math.max(leftWidth + delta, minimum), total - minimum);
  return { leftWidth: left, rightWidth: total - left };
}

// A manual edit transfers width only within the same adjacent pair as resizing.
export function getColumnWidthLimits(layout, id) {
  const index = layout.trackIds.indexOf(id);
  if (index < 0) return null;
  const neighborId = layout.trackIds[index + 1] ?? layout.trackIds[index - 1];
  if (neighborId == null) return { neighborId: null, min: 100, max: 100, total: 100 };
  const total = layout.widthsById[id] + layout.widthsById[neighborId];
  const min = Math.min(10, total / 4);
  return { neighborId, min, max: total - min, total };
}


export function getContainerRole(layout, container) {
  if (container.type === 'row' && layout.hasRowContentTrack) return 'row';
  const placement = layout.placementsByContainerId[container.id];
  const body = layout.placementsByContainerId[layout.bodyColumnIds[0]];
  if (container.type === 'row') {
    return body && placement.rowStart > body.rowStart ? 'footer' : 'header';
  }
  if (!container.spanFullPage) return 'column';
  const centerIndex = layout.trackIds.indexOf(ROW_CONTENT_TRACK);
  return placement.columnStart > (centerIndex >= 0 ? centerIndex + 1 : body?.columnStart ?? 1)
    ? 'rightSidebar' : 'leftSidebar';
}
