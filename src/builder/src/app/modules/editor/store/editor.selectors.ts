import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ControlDescriptor } from '@core/models';
import { helpers } from '@editor/services';

import { EditorState } from './editor.state';


export const EditorFeatureName = 'editor';

const selectFeature = createFeatureSelector<EditorState>(EditorFeatureName);

// export const isTemplatesLoading = createSelector(
//     selectFeature,
//     state => state.templatesLoading
// );

// export const selectAvailableTemplates = createSelector(
//     selectFeature,
//     state => state.availableTemplates
// );

// export const currentTemplateKey = createSelector(
//     selectFeature,
//     state => state.currentTemplate
// );

// const selectTemplates = createSelector(
//     selectFeature,
//     state => state.templates
// );

// export const selectCurrentTemplate = createSelector(
//     selectTemplates,
//     currentTemplateKey,
//     (templates, key) => key ? templates[key]?.model : null
// );

// const selectCurrentTemplateSchema = createSelector(
//     selectAvailableTemplates,
//     currentTemplateKey,
//     (templates, key) => key ? templates[key] : null
// );

// export const selectCurrentTemplateName = createSelector(
//     selectCurrentTemplateSchema,
//     currentTemplateKey,
//     (template, key) => helpers.getTemplateName(template, key)
// );

// export const selectSectionIndex = createSelector(
//     selectFeature,
//     state => state.sectionIndex
// );

// export const selectBlockIndex = createSelector(
//     selectFeature,
//     state => state.blockIndex
// );

// export const selectCurrentSection = createSelector(
//     selectCurrentTemplate,
//     selectSectionIndex,
//     (template, section) => template && section !== null
//         ? template.content.find(x => x.__index === section)
//         : null
// );

// export const selectCurrentBlock = createSelector(
//     selectCurrentSection,
//     selectBlockIndex,
//     (section, blockIndex) => section && blockIndex !== null
//         ? section.blocks.find(x => x.__index === blockIndex) || null
//         : null
// );

// export const selectItemToEdit = createSelector(
//     selectCurrentSection,
//     selectCurrentBlock,
//     (section, block) => block || section
// );

// const selectSectionsSchemas = createSelector(
//     selectFeature,
//     state => state.sections
// );

// const selectBlocksSchemas = createSelector(
//     selectFeature,
//     state => state.blocks
// );

// const selectCurrentSectionSchema = createSelector(
//     selectCurrentSection,
//     selectSectionsSchemas,
//     (section, schemas) => section
//         ? schemas[section.type]
//         : null
// );

// const selectCurrentBlockSchema = createSelector(
//     selectCurrentBlock,
//     selectSectionsSchemas,
//     selectBlocksSchemas,
//     (block, sectionsSchemas, blocksSchemas) => block
//         ? blocksSchemas[block.type] || sectionsSchemas[block.type]
//         : null
// );

// const selectCurrentSchema = createSelector(
//     selectCurrentSectionSchema,
//     selectCurrentBlockSchema,
//     (blockSchema, sectionSchema) => blockSchema || sectionSchema
// );

// export const selectCurrentDescriptors = createSelector(
//     selectCurrentSchema,
//     schema => <ControlDescriptor[]>(schema ? schema.settings : [])
// );

// export const selectCurrentSectionIndexForAdding = createSelector(
//     selectFeature,
//     state => state.indexAddSectionPanel
// );

// export const isAnyPanelOpened = createSelector(
//     selectItemToEdit,
//     selectCurrentSectionIndexForAdding,
//     (item, sectionIndex) => !!item || sectionIndex !== false
// );

// const selectCurrentSectionForAdding = createSelector(
//     selectCurrentSectionIndexForAdding,
//     selectCurrentTemplate,
//     (index, template) => template?.content?.find(x => x.__index === index) || null
// );

// export const addSectionOpened = createSelector(
//     selectCurrentSectionIndexForAdding,
//     sectionIndex => sectionIndex !== false
// );

// const currentTemplateSectionsSchemas = createSelector(
//     selectCurrentTemplateSchema,
//     selectSectionsSchemas,
//     (template, sections) => template?.sections?.map(x => sections[x]).filter(x => !!x) || []
// );

// const currentSectionSchemaForAdding = createSelector(
//     selectCurrentSectionForAdding,
//     selectSectionsSchemas,
//     (section, schemas) => section ? schemas[section.type] : null
// );

// const currentSectionBlocksSchemas = createSelector(
//     currentSectionSchemaForAdding,
//     selectBlocksSchemas,
//     selectSectionsSchemas,
//     (sectionSchema, blocksSchemas, sectionsSchemas) => sectionSchema
//         ? (sectionSchema.blocks || []).map(blockName => blocksSchemas[blockName] || sectionsSchemas[blockName]).filter(x => !!x)
//         : []
// );

// export const selectAvailableSectionsForAdding = createSelector(
//     selectCurrentSectionIndexForAdding,
//     currentTemplateSectionsSchemas,
//     currentSectionBlocksSchemas,
//     (sectionIndex,  sectionsSchemas, blocksSchemas) => sectionIndex !== false
//         ? (sectionIndex === true ? sectionsSchemas : blocksSchemas)
//         : []
// );

// export const selectAllSectionsSchemas = createSelector(
//     selectFeature,
//     state => state.sections
// );

// export const selectAllBlocksSchemas = createSelector(
//     selectFeature,
//     state => state.blocks
// );
