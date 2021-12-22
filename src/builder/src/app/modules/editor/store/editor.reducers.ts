import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './editor.actions';

import { EditorState, initialState } from './editor.state';

const editorReducers = createReducer(
    initialState,
    on(actions.loadAvailableTemplates, state => ({ ...state, templatesLoading: true })),
    on(actions.loadAvailableTemplatesSuccess, (state, { templates }) => ({ ...state, templatesLoading: false, availableTemplates: templates })),
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
    }))
);

export function editorReducer(state: EditorState, action: Action) {
    return editorReducers(state, action);
}
