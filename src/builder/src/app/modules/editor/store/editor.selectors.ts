import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EditorState } from './editor.state';

export const EditorFeatureName = 'editor';

const selectFeature = createFeatureSelector<EditorState>(EditorFeatureName);

export const isTemplatesLoading = createSelector(
    selectFeature,
    state => state.templatesLoading
);

export const selectAvailableTemplates = createSelector(
    selectFeature,
    state => state.availableTemplates
);
