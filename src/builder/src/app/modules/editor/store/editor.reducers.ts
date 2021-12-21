import { createReducer, on, Action } from '@ngrx/store';
import * as actions from './editor.actions';

import { EditorState, initialState } from './editor.state';

const editorReducers = createReducer(
    initialState,
    on(actions.loadAvailableTemplates, state =>({...state, templatesLoading: true })),
    on(actions.loadAvailableTemplatesSuccess, (state, { templates }) =>({...state, templatesLoading: false, availableTemplates: templates }))
);

export function editorReducer(state: EditorState, action: Action) {
    return editorReducers(state, action);
}
