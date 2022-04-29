import { createSelector } from "@ngrx/store";

import { selectTemplateParameter } from '@shared/routing';
import { selectTemplateDataState } from "./common";

export const selectCurrentTemplateModel = createSelector(
    selectTemplateDataState,
    selectTemplateParameter,
    (state, alias) => alias ? state.templates[alias]?.model : null
);

// export const selectPresets = createSelector(
//     selectThemeDataState,
//     state => state.presets
// );

// export const selectFilteredPresets = createSelector(
//     selectPresets,
//     selectPresetsFilter,
//     (presets, filter) => !filter
//         ? presets
//         : Object.keys(presets)
//             .filter(key => key.toLowerCase().includes(filter?.toLowerCase()))
//             .reduce((result, key) => ({...result, [key]: presets[key]}), {})
// );

// export const selectPresetsNames = createSelector(
//     selectThemeDataState,
//     state => state.presets ? Object.keys(state.presets) : []
// );

// export const selectSettingsSchema = createSelector(
//     selectThemeDataState,
//     state => state.settingsSchema
// );
