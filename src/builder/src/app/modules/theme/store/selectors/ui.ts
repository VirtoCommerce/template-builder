import { createSelector } from "@ngrx/store";

import { selectSettingsSchema } from "./data";
import { selectOpenedGroups } from "./domain";

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
