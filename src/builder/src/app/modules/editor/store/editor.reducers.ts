import { template } from '@app/modules/shared/services/utils';
import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './editor.actions';

import { EditorState, initialState } from './editor.state';

const editorReducers = createReducer(
    initialState,
    on(actions.loadAvailableTemplates, state => ({ ...state, templatesLoading: true })),
    on(actions.loadAvailableTemplatesSuccess, (state, { templates }) => ({ ...state, templatesLoading: false, availableTemplates: templates })),
    on(actions.loadAvailableSectionsSuccess, (state, { sections }) => ({ ...state, sections })),
    on(actions.loadAvailableBlocksSuccess, (state, { blocks }) => ({ ...state, blocks })),
    on(actions.templateSelected, (state, { templateKey }) => ({ ...state, currentTemplate: templateKey })),
    on(actions.editItem, (state, payload) => ({ ...state, ...payload })),
    on(actions.completeEditItem, state => ({ ...state, sectionIndex: null, blockIndex: null })),
    on(actions.loadTemplateSuccess, (state, { template, templateKey }) => ({
        ...state,
        templates: {
            ...state.templates,
            [templateKey]: {
                isDirty: false,
                key: templateKey,
                model: template
            }
        }
    })),
    on(actions.setSections, (state, { sections, templateKey }) => ({
        ...state,
        templates: {
            ...state.templates,
            [templateKey]: {
                ...state.templates[templateKey],
                isDirty: true,
                model: {
                    ...state.templates[templateKey].model,
                    content: sections
                }
            }
        }
    })),
    on(actions.closeAddItemPanel, state => ({ ...state, indexAddSectionPanel: false })),
    on(actions.closeAllPanels, state => ({ ...state, sectionIndex: null, blockIndex: null, showTemplateSettings: false, indexAddSectionPanel: false })),
    on(actions.showAddItemPanel, (state, { sectionIndex }) => ({ ...state, indexAddSectionPanel: sectionIndex }))
);

export function editorReducer(state: EditorState, action: Action) {
    return editorReducers(state, action);
}
