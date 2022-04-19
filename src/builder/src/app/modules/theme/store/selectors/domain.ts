import { createSelector } from "@ngrx/store";

import { selectSettingsSchema, selectPresetsNames } from "./data";
import { selectGroupsParameter, selectPresetsParameter } from '@routing/store'

export const selectOpenedGroups = createSelector(
    selectGroupsParameter,
    group => group ? <string[]>group.split(',') : []
);

export const selectEditableGroup = createSelector(
    selectOpenedGroups,
    selectSettingsSchema,
    (groups, schema) => schema?.filter(x => x.inline === false).find(x => groups.indexOf(x.name) !== -1)
);

export const selectPresetsState = createSelector(
    selectPresetsNames,
    selectPresetsParameter,
    (presets, preset) => presets ? presets.reduce((acc, cur) => ({ ...acc, [cur]: { current: cur === preset } }), {}) : <any>{}
);

// export const selectCurrentSettings = createSelector(
//     selectThemeDataState,
//     state => state.settings
// );

// export const selectPresets = createSelector(
//     selectThemeDataState,
//     state => state.presets
// );

// export const selectSettingsSchema = createSelector(
//     selectThemeDataState,
//     state => state.settingsSchema
// );

