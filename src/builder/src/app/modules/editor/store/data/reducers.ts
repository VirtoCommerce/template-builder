import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { EditorDataState, initialState } from './state';

export const editorDataReducers = createReducer<EditorDataState>(
    initialState,

    on(actions.loadTemplateSchemasSuccess, (state, { schemas }) => ({ ...state, schemas })),
    on(actions.loadTemplateModelSuccess, (state, { template, alias }) => ({ ...state, templates: { ...state.templates, [alias]: template } })),
    on(actions.updateTemplateAction, (state, { alias, template }) => ({
        ...state, templates: { ...state.templates, [alias]: template }
    }))
    // on(actions.presetsTileMode, (state) => ({ ...state, mode: 'tile' })),

    // on(actions.applyPresetsFilter, (state, { filter }) => ({ ...state, presetsFilter: filter })),

);
