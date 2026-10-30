import { resolveResumeLayout, planContainerRole, planContainerSettings, planContainerMove, getColumnWidthLimits, ROW_CONTENT_TRACK } from '../utils/resumeLayout.js';
import { normalizeResumeLayout } from '../utils/sectionSpacing.js';
import { normalizeSlateValue } from "../utils/normalizers/normalizeSlateValue.js";
import { normalizeSectionLayout } from "../utils/normalizers/normalizeSectionLayout.js";
import { createSlice } from '@reduxjs/toolkit';

import { mergeDeep } from "./helpers/mergeDeep.js";

const insertSubsection = (state, subsectionData) => {
   const { fields = [], ...subsection } = subsectionData;
   const sortedFields = [...fields].sort(
      (a, b) => a.position - b.position
   );

   state.subsections.byId[subsection.id] = {
      ...subsection,
      fieldIds: sortedFields.map(field => field.id),
   };
   state.subsections.allIds.push(subsection.id);
   state.sections.byId[subsection.sectionId]
      .subsectionIds.push(subsection.id);

   for (const field of sortedFields) {
      state.fields.byId[field.id] = { ...field, value: normalizeSlateValue(field.value) };
      state.fields.allIds.push(field.id);
   }
};

const deleteContainerById = (state, containerId) => {
   const allContainerIds = state.containers.allIds;

   if (allContainerIds.length === 1) {
      alert('Cannot delete the only remaining container.');
      return;
   }

   const containerToDelete = state.containers.byId[containerId];

   if (!containerToDelete) {
      console.error(`Cannot delete container. Container with ID ${containerId} not found.`);
      return;
   }

   const lastAvailableContainerId = state.containers.allIds.findLast(
      (id) => id !== containerId
   );

   const lastAvailableContainer = state.containers.byId[lastAvailableContainerId];

   if (!lastAvailableContainer) {
      console.error('Cannot delete container. No destination container found.');
      return;
   }

   containerToDelete.sectionIds.forEach((sectionId) => {
      const sectionToMove = state.sections.byId[sectionId];

      if (!sectionToMove) return;

      lastAvailableContainer.sectionIds.push(sectionId);
      sectionToMove.containerId = lastAvailableContainerId;
   });

   containerToDelete.sectionIds = [];

   delete state.containers.byId[containerId];

   state.containers.allIds = state.containers.allIds.filter((id) => id !== containerId);
};

const deleteSectionById = (state, sectionId) => {
   const section = state.sections.byId[sectionId];
   const container = state.containers.byId[section.containerId];
   if (container) {
      container.sectionIds = container.sectionIds.filter((id) => id !== sectionId);
   }

   section.subsectionIds.forEach((subsectionId) => {
      deleteSubsectionById(state, subsectionId);
   });

   delete state.sections.byId[sectionId];
   state.sections.allIds = state.sections.allIds.filter((id) => id !== sectionId);
};

const deleteSubsectionById = (state, subsectionId) => {
   const subsection = state.subsections.byId[subsectionId];
   const section = state.sections.byId[subsection.sectionId];
   if (!section || !Array.isArray(section.subsectionIds)) {
      console.error(`Cannot delete subsection. Section with ID ${subsection.sectionId} not found or has invalid subsections array.`);
      return;
   }

   // Remove subsection from section's subsectionIds array
   section.subsectionIds = section.subsectionIds.filter((id) => id !== subsectionId);

   // Delete all fields in the subsection
   subsection.fieldIds.forEach((fieldId) => {
      delete state.fields.byId[fieldId];
      state.fields.allIds = state.fields.allIds.filter(id => id !== fieldId);
   });

   // Delete the subsection itself
   delete state.subsections.byId[subsectionId];
   state.subsections.allIds = state.subsections.allIds.filter(id => id !== subsectionId);
};

const deleteFieldById = (state, fieldId) => {
   const field = state.fields.byId[fieldId];
   const subsection = state.subsections.byId[field.subsectionId];
   subsection.fieldIds = subsection.fieldIds.filter((id) => id !== field.id);

   delete state.fields.byId[field.id];
   state.fields.allIds = state.fields.allIds.filter(id => id !== field.id);
};

