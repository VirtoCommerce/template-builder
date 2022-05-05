import { createSelector } from "@ngrx/store";

import { selectTemplateParameter } from '@shared/routing';
import {
    selectTemplateDomainState,
    selectTemplateDataState
} from "./common";
import { selectCurrentTemplateModel, selectSectionsSchemas } from "./data";

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
    selectCurrentTemplateModel,
    selectSectionsSchemas,
    (state, model, schemas) => model?.content.reduce((result, section) => {
        const canHaveChildren = (schemas[section.type]?.blocks?.length || 0) > 0;
        return <SectionStatesList>{
            ...result,
            [section.__id]: <SectionState>{
                expanded: canHaveChildren,
                canHaveChildren,
                ...state?.sections[section.__id]
            }
        };
    }, {}) || <SectionStatesList>{}
);
