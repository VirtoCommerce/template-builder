import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { ThemeState, initialState } from './states';
import { INTEGRATION_REDUCERS } from './integrations';

export * from './states';

export const themeReducers = createReducer<ThemeState>(
    initialState,

    on(actions.applyPreset, (state: ThemeState, { preset: string }) => ({ ...state })),

    // on(actions.empty, (state: AtmsState) => ({ ...state })),
    // on(actions.applyModuleSettings, (state: AtmsState, { settings }) => ({
    //     ...state,
    //     settings,
    //     zoom: state.zoom || settings?.list?.map?.options?.zoom,
    //     center: state.center || settings?.list?.map?.options?.center
    // })),
    // on(actions.enterToDetailsMode, (state: AtmsState) => ({ ...state, mode: 'details' })),
    // on(actions.enterToListMode, (state: AtmsState, { mode }) => ({
    //     ...state,
    //     atms: { },
    //     mode: mode
    // })),
    // on(actions.enterToMapMode, (state: AtmsState, { mode }) => ({
    //     ...state,
    //     atms: { },
    //     mode: mode
    // })),

    ...INTEGRATION_REDUCERS,
);

// export function reducer(state: ThemeState, action: Action) {
//     return themeReducers(state, action);
// }
