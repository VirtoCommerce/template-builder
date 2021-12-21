import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './editor.actions';

import { EditorState, initialState } from './editor.state';

const editorReducers = createReducer(
    initialState,
    on(actions.loadAvailableTemplates, state => ({ ...state, templatesLoading: true })),
    on(actions.loadAvailableTemplatesSuccess, (state, { templates }) => ({ ...state, templatesLoading: false, availableTemplates: templates, currentTemplate: Object.keys(templates)[0] })),
    on(actions.templateSelected, (state, { templateKey }) => ({ ...state, currentTemplate: templateKey })),
    on(actions.editItem, (state, payload) => ({ ...state, ...payload }))
);

export function editorReducer(state: EditorState, action: Action) {
    return editorReducers(state, action);
}
