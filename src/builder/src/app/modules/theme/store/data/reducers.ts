import { createReducer, on, Action } from '@ngrx/store';

import * as actions from '../actions';

import { ThemeDataState, initialState } from './state';

export * from './state';

export const themeDataReducers = createReducer<ThemeDataState>(
    initialState,

    on(actions.loadSettingsDataSuccess, (state: ThemeDataState, { settingsData }) => ({
        ...state,
        settings: typeof settingsData.current === 'string' ? settingsData.presets[settingsData.current] : settingsData.current,
        presets: settingsData.presets
    })),
    on(actions.loadSettingsSchemaSuccess, (state, { schema }) => ({ ...state, settingsSchema: schema })),
    on(actions.applyPreset, (state, { preset }) => ({ ...state, settings: { ...state.presets[preset] } })),

    on(actions.updateSettings, (state, { model }) => ({ ...state, settings: { ...state.settings, ...model } })),
);
