import { TemplateEntryInfo } from './../models/template-entry-info.model';
import { createSelector } from '@ngrx/store';
import { TemplateEntry } from '@shared/models';
import { BuilderState } from './state';

import { selectTemplateParameter, selectParentTemplateParameter } from '../routing';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => state.templatesEntries
);

export const selectTemplatesStates = createSelector(
    selectSharedFeature,
    state => state.entriesStates
);

export const selectCurrentFilter = createSelector(
    selectSharedFeature,
    state => state.templatesFilter
);

const selectUnsortedTemplatesEntriesAsList = createSelector(
    selectTemplatesEntries,
    templates => Object.keys(templates)
        .map(key => (<TemplateEntry>{ ...templates[key], alias: key, hasChildren: !!templates[key].children || !!templates[key].request }))
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

export const selectTemplatesEntriesWithState = createSelector(
    selectTemplatesEntriesAsList, // check: here must be selectUnsortedTemplatesEntriesAsList??
    selectTemplatesStates,
    (entries, states) => entries.map(x => ({ entry: x, state: states[x.alias] || {} }))
);

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

const selectAllChildrenTemplatesStates = createSelector(
    selectSharedFeature,
    state => state.childrenTemplatesState
);

export const selectChildrenTemplatesEntries = createSelector(
    selectAllChildrenTemplatesStates,
    selectParentTemplateAlias,
    (templates, alias) => alias ? (templates[alias] || {}) : null
);

const selectUnfilteredChildrenTemplatesEntriesAsList = createSelector(
    selectChildrenTemplatesEntries,
    entries => entries
        ? (
            entries.templates
                ? Object.keys(entries.templates)
                    .map(key => (<TemplateEntry>{ ...entries.templates[key], alias: key }))
                : []
        )
        : null
);

export const selectChildrenTemplatesEntriesAsList = createSelector(
    selectUnfilteredChildrenTemplatesEntriesAsList,
    selectCurrentFilter,
    (templates, filter) => (filter && templates) ? templates.filter(x => x.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) : templates
);

const selectChildrenTemplatesStates = createSelector(
    selectSharedFeature,
    selectParentTemplateAlias,
    (state, template) => !!template ? state.childrenTemplatesState[template] : null
);

export const selectCurrentChildrenTemplatesEntriesWithState = createSelector(
    selectChildrenTemplatesEntriesAsList,
    selectChildrenTemplatesStates,
    (entries, states) => entries?.map(x => ({ entry: x, state: states?.states?.[x.alias] || null }))
);

export const selectAllChildrenTemplatesWithState = createSelector(
    selectAllChildrenTemplatesStates,
    states => Object.keys(states)
        .filter(key => !!states[key].states)
        .reduce((result, key) => [
            ...result,
            ...Object.keys(states[key].states)
                .map(child => (<TemplateEntryInfo>{ alias: child, parent: key, name: `${key} → ${child}`, entry: states[key].templates?.[child], state: states[key].states?.[child] || null }))
        ], <TemplateEntryInfo[]>[])
);

export const selectChangedTemplates = createSelector(
    selectTemplatesEntriesWithState,
    selectAllChildrenTemplatesWithState,
    (templates, children) => [
        ...templates.filter(x => x.state.isDirty).map(x => (<TemplateEntryInfo>{ alias: x.entry.alias, name: x.entry.name, entry: x.entry, state: x.state })),
        ...children.filter(x => x.state.isDirty)
    ]
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