// A virtual track's width belongs to the page layout, not to any row container.
const writeTrackWidth = (state, id, value, auto) => {
   const existing = id === ROW_CONTENT_TRACK
      ? state.layout.rowContentWidth ?? { auto: true }
      : state.containers.byId[id].layout?.width ?? {};
   const width = { ...existing, value: `${value}%` };
   if (auto !== undefined) width.auto = auto;
   if (id === ROW_CONTENT_TRACK) state.layout.rowContentWidth = width;
   else {
      state.containers.byId[id].layout ??= {};
      state.containers.byId[id].layout.width = width;
   }
};

const resolveStateLayout = state => resolveResumeLayout({
   containersById: state.containers.byId,
   orderedContainerIds: state.containers.allIds,
   rowContentWidth: state.layout.rowContentWidth,
});

const updateAutoContainerWidths = state => {
   const layout = resolveStateLayout(state);
   for (const id of layout.trackIds) writeTrackWidth(state, id, layout.widthsById[id]);
};

// * ------------- V
// * INITIAL STATE V
// * ------------- V

export const initialState = {
   id: null,
   title: '',
   userId: null,
   tags: [],

   containers: {
      byId: {},
      allIds: [],
      totalWidth: 100
   },
   sections: {
      byId: {},
      allIds: []
   },
   subsections: {
      byId: {},
      allIds: []
   },
   fields: {
      byId: {},
      allIds: []
   },
   styling: {
      display: 'flex',
      fontSize: '12px',
      lineHeight: 1.2,
      color: 'rgba(0, 0, 0, 1)',
      backgroundColor: 'rgba(255, 255, 255, 1)',
   },

   layout: {
      padding: {
         top: '2.0rem',
         right: '2.0rem',
         bottom: '2.0rem',
         left: '2.0rem'
      },
      gap: {
         horizontal: '1rem',
         vertical: '0rem',
         section: '0.5rem',
         subsection: '0.0rem',
         field: '0.0rem',
      }
   },
   activeSectionIds: [],
   activeEditorId: null,
   activeEditorSelection: null,
   resumeRef: null,
   // Client-only records restored alongside manual profile replacements by undo/redo.
   manualProfileMatches: {},
};

