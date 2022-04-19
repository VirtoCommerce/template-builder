import { createSelector } from "@ngrx/store";

import { selectThemeDataState } from ".";

export const selectCurrentSettings = createSelector(
    selectThemeDataState,
    state => state.settings
);

export const selectPresets = createSelector(
    selectThemeDataState,
    state => state.presets
);

export const selectPresetsNames = createSelector(
    selectThemeDataState,
    state => state.presets ? Object.keys(state.presets) : []
);

export const selectSettingsSchema = createSelector(
    selectThemeDataState,
    state => state.settingsSchema
);
