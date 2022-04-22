import { createSelector } from "@ngrx/store";

import { selectThemeDataState, selectPresetsFilter } from "./common";

export const selectCurrentSettings = createSelector(
    selectThemeDataState,
    state => state.settings
);

export const selectPresets = createSelector(
    selectThemeDataState,
    state => state.presets
);

export const selectFilteredPresets = createSelector(
    selectPresets,
    selectPresetsFilter,
    (presets, filter) => !filter
        ? presets
        : Object.keys(presets)
            .filter(key => key.toLowerCase().includes(filter?.toLowerCase()))
            .reduce((result, key) => ({...result, [key]: presets[key]}), {})
);

export const selectPresetsNames = createSelector(
    selectThemeDataState,
    state => state.presets ? Object.keys(state.presets) : []
);

export const selectSettingsSchema = createSelector(
    selectThemeDataState,
    state => state.settingsSchema
);
