import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { EditorDomainState, initialState } from './state';

export const editorDomainReducers = createReducer<EditorDomainState>(
    initialState,

    on(actions.loadTemplateSchemas, (state) => ({ ...state, schemaLoading: true })),
    on(actions.loadTemplateSchemasSuccess, (state) => ({ ...state, schemaLoading: false })),
    on(actions.loadTemplateModel, (state, { alias }) => ({
        ...state,
        states: {
            ...state.states,
            [alias]: {
                ...state.states[alias],
                isLoading: true,
                isDirty: false,
                sections: state.states[alias]?.sections || { }
            }
        }
    })),
    on(actions.loadTemplateModelSuccess, (state, { alias }) => ({
        ...state,
        states: {
            ...state.states,
            [alias]: {
                ...state.states[alias],
                isLoading: false,
                isDirty: false,
                sections: state.states[alias]?.sections || { }
            }
        }
    }))


    // on(actions.presetsListMode, (state) => ({ ...state, mode: 'list' })),
    // on(actions.presetsTileMode, (state) => ({ ...state, mode: 'tile' })),

    // on(actions.applyPresetsFilter, (state, { filter }) => ({ ...state, presetsFilter: filter })),

);
