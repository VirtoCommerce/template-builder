import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { EditorDataState, initialState } from './state';

export const editorDataReducers = createReducer<EditorDataState>(
    initialState,

    on(actions.loadTemplateSchemasSuccess, (state, { schemas }) => ({ ...state, schemas })),
    on(actions.loadTemplateModelSuccess, (state, { template, templateKey }) => ({ ...state, templates: { ...state.templates, [templateKey]: template } })),
    on(actions.updateTemplateAction, (state, { templateKey, template }) => ({
        ...state, templates: { ...state.templates, [templateKey]: template }
    })),
    // on(actions.presetsTileMode, (state) => ({ ...state, mode: 'tile' })),
    // on(actions.applyPresetsFilter, (state, { filter }) => ({ ...state, presetsFilter: filter })),

);
