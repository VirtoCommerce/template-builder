import { createSelector } from '@ngrx/store';
import { BuilderState } from './state';

import { selectTemplateParameter } from '../routing';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => Object.keys(state.templatesEntries).map(key => ({ ...state.templatesEntries[key], alias: key })) || []
);

export const selectCurrentTemplateEntry = createSelector(
    selectSharedFeature,
    selectTemplateParameter,
    (state, key) => state.templatesEntries[key!] || <any>{} // todo: key must be non-nullable
);

export const selectTemplatesEntriesLoading = createSelector(
    selectSharedFeature,
    state => state.templatesEntriesLoading
);

export const selectPreviewUrl = createSelector(
    selectCurrentTemplateEntry,
    template => template.previewUrl
);

// export const selectTemplatesEntriesLoaded = createSelector(
//     selectSharedFeature,
//     state => state.templatesEntriesLoaded
// );
