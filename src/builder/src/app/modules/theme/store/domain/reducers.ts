import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { ThemeDomainState, initialState } from './state';

export const themeDomainReducers = createReducer<ThemeDomainState>(
    initialState,

    on(actions.loadSettingsData, state => ({ ...state, settingsLoading: true })),
    on(actions.loadSettingsDataSuccess, state => ({ ...state, settingsLoading: false })),
    on(actions.loadSettingsDataFail, state => ({ ...state, settingsLoading: false })),

    on(actions.loadSettingsSchema, state => ({ ...state, schemaLoading: true })),
    on(actions.loadSettingsSchemaSuccess, state => ({ ...state, schemaLoading: false })),
    on(actions.loadSettingsSchemaFail, state => ({ ...state, schemaLoading: false })),

    on(actions.saveSettings, state => ({ ...state, schemaLoading: true })),
    on(actions.saveSettingsSuccess, state => ({ ...state, schemaLoading: false })),
    on(actions.saveSettingsFail, state => ({ ...state, schemaLoading: false })),

    on(actions.updateSettings, actions.applyPreset, (state) => ({ ...state, isDirty: true })),
    on(actions.revertChanges, (state) => ({ ...state, isDirty: false }))
);
