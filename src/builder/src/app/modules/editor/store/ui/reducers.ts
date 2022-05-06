import { createReducer, on } from '@ngrx/store';

import * as actions from '../actions';

import { EditorUIState, initialState } from './state';

export const editorUIReducers = createReducer<EditorUIState>(
    initialState,

    on(actions.toggleGroupAction, (state, { groupId }) => ({
        ...state,
        states: {
            ...state.states,
            [groupId]: {
                ...state.states[groupId],
                opened: !(state.states[groupId]?.opened)
            }
        }
    })),
    on(actions.previewItemAction, (state, { item }) => ({
        ...state,
        previewItemType: item.type
    })),
    on(actions.applySectionsFilter, (state, { filter }) => ({
        ...state,
        currentSectionsFilter: filter
    })),
    on(actions.resetGroupsState, state => ({
        ...state,
        currentSectionsFilter: null,
        previewItemType: null
    }))
);
