import { createSelector } from "@ngrx/store";

import {
    selectTemplateUIState,
    selectCurrentSectionsFilter
} from './common';

import * as fromDomain from "./domain";
import * as fromData from "./data";

export const selectAddItemTitle = createSelector(
    fromData.selectSectionModelFromRoute,
    section => !section
        ? 'Add section'
        : `Add block to '${section['name']}'` // todo: must be property that displayed in sections list
);

export const selectSectionGroupStates = createSelector(
    selectTemplateUIState,
    state => state.states
);

export const selectPreviewItemType = createSelector(
    selectTemplateUIState,
    state => state.previewItemType
);

export const editTemplateContext = createSelector(
    fromData.selectCurrentTemplateModel,
    fromDomain.selectCurrentTemplateState,
    fromDomain.selectSectionsState,
    fromData.selectSectionsSchemas,
    fromData.selectBlocksSchemas,
    (template, templateState, sectionsState, sectionsSchemas, blocksSchemas) => ({
        template, templateState, sectionsState, sectionsSchemas, blocksSchemas
    })
);

export const selectAddItemContext = createSelector(
    fromData.selectGroupedSectionSchemas,
    selectSectionGroupStates,
    selectPreviewItemType,
    selectCurrentSectionsFilter,
    ({ groups, items }, states, previewItemType, filter) => ({
        groups,
        items,
        states: {
            groups: groups.reduce((acc, value) => ({
                ...acc,
                [value.name]: <any>{
                    ...states[value.name],
                    opened: states[value.name]?.opened || !!filter
                },
            }), <any>{}),
            previewItemType
        },
    })
);
