import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ControlDescriptor } from '@shared/models';
import { helpers } from '@editor/services';

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

const currentTemplateKey = createSelector(
    selectFeature,
    state => state.currentTemplate
);

const selectTemplates = createSelector(
    selectFeature,
    state => state.templates
);

export const selectCurrentTemplate = createSelector(
    selectTemplates,
    currentTemplateKey,
    (templates, key) => key ? templates[key]?.model : null
);

const selectCurrentTemplateSchema = createSelector(
    selectAvailableTemplates,
    currentTemplateKey,
    (templates, key) => key ? templates[key] : null
);

export const selectCurrentTemplateName = createSelector(
    selectCurrentTemplateSchema,
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

// const selectCurrentSection = createSelector(
//     selectCurrentTemplate,
//     selectSectionIndex,
//     (template, section) => template && section !== null
//         ? template.content.find(x => x.__index === section)
//         : null
// );

// export const selectItemToEdit = createSelector(
//     selectCurrentSection,
//     selectBlockIndex,
//     (section, block) => section && block !== null
//         ? section.blocks.find(x => x.__index === block)
//         : section
// );

// export const selectCurrentDescriptors = createSelector(
//     selectItemToEdit,
//     item => <ControlDescriptor[]>[]
// );
