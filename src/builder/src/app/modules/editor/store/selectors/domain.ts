import { createSelector } from "@ngrx/store";

import { selectTemplateParameter } from '@shared/routing';
import {
    selectTemplateEditorFeature,
    selectTemplateDomainState,
    selectTemplateDataState
} from "./common";
import * as fromData from "./data";

import { SectionStatesList, SectionState } from '@editor/models';

export const isSchemasLoaded = createSelector(
    selectTemplateDataState,
    state => !!state.schemas
);

export const selectCurrentTemplateState = createSelector(
    selectTemplateDomainState,
    selectTemplateParameter,
    (state, alias) => alias ? { ...state.states[alias], id: alias } : null
);

export const selectSectionsState = createSelector(
    selectCurrentTemplateState,
    fromData.selectCurrentTemplateModel,
    fromData.selectSectionsSchemas,
    (state, model, schemas) => (schemas && model?.content.filter(x => x.type && x.id).reduce((result, section) => {
        const canHaveChildren = (schemas[section.type]?.blocks?.length || 0) > 0;
        return <SectionStatesList>{
            ...result,
            [section.id]: <SectionState>{
                expanded: canHaveChildren,
                canHaveChildren,
                ...state?.sections[section.id]
            }
        };
    }, {})) || <SectionStatesList>{}
);

// export const selectGroupedBlankItems = createSelector(
//     selectTemplateEditorFeature,
//     state => ({
//         groups: [],
//         items: []
//     })
// );
