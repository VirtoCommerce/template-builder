import { createReducer, on, Action, ActionReducer } from '@ngrx/store';

import * as actions from '../actions';

import { ThemeUIState, initialState } from '../ui/state';

export * from '../ui/state';

export const themeUIReducers = createReducer<ThemeUIState>(
    initialState,

    on(actions.presetsListMode, (state) => ({...state, mode: 'list'})),
    on(actions.presetsTileMode, (state) => ({...state, mode: 'tile'})),

);

export function uiReducer(state: ThemeUIState, action: Action): ThemeUIState {
    return themeUIReducers(state, action);
}