const resumeSlice = createSlice({
   name: 'resume',
   initialState,
   reducers: {
      loadResume(state, action) {
         return {
            ...initialState,
            ...action.payload,
            layout: normalizeResumeLayout(action.payload.layout ?? initialState.layout),
            activeEditorId: null,
            activeEditorSelection: null,
            manualProfileMatches: {},
         };
      },
      setResume(state, action) {
         // console.log("Setting Resume: ", action.payload)
         return {
            ...initialState,
            ...action.payload,
            layout: normalizeResumeLayout(action.payload.layout ?? initialState.layout),
            activeEditorId: null,
            activeEditorSelection: null,
            manualProfileMatches: {},
         };
      },
      setResumeId(state, action) {
         const id = action.payload;
         state.id = id;
      },

      setResumePrintRef(state, action) {
         state.resumeRef = action.payload;
      },

      // * ------------ V
      // * ADD TO STATE V
      // * ------------ V

      addSection(state, action) {
         const { sectionData } = action.payload;
         const { subsections = [], ...section } = sectionData;
         const sortedSubsections = [...subsections].sort(
            (a, b) => a.position - b.position
         );

         state.sections.byId[section.id] = {
            ...section,
            value: normalizeSlateValue(section.value),
            layout: normalizeSectionLayout(section.layout),
            subsectionIds: [],
         };
         state.sections.allIds.push(section.id);
         state.containers.byId[section.containerId].sectionIds.push(section.id);

         for (const subsection of sortedSubsections) {
            insertSubsection(state, subsection);
         }
      },

      addSubsection(state, action) {
         const { subsectionData } = action.payload;
         insertSubsection(state, subsectionData);
      },

      addField(state, action) {
         const { fieldData } = action.payload;
         console.log("Adding field with data: ", fieldData);
         state.fields.byId[fieldData.id] = { ...fieldData, value: normalizeSlateValue(fieldData.value) };
         state.fields.allIds.push(fieldData.id);
         state.subsections.byId[fieldData.subsectionId].fieldIds.push(fieldData.id);
      },

      // * ----------------- V
      // * DELETE FROM STATE V
      // * ----------------- V

      deleteContainer(state, action) {
         const id = action.payload;
         deleteContainerById(state, id);
         updateAutoContainerWidths(state);
      },

      deleteSection(state, action) {
         const id = action.payload;
         deleteSectionById(state, id);
      },

      deleteSubsection(state, action) {
         const id = action.payload;
         deleteSubsectionById(state, id);
      },

      deleteField(state, action) {
         const id = action.payload;
         deleteFieldById(state, id);
      },

      // * ------------ V
      // * UPDATE STATE V
      // * ------------ V

      updateResume(state, action) {
         mergeDeep(state, action.payload);
      },

      updateContainer(state, action) {
         const { id, ...changes } = action.payload;
         const container = state.containers.byId[id];

         if (!container) {
            console.error(`Container with ID ${id} not found.`);
            return;
         }

         mergeDeep(container, changes);

         if (Object.hasOwn(changes, 'position')) {
            state.containers.allIds.sort((a, b) => state.containers.byId[a].position - state.containers.byId[b].position);
            state.containers.allIds.forEach((id, index) => { state.containers.byId[id].position = index; });
         }
         if (changes.layout?.width || changes.type) {
            updateAutoContainerWidths(state);
         }
      },

      configureContainer(state, action) {
         const { id, role, type, spanFullPage = false } = action.payload;
         const container = state.containers.byId[id];
         if (!container) return;
         if (role ? !['column', 'row', 'header', 'footer', 'leftSidebar', 'rightSidebar'].includes(role) : !['column', 'row'].includes(type)) return;
         const { ids, next, errors } = role
            ? planContainerRole(state.containers, id, role)
            : planContainerSettings(state.containers, id, { type, spanFullPage });
         if (errors.length) return;
         state.containers.byId[id] = next;
         state.containers.allIds = ids;
         ids.forEach((candidate, index) => { state.containers.byId[candidate].position = index; });
         updateAutoContainerWidths(state);
      },

      moveContainer(state, action) {
         const { id, direction } = action.payload;
         const ids = planContainerMove(state.containers, id, direction);
         if (!ids) return;
         state.containers.allIds = ids;
         ids.forEach((candidate, position) => { state.containers.byId[candidate].position = position; });
      },

      setColumnWidth(state, action) {
         const { id, value } = action.payload;
         const layout = resolveStateLayout(state);
         const limits = getColumnWidthLimits(layout, id);
         if (!limits || !Number.isFinite(value) || value < limits.min || value > limits.max) return;

         // Materialize current resolved widths so legacy unnormalized values do
         // not change unrelated columns when the edited pair becomes fixed.
         for (const trackId of layout.trackIds) writeTrackWidth(state, trackId, layout.widthsById[trackId]);
         writeTrackWidth(state, id, value, false);
         if (limits.neighborId != null) writeTrackWidth(state, limits.neighborId, limits.total - value, false);
      },

      resizeContainerPair(state, action) {
         const { leftContainerId, rightContainerId, leftWidth, rightWidth } = action.payload;
         const layout = resolveStateLayout(state);
         if (!layout.trackIds.includes(leftContainerId) || !layout.trackIds.includes(rightContainerId) ||
             layout.resizeNeighborsByContainerId[leftContainerId] !== rightContainerId ||
             !Number.isFinite(leftWidth) || !Number.isFinite(rightWidth) || leftWidth <= 0 || rightWidth <= 0) {
            console.error('Cannot resize containers: expected adjacent column tracks and positive finite widths.');
            return;
         }
         for (const trackId of layout.trackIds) writeTrackWidth(state, trackId, layout.widthsById[trackId]);
         writeTrackWidth(state, leftContainerId, leftWidth.toFixed(2), false);
         writeTrackWidth(state, rightContainerId, rightWidth.toFixed(2), false);
      },

      updateSection(state, action) {
         const { id, containerId, ...changes } = action.payload;
         const section = state.sections.byId[id];

         if (!section) {
            console.error(`Cannot update section. ID of ${id} not found.`);
            return;
         }

         if (containerId && containerId !== section.containerId) {
            const oldContainer = state.containers.byId[section.containerId];
            const newContainer = state.containers.byId[containerId];

            if (oldContainer) {
               oldContainer.sectionIds = oldContainer.sectionIds.filter(
                  (sectionId) => sectionId !== id
               );
            }

            if (newContainer && !newContainer.sectionIds.includes(id)) {
               newContainer.sectionIds.push(id);
            }

            section.containerId = containerId;
         }

         mergeDeep(section, changes);
      },

      updateSubsection(state, action) {
         const { id, ...changes } = action.payload;
         const subsection = state.subsections.byId[id];
         if (!subsection) {
            console.error(`Cannot update subsection. ID of ${id} not found.`);
            return;
         }
         const section = state.sections.byId[subsection.sectionId];
         if (!section) {
            console.error(`Cannot update subsection. Section with ID ${subsection.sectionId} not found.`);
            return;
         }

         mergeDeep(subsection, changes);

         if (Object.hasOwn(changes, "position")) {
            section.subsectionIds = section.subsectionIds
               .map(id => state.subsections.byId[id])
               .filter(Boolean)
               .sort((a, b) => a.position - b.position)
               .map(subsection => subsection.id);
         }
      },

      updateField(state, action) {
         const { id, ...changes } = action.payload;
         const field = state.fields.byId[id];
         if (!field) {
            console.error(`Cannot update field. ID of ${id} not found.`);
            return;
         }
         if (Object.hasOwn(changes, "value") && !state.subsections.byId[field.subsectionId]) {
            console.error(`Cannot update field. Subsection with ID ${field.subsectionId} not found.`);
            return;
         }
         
         // console.log(field, id, changes);
         mergeDeep(field, changes);
      },

      applyManualProfileMatch: {
         prepare({ sessionId, profileFieldId, resumeFieldId, value }) {
            const matchId = crypto.randomUUID();
            return {
               payload: { sessionId, profileFieldId, resumeFieldId, value, matchId },
               meta: { historyGroup: `manual-profile-match:${matchId}` },
            };
         },
         reducer(state, action) {
            const { sessionId, profileFieldId, resumeFieldId, value, matchId } = action.payload;
            const field = state.fields.byId[resumeFieldId];
            if (!sessionId || profileFieldId == null || !field
               || !state.subsections.byId[field.subsectionId]) return;

            // Commit the value and its match record in the same undo step.
            mergeDeep(field, { value });
            state.manualProfileMatches = {
               [sessionId]: {
                  ...state.manualProfileMatches?.[sessionId],
                  [profileFieldId]: { matchId, profileFieldId, resumeFieldId },
               },
            };
         },
      },

      swapFieldPositions(state, action) {
         const { fieldId, targetFieldId } = action.payload;

         const field = state.fields.byId[fieldId];
         const targetField = state.fields.byId[targetFieldId];

         if (!field || !targetField) {
            console.error("Swap failed: field not found.");
            return;
         }

         const subsection = state.subsections.byId[field.subsectionId];

         if (!subsection) {
            console.error("Swap failed: subsection not found.");
            return;
         }

         // Swap positions
         const originalPosition = field.position;
         field.position = targetField.position;
         targetField.position = originalPosition;

         // Re-sort fieldIds to reflect new order
         subsection.fieldIds = subsection.fieldIds
            .map(id => state.fields.byId[id])
            .filter(Boolean)
            .sort((a, b) => a.position - b.position)
            .map(f => f.id);
      },

      toggleAllSectionIds(state) {
         if (state.activeSectionIds.length === state.sections.allIds.length) {
            console.log("Clearing all active section IDs.")
            state.activeSectionIds = [];
         } else {
            console.log("Setting all section IDs active: ", state.sections.allIds)
            state.activeSectionIds = [...state.sections.allIds];
         }
      },

      // Exclusive select: replaces the whole active-section selection with a single id
      setActiveSectionId(state, action) {
         const id = action.payload;
         state.activeSectionIds = id ? [id] : [];
      },

      setActiveSectionIds(state, action) {
         const id = action.payload;
         const currentActiveSectionIds = state.activeSectionIds;

         if (currentActiveSectionIds.includes(id)) {
            state.activeSectionIds = currentActiveSectionIds.filter(
               (activeId) => activeId != id
            );
         } else {
            state.activeSectionIds.push(id);
         }
      },

      setActiveEditorId(state, action) {
         state.activeEditorId = action.payload;
      },

      // For Slate Purposes, sets the currently selected Slate Editor due to there being many different editors on the page at once.
      setActiveEditorSelection(state, action) {
         state.activeEditorSelection = action.payload;
      },

      // * ---------- V
      // * REORDERING V
      // * ---------- V

      dndReorderSections(state, action) {
         const { dndKitDict } = action.payload;

         const containerIds = Object.keys(dndKitDict);
         containerIds.forEach(containerId => {
            const container = state.containers.byId[containerId];
            if (container) {
               container.sectionIds = dndKitDict[containerId];
               container.sectionIds.forEach((sectionId, index) => {
                  const section = state.sections.byId[sectionId];
                  if (section) {
                     section.position = index;
                     section.containerId = container.id;
                  }
               });
            }
         });
      },

      dndReorderSubsections(state, action) {
         const { fromSubsectionId, toSubsectionId } = action.payload;

         const fromSubsection = state.subsections.byId[fromSubsectionId];
         const toSubsection = state.subsections.byId[toSubsectionId];

         if (!fromSubsection || !toSubsection) {
            console.error("Cannot reorder subsections. One of the subsections not found.");
            return;
         }

         const section = state.sections.byId[fromSubsection.sectionId];
         if (!section) {
            console.error(`Cannot reorder subsections. Section with ID ${fromSubsection.sectionId} not found.`);
            return;
         }

         const fromIndex = section.subsectionIds.indexOf(fromSubsectionId);
         const toIndex = section.subsectionIds.indexOf(toSubsectionId);

         if (fromIndex === -1 || toIndex === -1) {
            return;
         }

         section.subsectionIds.splice(fromIndex, 1);
         section.subsectionIds.splice(toIndex, 0, fromSubsectionId);

         section.subsectionIds.forEach((subId, index) => {
            const subsection = state.subsections.byId[subId];
            if (subsection) {
               subsection.position = index;
            }
         });
      },

      dndReorderFields(state, action) {
         const { fromFieldId, toFieldId, subsectionId } = action.payload;
         const subsection = state.subsections.byId[subsectionId];

         if (!subsection || !Array.isArray(subsection.fieldIds)) {
            console.error(`Cannot reorder fields. Subsection with ID ${subsectionId} not found.`);
            return;
         }

         const layoutByPosition = subsection.fieldIds.map((fieldId) => {
            const field = state.fields.byId[fieldId];
            return {
               startNewRow: Boolean(field?.layout?.startNewRow),
               fillRow: Boolean(field?.layout?.grid?.fillRow),
            };
         });

         const fromFieldIndex = subsection.fieldIds.indexOf(fromFieldId);
         const toFieldIndex = subsection.fieldIds.indexOf(toFieldId);

         if (fromFieldIndex === -1 || toFieldIndex === -1) {
            return;
         }

         subsection.fieldIds.splice(fromFieldIndex, 1);
         subsection.fieldIds.splice(toFieldIndex, 0, fromFieldId);

         subsection.fieldIds.forEach((fieldId, index) => {
            const field = state.fields.byId[fieldId];
            if (field) {
               field.position = index;

               if (!field.layout) {
                  field.layout = {};
               }

               field.layout.startNewRow = layoutByPosition[index].startNewRow;

               if (!field.layout.grid) {
                  field.layout.grid = {};
               }

               field.layout.grid.fillRow = layoutByPosition[index].fillRow;
            }
         });
      },

      
      reorderFields(state, action) {
         const { subsectionId, fromIndex, toIndex } = action.payload;

         const subsection = state.subsections.byId[subsectionId];
         if (!subsection) {
            console.error(`Cannot reorder fields. Subsection with ID of ${subsectionId} not found.`);
            return;
         }

         const fieldIdsArr = subsection.fieldIds;
         const [moved] = fieldIdsArr.splice(fromIndex, 1);
         fieldIdsArr.splice(toIndex, 0, moved);

         fieldIdsArr.forEach((fieldId, index) => {
            const field = state.fields.byId[fieldId];
            if (field) {
               field.position = index;
            }
         });
      },

      reorderSections(state, action) {
         const { fromId, toId } = action.payload;

         if (!fromId || !toId || fromId === toId) {
            return;
         }

         const sectionIdsArr = state.sections.allIds;
         const fromIndex = sectionIdsArr.indexOf(fromId);
         const toIndex = sectionIdsArr.indexOf(toId);
         const insertAfterTarget = fromIndex < toIndex;

         if (fromIndex === -1 || toIndex === -1) {
            console.error(`Cannot reorder sections. Invalid fromId (${fromId}) or toId (${toId}).`);
            return;
         }

         const fromSection = state.sections.byId[fromId];
         const toSection = state.sections.byId[toId];

         if (!fromSection || !toSection) {
            console.error('Cannot reorder sections. One or both sections were not found.');
            return;
         }

         const fromContainerId = fromSection.containerId;
         const toContainerId = toSection.containerId;

         const fromContainer = state.containers.byId[fromContainerId];
         const toContainer = state.containers.byId[toContainerId];

         if (!fromContainer || !toContainer) {
            console.error('Cannot reorder sections. One or both containers were not found.');
            return;
         }

         if (!fromContainer.sectionIds.includes(fromId) || !toContainer.sectionIds.includes(toId)) {
            console.error('Cannot reorder sections. One or both section IDs were not found in their containers.');
            return;
         }

         const fromContainerSectionIds = fromContainer.sectionIds.filter((id) => id !== fromId);
         const toContainerSectionIds = fromContainer === toContainer
            ? fromContainerSectionIds
            : [...toContainer.sectionIds];

         const globalFromIndex = sectionIdsArr.indexOf(fromId);
         if (globalFromIndex === -1) {
            console.error(`Cannot reorder sections. fromId ${fromId} not found in sections.allIds.`);
            return;
         }
         sectionIdsArr.splice(globalFromIndex, 1);

         const globalTargetIndex = sectionIdsArr.indexOf(toId);
         if (globalTargetIndex === -1) {
            console.error(`Cannot reorder sections. toId ${toId} not found in sections.allIds.`);
            return;
         }
         const globalInsertIndex = insertAfterTarget ? globalTargetIndex + 1 : globalTargetIndex;
         sectionIdsArr.splice(globalInsertIndex, 0, fromId);

         const targetContainerIndex = toContainerSectionIds.indexOf(toId);
         if (targetContainerIndex === -1) {
            console.error(`Cannot reorder sections. toId ${toId} not found in destination container.`);
            return;
         }

         const containerInsertIndex = insertAfterTarget ? targetContainerIndex + 1 : targetContainerIndex;
         toContainerSectionIds.splice(containerInsertIndex, 0, fromId);

         fromContainer.sectionIds = fromContainerSectionIds;

         if (fromContainer !== toContainer) {
            toContainer.sectionIds = toContainerSectionIds;
         } else {
            fromContainer.sectionIds = toContainerSectionIds;
         }

         if (fromContainer !== toContainer) {
            fromSection.containerId = toSection.containerId;
         }

         const affectedContainers = fromContainer === toContainer
            ? [fromContainer]
            : [fromContainer, toContainer];

         for (const container of affectedContainers) {
            container.sectionIds.forEach((id, index) => {
               const candidateSection = state.sections.byId[id];
               if (!candidateSection) return;

               // Positions should always mirror the final sectionIds order.
               candidateSection.position = index;
            });
         }
      },

      reorderSubsections(state, action) {
         const { sectionId, fromIndex, toIndex } = action.payload;
         const section = state.sections.byId[sectionId];

         if (!section) {
            console.error(`Cannot reorder subsections. Section with ID of ${sectionId} not found.`);
            return;
         }

         const subsectionIdsArr = section.subsectionIds;
         const [moved] = subsectionIdsArr.splice(fromIndex, 1);
         subsectionIdsArr.splice(toIndex, 0, moved);
      },

   },
});

export const {
   setActiveSectionId,
   setActiveSectionIds,
   toggleAllSectionIds,
   setActiveEditorId,
   setActiveEditorSelection,

   setResumeId,
   setResume,
   updateResume,
   setResumePrintRef,

   deleteContainer,
   updateContainer,
   resizeContainerPair,
   setColumnWidth,
   configureContainer,
   moveContainer,

   addSection,
   updateSection,
   deleteSection,
   reorderSections,
   dndReorderSections,
   dndReorderSubsections,
   dndReorderFields,

   addSubsection,
   updateSubsection,
   deleteSubsection,
   reorderSubsections,

   addField,
   deleteField,
   updateField,
   applyManualProfileMatch,
   swapFieldPositions,
   reorderFields,

} = resumeSlice.actions;

export default resumeSlice.reducer;
