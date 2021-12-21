import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EditorState } from './editor.state';

import { helpers } from '@editor/services';

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

const currentTemplateKey = createSelector(
    selectFeature,
    state => state.currentTemplate
);

export const selectCurrentTemplate = createSelector(
    selectAvailableTemplates,
    currentTemplateKey,
    (templates, key) => key ? templates[key] : null
);

export const selectCurrentTemplateName = createSelector(
    selectCurrentTemplate,
    currentTemplateKey,
    (template, key) => helpers.getTemplateName(template, key)
);

const selectSectionIndex = createSelector(
    selectFeature,
    state => state.sectionIndex
);

const selectBlockIndex = createSelector(
    selectFeature,
    state => state.blockIndex
);

const selectCurrentSection = createSelector(
    selectCurrentTemplate,
    selectSectionIndex,
    (template, section) => template && section !== null
        ? template.content.find(x => x.__index === section)
        : null
);

export const selectItemToEdit = createSelector(
    selectCurrentSection,
    selectBlockIndex,
    (section, block) => section && block !== null
        ? section.blocks.find(x => x.__index === block)
        : section
);
