import { createSelector } from "@ngrx/store";

import { ActionButtonDescriptor } from '@core/models';
import {
    selectTemplateUIState,
    selectCurrentSectionsFilter
} from './common';

import { SectionStatesList, SectionState } from '@editor/models';
import { EditorModuleInfo } from '@models/modules';

import * as fromRoute from '@shared/routing';
import * as fromDomain from "./domain";
import * as fromData from "./data";
import * as fromShared from '@shared/store';

import { helpers } from "@editor/helpers";

export const selectAddItemTitle = createSelector(
    fromData.selectSectionModelFromRoute,
    fromData.selectCurrentSchemaForEdit,
    (section, schema) => {
        if (!section)
            return 'Add block';
            // return 'Add section';
        const name = helpers.getSectionName(section, schema || null, 'section');
        const result = `Add block to '${name}'`;
        return result;
    }
);

export const isLoading = createSelector(
    selectTemplateUIState,
    state => state.isTemplateLoading || state.isSchemasLoading
);

export const selectSectionGroupStates = createSelector(
    selectTemplateUIState,
    state => state.states
);

export const selectPreviewItemType = createSelector(
    selectTemplateUIState,
    state => state.previewItemType
);

export const selectCurrentDragSection = createSelector(
    selectTemplateUIState,
    state => state.dragSectionId
);

export const selectSectionsState = createSelector(
    fromDomain.selectCurrentTemplateState,
    fromData.selectCurrentTemplateModel,
    fromData.selectSectionsSchemas,
    selectCurrentDragSection,
    (state, model, schemas, dragSectionId) => (schemas && model?.content.filter(x => x.type && x.id).reduce((result, section) => {
        const canHaveChildren = (schemas[section.type]?.blocks?.length || 0) > 0;
        // const expanded =
        //     !!dragSectionId
        //         ? false
        //         : state?.sections[section.id]?.expanded === undefined
        //             ? canHaveChildren
        //             : state?.sections[section.id]?.expanded;
        return <SectionStatesList>{
            ...result,
            [section.id]: <SectionState>{
                expanded: canHaveChildren,
                canHaveChildren,
                ...state?.sections[section.id],
            }
        };
    }, {})) || <SectionStatesList>{}
);

export const editTemplateContext = createSelector(
    fromData.selectCurrentTemplateModel,
    fromDomain.selectCurrentTemplateState,
    selectSectionsState,
    fromData.selectSectionsSchemas,
    fromData.selectBlocksSchemas,
    fromData.selectTemplateSettings,
    fromData.selectCurrentTemplateSettingsSchemas,
    (template, templateState, sectionsState, sectionsSchemas, blocksSchemas, settings, settingsSchemas) => {
        const result = template && sectionsSchemas && blocksSchemas
            ? {
                template, templateState, sectionsState, sectionsSchemas, blocksSchemas, settings, settingsSchemas
            }
            : null;
        return result;
    }
);

export const selectAddItemContext = createSelector(
    fromData.selectGroupedSectionSchemas,
    selectSectionGroupStates,
    selectPreviewItemType,
    selectCurrentSectionsFilter,
    fromData.selectSectionModelFromRoute,
    ({ groups, items }, states, previewItemType, filter, section) => ({
        groups,
        items,
        parentSection: section,
        states: {
            groups: groups.reduce((acc, value) => ({
                ...acc,
                [value.name]: <any>{
                    ...states[value.name],
                    opened: states[value.name]?.opened || !!filter
                },
            }), <any>{}),
            previewItemType
        },
    })
);

const isEditSettings = createSelector(
    fromRoute.getModeName,
    mode => mode === EditorModuleInfo.mode.editSettings // means page (or template) settings, static block
);

export const selectCurrentItemName = createSelector(
    fromData.selectBlockModelFromRoute,
    fromData.selectSectionModelFromRoute,
    fromData.selectSettingsFromRoute,
    fromData.selectCurrentSchemaForEdit,
    (block, section, settings, schema) => {
        const defaultName = !!settings
            ? (<string>schema?.['name'] || 'settings')
            : (block ? 'current block' : 'current section');
        const name = helpers.getSectionName(block || section || settings || null, schema || null, defaultName);
        return 'Edit ' + name;
    }
);

export const selectEditSectionContext = createSelector(
    fromData.selectBlockModelFromRoute,
    fromData.selectSectionModelFromRoute,
    fromData.selectBlockSchemaFromRoute,
    fromData.selectSectionSchemaFromRoute,
    fromData.selectCurrentItemForEdit,
    fromData.selectCurrentSchemaForEdit,
    fromData.selectCurrentTemplateModel,
    fromData.selectObjectsSchemas,
    isEditSettings,
    (block, section, blockSchema, sectionSchema, model, schema, template, objects, isSettings) => !!schema && !!model
        ? <any>{
            block, section, blockSchema, sectionSchema, schema, model,
            isEditSettings: isSettings,
            editContext: {
                model, // current item under editing, can be block, section or settings
                block, // current block or null
                section, // current section, useful in block
                template // current template
            }
        }
        : null
);

export const changeTemplateContext = createSelector(
    fromData.selectCurrentTemplateModel,
    fromData.selectSectionModelFromRoute,
    fromData.selectBlockModelFromRoute,
    fromData.selectSectionsSchemas,
    fromData.selectBlocksSchemas,
    fromRoute.selectTemplateKeyParameter,
    fromRoute.selectSectionIdParameter,
    fromRoute.selectBlockIdParameter,
    fromShared.selectCurrentTemplateEntry,
    (template, section, block, sectionsSchemas, blocksSchemas, templateKey, sectionId, blockId, templateEntry) =>
        ({ template, section, block, sectionsSchemas, blocksSchemas, templateKey, sectionId, blockId, templateEntry })
);

export const selectToolbarButtonsState = (useTheme: boolean, useDrafts: boolean) => createSelector(
    // fromDomain.selectCurrentTemplateState,
    fromShared.hasDirty,
    fromDomain.selectCurrentTemplateState,
    // todo: undo
    // todo: redo
    // todo: have settings
    (hasDirty, state) => {
        const result = <ActionButtonDescriptor[][]>[];
        if (useTheme) {
            result.push([
                {
                    icon: 'settings',
                    alias: 'theme-settings',
                    title: 'Theme settings',
                    type: 'outline'
                }
            ]);
        }

        if (useDrafts && !state?.isLoading && !state?.error) {
            result.push([
                {
                    canAction: !hasDirty && state?.published && !state?.hasChanges,
                    icon: 'unpublished',
                    alias: 'unpublish',
                    title: 'Unpublish',
                    type: 'outline'
                },
                {
                    canAction: !hasDirty && state?.hasChanges,
                    icon: 'publish',
                    alias: 'publish',
                    title: 'Publish',
                    type: 'outline'
                },
            ]);
        }

        // [
        //     {
        //         alias: 'preview',
        //         title: 'Preview',
        //         type: 'outline'
        //     }
        // ],
        // [
        //     {
        //         canAction: false,
        //         icon: 'undo',
        //         alias: 'undo'
        //     },
        //     {
        //         canAction: false,
        //         icon: 'redo',
        //         alias: 'redo'
        //     }
        // ],

        result.push([
            {
                canAction: hasDirty,
                title: 'Save',
                alias: 'save',
                type: 'primary'
            }
        ]);

        return result;
    }
);
