import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateContainer, configureContainer, moveContainer, setColumnWidth } from '@/store/resumeSlice.js';
import { planContainerRole, resolveResumeLayout, getColumnWidthLimits, getContainerRole, ROW_CONTENT_TRACK } from '@/utils/resumeLayout.js';
import styles from '../SettingsModal.module.css';

const roles = [
  ['column', 'Content column'],
  ['header', 'Row above content'],
  ['footer', 'Row below content'],
  ['leftSidebar', 'Full-height left column'],
  ['rightSidebar', 'Full-height right column'],
];

export default function ContainerSettings() {
  const dispatch = useDispatch();
  const resume = useSelector(state => state.resume.present);
  const section = resume.sections.byId[resume.activeSectionIds[0]];
  const container = resume.containers.byId[section?.containerId];
  const [widthInput, setWidthInput] = useState(null);
  if (!container) return null;
  const containers = resume.containers;
  const layout = resolveResumeLayout({ containersById: containers.byId, orderedContainerIds: containers.allIds, rowContentWidth: resume.layout.rowContentWidth });
  const isRow = container.type === 'row';
  const widthLimits = getColumnWidthLimits(layout, container.id);
  const role = getContainerRole(layout, container);
  const availableRoles = layout.bodyColumnIds.length
    ? roles
    : roles.filter(([value]) => value !== 'header' && value !== 'footer').concat([['row', 'Row']]);
  const canMove = direction => {
    const ids = [...containers.allIds];
    const index = ids.indexOf(container.id);
    const next = index + direction;
    if (next < 0 || next >= ids.length) return false;
    [ids[index], ids[next]] = [ids[next], ids[index]];
    return !resolveResumeLayout({ containersById: containers.byId, orderedContainerIds: ids }).errors.length;
  };
  return (
    <div className={styles.settingsModalWrapper}>
      <h2>Container {container.position + 1} Settings</h2>
      <label>
        Placement
        <select style={{ backgroundColor: 'var(--background-main)' }} value={role} onChange={event => dispatch(configureContainer({ id: container.id, role: event.target.value }))}>
          {availableRoles.map(([value, label]) => <option key={value} value={value} style={{ backgroundColor: 'var(--background-main)' }}
            disabled={planContainerRole(containers, container.id, value).errors.length > 0}>{label}</option>)}
        </select>
      </label>
      <p>Rows span the available width between full-height side columns. Sections stack vertically.</p>
      <div className="flexRow">
        <button type="button" className="buttonMain" disabled={!canMove(-1)} onClick={() => dispatch(moveContainer({ id: container.id, direction: -1 }))}>Move earlier</button>
        <button type="button" className="buttonMain" disabled={!canMove(1)} onClick={() => dispatch(moveContainer({ id: container.id, direction: 1 }))}>Move later</button>
      </div>
      {!isRow && <>
        <form className="flexRow" onSubmit={event => {
          event.preventDefault();
          const value = Number(widthInput ?? layout.widthsById[container.id]);
          if (!Number.isFinite(value) || value < widthLimits.min || value > widthLimits.max) return;
          dispatch(setColumnWidth({ id: container.id, value }));
          setWidthInput(null);
        }}>
          <label htmlFor={`column-width-${container.id}`}>Column width (%)
          </label>
          <input className='inputMain' id={`column-width-${container.id}`} type="number"
            min={widthLimits.min} max={widthLimits.max} step="any" required
            value={widthInput ?? Number(layout.widthsById[container.id].toFixed(1))}
            onChange={event => setWidthInput(event.target.value)} />
          <button type="submit" className="buttonMain">Apply width</button>
        </form>
        <p>{widthLimits.neighborId == null
          ? 'A single column fills 100% of the page width.'
          : `${widthLimits.neighborId === ROW_CONTENT_TRACK ? 'Adjusts the space for stacked rows.' : 'Adjusts the neighboring column.'} Available range: ${Number(widthLimits.min.toFixed(2))}%–${Number(widthLimits.max.toFixed(2))}%.`}</p>
        <label>Automatic width
          <input type="checkbox" checked={container.layout?.width?.auto ?? false}
            onChange={event => dispatch(updateContainer({ id: container.id, layout: { width: { auto: event.target.checked } } }))} />
        </label>
      </>}
    </div>
  );
}
