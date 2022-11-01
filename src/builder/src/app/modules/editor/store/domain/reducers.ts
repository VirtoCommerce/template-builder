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
                sections: state.states[alias]?.sections || {}
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
                error: undefined,
                sections: state.states[alias]?.sections || {}
            }
        }
    })),
    on(actions.loadTemplateModelFails, (state, { error, alias }) => ({
        ...state,
        states: {
            ...state.states,
            [alias]: {
                ...state.states[alias],
                isLoading: false,
                error: error.message
            }
        }
    }))
);
