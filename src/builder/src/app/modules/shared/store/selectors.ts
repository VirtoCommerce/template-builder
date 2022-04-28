import { createSelector } from '@ngrx/store';
import { BuilderState } from './state';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => Object.keys(state.templatesEntries).map(key => ({ ...state.templatesEntries[key], alias: key })) || []
);

export const selectCurrentTemplateKey = createSelector(
    selectSharedFeature,
    state => state.currentTemplateKey // todo: get from config when it is empty?
);

export const selectCurrentTemplate = createSelector(
    selectSharedFeature,
    selectCurrentTemplateKey,
    (state, key) => state.templatesEntries[key!] // todo: key must not be nullable
);

export const selectTemplatesEntriesLoading = createSelector(
    selectSharedFeature,
    state => state.templatesEntriesLoading
);

// export const selectTemplatesEntriesLoaded = createSelector(
//     selectSharedFeature,
//     state => state.templatesEntriesLoaded
// );
