import { createSelector } from "@ngrx/store";

import { selectTemplateParameter } from '@shared/routing';
import {
    selectTemplateEditorFeature,
    selectTemplateDomainState,
    selectTemplateDataState
} from "./common";
import * as fromData from "./data";
import * as fromShared from "@shared/store/selectors";

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

// export const selectChangedTemplates = createSelector(
//     fromShared.selectTemplatesEntriesWithState,
//     fromShared.selectChangedTemplates
// );
