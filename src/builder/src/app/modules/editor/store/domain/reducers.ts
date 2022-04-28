import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { EditorDomainState, initialState } from './state';

export const editorDomainReducers = createReducer<EditorDomainState>(
    initialState,

    // on(actions.presetsListMode, (state) => ({ ...state, mode: 'list' })),
    // on(actions.presetsTileMode, (state) => ({ ...state, mode: 'tile' })),

    // on(actions.applyPresetsFilter, (state, { filter }) => ({ ...state, presetsFilter: filter })),

);
