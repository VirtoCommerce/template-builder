import { createSelector } from "@ngrx/store";

import { selectSettingsSchema, selectFilteredPresets } from "./data";
import { selectOpenedGroups, selectPresetsState } from "./domain";

export const selectGroupsState = createSelector(
    selectSettingsSchema,
    selectOpenedGroups,
    (schema, groups) => schema?.reduce((result, current) => {
        result[current.name] = {
            opened: groups.indexOf(current.name) !== -1 && current.inline !== false,
        };
        return result;
    }, <any>{})
);

export const selectPresetsContext = createSelector(
    selectFilteredPresets,
    selectPresetsState,
    (presets, state) => ({ presets, state })
);
