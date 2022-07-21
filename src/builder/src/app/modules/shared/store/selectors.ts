import { createSelector } from '@ngrx/store';
import { TemplateEntry } from '@shared/models';
import { BuilderState } from './state';

import { selectTemplateParameter } from '../routing';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => state.templatesEntries
);

export const selectTemplatesEntriesAsList = createSelector(
    selectTemplatesEntries,
    templates => Object.keys(templates)
        .map(key => ({ ...templates[key], alias: key, hasChildren: !!templates[key].children || (!!templates[key].searchPath && !!templates[key].searchPath!.length ) }))
        .sort((x, y) => x.sort === undefined
            ? 1
            : y.sort === undefined
                ? -1
                : x.sort - y.sort) || []
);

// export const selectTemplatesEntriesWithState = createSelector(
//     selectTemplatesEntriesAsList,
//     selectTemplatesS
//     templates =>
// );

export const selectCurrentTemplateEntry = createSelector(
    selectTemplatesEntries,
    selectTemplateParameter,
    (templates, key) => (<TemplateEntry>{ ...templates[key!], alias: key }) // todo: key must be non-nullable
);

export const selectTemplatesEntriesLoading = createSelector(
    selectSharedFeature,
    state => state.templatesEntriesLoading
);

export const selectPreviewUrl = createSelector(
    selectCurrentTemplateEntry,
    template => template.previewUrl
);

export const isAppInitialized = createSelector(
    selectSharedFeature,
    state => state.appInitialized
);


// export const selectTemplatesEntriesLoaded = createSelector(
//     selectSharedFeature,
//     state => state.templatesEntriesLoaded
// );
