import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateContainer, configureContainer, moveContainer, setColumnWidth } from '@/store/resumeSlice.js';
import { planContainerMove, resolveResumeLayout, getColumnWidthLimits, ROW_CONTENT_TRACK } from '@/utils/resumeLayout.js';
import styles from '../SettingsModal.module.css';

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
  const canMove = direction => planContainerMove(containers, container.id, direction) !== null;
  const changeType = type => {
    setWidthInput(null);
    dispatch(configureContainer({ id: container.id, type }));
  };
  return (
    <div className={styles.settingsModalWrapper}>
      <h2>Layout area settings</h2>
      <label>
        Type
        <select style={{ backgroundColor: 'var(--background-main)' }} value={container.type} onChange={event => changeType(event.target.value)}>
          <option value="column">Column</option>
          <option value="row">Row</option>
        </select>
      </label>
      <p>{isRow
        ? 'Rows sit above or below the columns and span the width between sidebars. Sections inside stack vertically.'
        : 'Columns sit side by side. Sections inside stack vertically.'}</p>
      {!isRow && <>
        <label>
          <input type="checkbox" checked={Boolean(container.spanFullPage)}
            onChange={event => {
              setWidthInput(null);
              dispatch(configureContainer({ id: container.id, type: 'column', spanFullPage: event.target.checked }));
            }} />
          Full-height sidebar
        </label>
        <p>Extend this column alongside the rows above and below. Use the arrows to choose its side.</p>
      </>}
      <div className="flexRow">
        <button
          type="button"
          className="buttonMain"
          disabled={!canMove(-1)}
          onClick={() => dispatch(moveContainer({ id: container.id, direction: -1 }))}
        >
          {isRow ? '↑ Move up' : '← Move left'}
        </button>
        <button
          type="button"
          className="buttonMain"
          disabled={!canMove(1)}
          onClick={() => dispatch(moveContainer({ id: container.id, direction: 1 }))}
        >
          {isRow ? '↓ Move down' : 'Move right →'}
        </button>
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
