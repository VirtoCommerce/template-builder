import {
    on as sourceOn,
    ActionCreator,
    Creator,
    ReducerTypes
} from '@ngrx/store';

import { ThemeState } from './states';
import * as actions from '../actions/integrations';

// ReducerTypes<unknown, readonly ActionCreator<string, Creator<any[], object>>[]>[]

declare function on(args) => on<ThemeState, ActionCreator[]>(args);

export const INTEGRATION_REDUCERS: any[] = [
    // on<ThemeState, ActionCreator[]>(actions.loadSettingsData, (state: ThemeState) => ({ ...state, dataLoading: true })),
    on(actions.loadSettingsData, (state: ThemeState) => ({ ...state, dataLoading: true })),
    // on(actions.loadSettingsDataSuccess, (state: ThemeState) => ({ ...state, themeLoading: false })),
    // on(actions.loadSettingsDataFail, (state: ThemeState) => ({ ...state, themeLoading: false })),
    // on(actions.loadSettingsSchema, (state: ThemeState) => ({ ...state, schemaLoading: true })),
    // on(actions.loadSettingsSchemaSuccess, (state: ThemeState) => ({ ...state, schemaLoading: false })),
    // on(actions.loadSettingsSchemaFail, (state: ThemeState) => ({ ...state, schemaLoading: false }))
];
