import { TemplateEntryInfo } from './../models/template-entry-info.model';
import { createSelector } from '@ngrx/store';
import { TemplateEntry, TemplateEntryList, TemplateEntryState } from '@shared/models';
import { BuilderState } from './state';

import { selectPathParameter, selectTypeParameter, selectParentTemplateParameter, selectTemplateKeyParameter, selectPath } from '../routing';

export const selectSharedFeature = (state: BuilderState) => state.shared;

export const selectTemplatesEntries = createSelector(
    selectSharedFeature,
    state => state.templatesEntries
);

export const isHttpLoading = createSelector(
    selectSharedFeature,
    state => state.templatesEntriesLoading || !state.appInitialized
        || Object.keys(state.childrenTemplatesState).find(key => state.childrenTemplatesState[key].isLoading)
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
        .map(key => (<TemplateEntry>{ ...templates[key], key, hasChildren: !!templates[key].children || !!templates[key].request }))
        .sort((x, y) => {
            const a = x.name || x.key;
            const b = y.name || y.key;
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
    (entries, states) => entries.map(x => ({ entry: x, state: states[x.key] || {} }))
);

const selectCurrentChildrenTemplatesEntries = createSelector(
    selectSharedFeature,
    selectParentTemplateParameter,
    (state, parent) => parent ? state.childrenTemplatesState[parent]?.templates || null : null
);

function searchTemplate(templates: TemplateEntry[], childrenTemplates: TemplateEntryList | null, type: string, path: string, key: string): TemplateEntry {
    if (childrenTemplates) {
        return childrenTemplates[key];
    }
    const result = templates.find(x => x.type === type && x.path === path) ||
        templates.find(x => x.type === type && x.isDefault) ||
        templates.find(x => x.type === type);
    return result!;
}

export const selectCurrentTemplateEntry = createSelector(
    selectUnsortedTemplatesEntriesAsList,
    selectCurrentChildrenTemplatesEntries,
    selectTypeParameter,
    selectPathParameter,
    selectTemplateKeyParameter,
    (templates, childrenTemplates, type, path, key) => searchTemplate(templates, childrenTemplates, type, path, key)
);

export const selectCurrentTemplateState = createSelector(
    selectSharedFeature,
    selectParentTemplateParameter,
    selectTemplateKeyParameter,
    (state, parent, key) => (parent
        ? state.childrenTemplatesState[parent]?.states?.[key]
        : state.entriesStates[key])
        || {}
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

export const selectParentTemplateKey = createSelector(
    selectSharedFeature,
    state => state.templateSelected
);

export const selectParentTemplate = createSelector(
    selectTemplatesEntries,
    selectParentTemplateKey,
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

const selectTemplatesStatesAsList = createSelector(
    selectTemplatesStates,
    templates => Object.keys(templates).map(x => templates[x])
);

const selectChildrenTemplatesStatesAsList = createSelector(
    selectAllChildrenTemplatesStates,
    templates => {
        const allChildren = Object.keys(templates).map(x => templates[x].states || {});
        const result = allChildren.reduce((acc, item) => [...acc, ...(Object.keys(item).map(x => item[x]))], <TemplateEntryState[]>[]);
        return result;
    }
);

const selectAllStates = createSelector(
    selectTemplatesStatesAsList,
    selectChildrenTemplatesStatesAsList,
    (templates, children) => [...templates, ...children]
);

export const hasDirty = createSelector(
    selectAllStates,
    states => !!states.find(x => x.isDirty)
);

export const selectChildrenTemplatesEntries = createSelector(
    selectAllChildrenTemplatesStates,
    selectParentTemplateKey,
    (templates, key) => key ? (templates[key] || {}) : null
);

const selectUnfilteredChildrenTemplatesEntriesAsList = createSelector(
    selectChildrenTemplatesEntries,
    entries => entries
        ? (
            entries.templates
                ? Object.keys(entries.templates)
                    .map(key => (<TemplateEntry>{ ...entries.templates[key], key }))
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
    selectParentTemplateKey,
    (state, key) => !!key ? state.childrenTemplatesState[key] : null
);

export const selectCurrentChildrenTemplatesEntriesWithState = createSelector(
    selectChildrenTemplatesEntriesAsList,
    selectChildrenTemplatesStates,
    (entries, states) => entries?.map(x => ({ entry: x, state: states?.states?.[x.key] || null }))
);

export const selectAllChildrenTemplatesWithState = createSelector(
    selectAllChildrenTemplatesStates,
    states => Object.keys(states)
        .filter(key => !!states[key].states)
        .reduce((result, key) => [
            ...result,
            ...Object.keys(states[key].states)
                .map(child => (<TemplateEntryInfo>{ key: child, parent: key, name: `${key} → ${child}`, entry: states[key].templates?.[child], state: states[key].states?.[child] || null }))
        ], <TemplateEntryInfo[]>[])
);

export const selectChangedTemplates = createSelector(
    selectTemplatesEntriesWithState,
    selectAllChildrenTemplatesWithState,
    (templates, children) => [
        ...templates.filter(x => x.state.isDirty).map(x => (<TemplateEntryInfo>{ key: x.entry.key, name: x.entry.name, entry: x.entry, state: x.state })),
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
