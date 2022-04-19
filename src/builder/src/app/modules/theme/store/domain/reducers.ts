import { createReducer, on, Action } from '@ngrx/store';

import * as actions from '../actions';

import { ThemeDomainState, initialState } from './state';

export * from './state';

export const themeDomainReducers = createReducer<ThemeDomainState>(
    initialState,

    on(actions.loadSettingsData, state => ({ ...state, settingsLoading: true })),
    on(actions.loadSettingsDataSuccess, state => ({ ...state, settingsLoading: false })),
    on(actions.loadSettingsDataFail, state => ({ ...state, settingsLoading: false })),

    on(actions.loadSettingsSchema, state => ({ ...state, schemaLoading: true })),
    on(actions.loadSettingsSchemaSuccess, state => ({ ...state, schemaLoading: false })),
    on(actions.loadSettingsSchemaFail, state => ({ ...state, schemaLoading: false })),
);

