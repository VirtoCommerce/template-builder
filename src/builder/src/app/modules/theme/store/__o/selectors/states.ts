import { createSelector } from '@ngrx/store'

// import * as routerSelectors from '@navigation/state';

import { ThemeState } from '../reducers';

export const ThemeFeatureName = 'theme';

export interface AppState {
    theme: ThemeState;
}

export const selectFeature = (state: AppState) => state.theme;
