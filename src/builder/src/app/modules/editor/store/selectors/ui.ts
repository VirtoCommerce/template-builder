import { createSelector } from "@ngrx/store";

import { ActionButtonDescriptor } from '@core/models';
import {
    selectTemplateUIState,
    selectCurrentSectionsFilter
} from './common';

import { SectionStatesList, SectionState } from '@editor/models';

import * as fromDomain from "./domain";
import * as fromData from "./data";

export const selectAddItemTitle = createSelector(
    fromData.selectSectionModelFromRoute,
    section => !section
        ? 'Add section'
        : `Add block to '${section['name']}'` // todo: must be property that displayed in sections list
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
    (template, templateState, sectionsState, sectionsSchemas, blocksSchemas) => (
        template && sectionsSchemas && blocksSchemas
            ? {
                template, templateState, sectionsState, sectionsSchemas, blocksSchemas
            }
            : null
    )
);

export const selectAddItemContext = createSelector(
    fromData.selectGroupedSectionSchemas,
    selectSectionGroupStates,
    selectPreviewItemType,
    selectCurrentSectionsFilter,
    ({ groups, items }, states, previewItemType, filter) => ({
        groups,
        items,
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

export const selectCurrentItemName = createSelector(
    fromData.selectBlockModelFromRoute,
    // fromData.selectSectionModelFromRoute,
    (block /*, section*/) => block ? 'Edit current block' : 'Edit current section'
);

// export const selectCurrentItemActions = createSelector(

// );

export const selectEditSectionContext = createSelector(
    fromData.selectCurrentItemForEdit,
    fromData.selectCurrentSchemaForEdit,
    (model, schema) => <any>{
        schema: schema,
        section: model,
        editContext: {}
    }
);

export const selectToolbarButtonsState = createSelector(
    fromDomain.selectCurrentTemplateState,
    // todo: undo
    // todo: redo
    // todo: have settings
    state => <ActionButtonDescriptor[][]>([
        [
            {
                icon: 'settings',
                alias: 'theme-settings',
                title: 'Theme settings',
                type: 'outline'
            }
        ],
        [
            {
                canAction: false,
                icon: 'undo',
                alias: 'undo'
            },
            {
                canAction: false,
                icon: 'redo',
                alias: 'redo'
            }
        ],
        [
            {
                canAction: state?.isDirty,
                title: 'Save',
                alias: 'save',
                type: 'primary'
            }
        ]
    ])
);
