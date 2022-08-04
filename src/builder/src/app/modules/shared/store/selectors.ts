import { createSelector } from '@ngrx/store';
import { TemplateEntry } from '@shared/models';
import { BuilderState } from './state';

import { selectTemplateParameter, selectParentTemplateParameter } from '../routing';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => state.templatesEntries
);

export const selectCurrentFilter = createSelector(
    selectSharedFeature,
    state => state.templatesFilter
);

const selectUnsortedTemplatesEntriesAsList = createSelector(
    selectTemplatesEntries,
    templates => Object.keys(templates)
        .map(key => ({ ...templates[key], alias: key, hasChildren: !!templates[key].children || !!templates[key].request }))
        .sort((x, y) => {
            const a = x.name || x.alias;
            const b = y.name || y.alias;
            return a.localeCompare(b);
        })
        .sort((x, y) => x.sort === undefined
            ? 1
            : y.sort === undefined
                ? -1
                : x.sort - y.sort) || []
);

export const selectTemplatesEntriesAsList = createSelector(
    selectUnsortedTemplatesEntriesAsList,
    selectCurrentFilter,
    (templates, filter) => filter ? templates.filter(x => x.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : templates
);

// export const selectTemplatesEntriesWithState = createSelector(
//     selectTemplatesEntriesAsList,
//     selectTemplatesS
//     templates =>
// );

const selectCurrentChildrenTemplatesEntries = createSelector(
    selectSharedFeature,
    selectParentTemplateParameter,
    (state, parent) => parent ? state.childrenTemplatesState[parent]?.templates || null : null
);

export const selectCurrentTemplateEntry = createSelector(
    selectTemplatesEntries,
    selectCurrentChildrenTemplatesEntries,
    selectTemplateParameter,
    (templates, childrenTemplates, template) => !childrenTemplates
        ? (<TemplateEntry>{ ...templates[template!], alias: template }) // todo: key must be non-nullable
        : (<TemplateEntry>{ ...childrenTemplates[template!], alias: template })
);

export const selectCurrentTemplateState = createSelector(
    selectSharedFeature,
    selectParentTemplateParameter,
    selectTemplateParameter,
    (state, parent, template) => (parent
        ? state.childrenTemplatesState[parent]?.states?.[template]
        : state.entriesStates[template]) || {}
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

export const selectParentTemplateAlias = createSelector(
    selectSharedFeature,
    state => state.templateSelected
);

export const selectParentTemplate = createSelector(
    selectTemplatesEntries,
    selectParentTemplateAlias,
    (templates, key) => key ? templates[key] : null
);

export const selectRootTemplateTitle = createSelector(
    selectParentTemplate,
    template => template?.name || 'Templates'
);

export const selectChildrenTemplatesEntries = createSelector(
    selectSharedFeature,
    selectParentTemplateAlias,
    (state, alias) => alias ? (state.childrenTemplatesState[alias] || {}) : null
);

const selectUnfilteredChildrenTemplatesEntriesAsList = createSelector(
    selectChildrenTemplatesEntries,
    entries => entries
        ? (
            entries.templates
                ? Object.keys(entries.templates)
                    .map(key => ({ ...entries.templates[key], alias: key }))
                : []
        )
        : null
);

export const selectChildrenTemplatesEntriesAsList = createSelector(
    selectUnfilteredChildrenTemplatesEntriesAsList,
    selectCurrentFilter,
    (templates, filter) => (filter && templates) ? templates.filter(x => x.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : templates
);

export const selectCurrentTemplatesEntries = createSelector(
    selectTemplatesEntries,
    selectChildrenTemplatesEntries,
    (templates, children) => children?.templates ?? templates
);

// export const selectTemplatesEntriesLoaded = createSelector(
//     selectSharedFeature,
//     state => state.templatesEntriesLoaded
// );
