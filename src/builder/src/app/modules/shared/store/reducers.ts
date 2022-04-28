import { createReducer, on, Action } from '@ngrx/store';

import * as actions from './actions';

import { SharedState, initialState } from './state';

export * from './state';

export const sharedReducers = createReducer<SharedState>(
    initialState,

    on(actions.loadTemplateEntries, state => ({ ...state, templatesEntriesLoading: true, templatesEntriesLoaded: false })),
    on(actions.loadTemplateEntriesSuccess, (state, { templatesEntries }) => ({ ...state, templatesEntriesLoading: false, templatesEntriesLoaded: true, templatesEntries })),
    on(actions.loadTemplateEntriesFails, state => ({ ...state, templatesEntriesLoading: false, templatesEntriesLoaded: false })),

    on(actions.selectTemplate, (state, { template }) => ({ ...state, currentTemplateKey: template }))

);

