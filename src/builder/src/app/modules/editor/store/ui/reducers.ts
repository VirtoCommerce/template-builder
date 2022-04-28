import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { EditorUIState, initialState } from './state';

export const editorUIReducers = createReducer<EditorUIState>(
    initialState,

    // on(actions.presetsListMode, (state) => ({ ...state, mode: 'list' })),
    // on(actions.presetsTileMode, (state) => ({ ...state, mode: 'tile' })),

    // on(actions.applyPresetsFilter, (state, { filter }) => ({ ...state, presetsFilter: filter })),

);
