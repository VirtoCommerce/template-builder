import { createReducer, on, Action } from '@ngrx/store';

import * as actions from './actions';

import { SharedState, initialState } from './state';

export * from './state';

export const sharedReducers = createReducer<SharedState>(
    initialState,

    on(actions.loadTemplateEntries, state => ({ ...state, templatesEntriesLoading: true, templatesEntriesLoaded: false })),
    on(actions.loadTemplateEntriesSuccess, (state, { templatesEntries }) => ({ ...state, templatesEntriesLoading: false, templatesEntriesLoaded: true, templatesEntries })),
    on(actions.loadTemplateEntriesFails, state => ({ ...state, templatesEntriesLoading: false, templatesEntriesLoaded: false })),
    on(actions.initShared, state => ({ ...state, appInitialized: true })),

    on(actions.filterTemplates, (state, { filter }) => ({ ...state, templatesFilter: filter })),
    on(actions.displayRootTemplates, (state) => ({ ...state, templateSelected: null, templatesFilter: null })),
    on(actions.loadChildrenTemplates, (state, { template }) => ({
        ...state,
        templateSelected: template,
        childrenTemplatesState: {
            ...state.childrenTemplatesState,
            [template]: {
                ...state.childrenTemplatesState[template],
                isLoading: true
            }
        }
    })),
    on(actions.switchToChildrenTemplates, (state) => ({
        ...state,
        templatesFilter: null
    })),
    on(actions.loadChildrenTemplatesSuccess, (state, { parentTemplate, childrenEntries }) => ({
        ...state,
        childrenTemplatesState: {
            ...state.childrenTemplatesState,
            [parentTemplate]: {
                ...state.childrenTemplatesState[parentTemplate],
                isLoading: false,
                templates: childrenEntries,
                error: null
            }
        }
    })),
    on(actions.loadChildrenTemplatesFails, (state, { error, parentTemplate }) => ({
        ...state,
        childrenTemplatesState: {
            ...state.childrenTemplatesState,
            [parentTemplate]: {
                ...state.childrenTemplatesState[parentTemplate],
                isLoading: false,
                error
            }
        }
    })),
    on(actions.setRootDirtyState, (state, { template, dirty }) => ({
        ...state,
        entriesStates: {
            ...state.entriesStates,
            [template]: {
                ...state.entriesStates?.[template],
                isDirty: dirty
            }
        }
    })),
    on(actions.setDirtyState, (state, { template, parent, dirty }) => ({
        ...state,
        childrenTemplatesState: {
            ...state.childrenTemplatesState,
            [parent]: {
                ...state.childrenTemplatesState[parent],
                states: {
                    ...state.childrenTemplatesState[parent].states,
                    [template]: {
                        ...state.childrenTemplatesState[parent].states?.[template],
                        isDirty: dirty
                    }
                }
            }
        }
    })),

);

