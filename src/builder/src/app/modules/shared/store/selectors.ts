import { createSelector } from '@ngrx/store';
import { BuilderState } from './state';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => state.templatesEntries
);

export const selectTemplatesEntriesLoading = createSelector(
    selectSharedFeature,
    state => state.templatesEntriesLoading
);

// export const selectTemplatesEntriesLoaded = createSelector(
//     selectSharedFeature,
//     state => state.templatesEntriesLoaded
// );
