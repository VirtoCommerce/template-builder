import { createReducer, on, Action, INIT } from '@ngrx/store';
import * as actions from './config.actions';

import { ConfigState, initialState } from './config.state';

const configReducers = createReducer(
    initialState,

    on(actions.setUrlParameters, (state, { location }) => ({ ...state, location })),

    on(actions.loadConfig, state => ({ ...state, configLoading: true })),
    on(actions.loadConfigSuccess, (state, { config }) => ({ ...state, configLoading: false, configLoaded: true, config })),
    on(actions.loadConfigFails, (state, { error }) => ({ ...state, configLoading: false, configLoaded: false }))
);

export function configReducer(state: ConfigState | undefined, action: Action): ConfigState {
    return configReducers(state, action);
}
