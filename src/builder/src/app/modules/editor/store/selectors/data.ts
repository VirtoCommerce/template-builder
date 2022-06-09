import { createSelector } from "@ngrx/store";

import { selectTemplateParameter } from '@shared/routing';
import { selectTemplateDataState, selectCurrentSectionsFilter } from "./common";

import { SectionsSchemasList } from '@editor/models';
import { appHelpers } from "@core/helpers";

import * as fromRoute from '@shared/routing/selectors';
import * as fromShared from '@shared/store/selectors';

export const selectCurrentTemplateModel = createSelector(
    selectTemplateDataState,
    selectTemplateParameter,
    (state, alias) => alias ? state.templates[alias] : null
);

export const selectCurrentTemplateName = createSelector(
    selectCurrentTemplateModel,
    model => model?.settings?.['name'] || '[no name]'
);

export const selectSectionsSchemas = createSelector(
    selectTemplateDataState,
    state => state.schemas
        && <SectionsSchemasList>appHelpers.spreadPropertyByOther(state.schemas.sections, 'group', 'groupIcon')
        || {}
);

export const selectSectionsSchemasList = createSelector(
    selectSectionsSchemas,
    sections => Object.keys(sections).map(key => ({ ...sections[key], alias: key }))
);

export const selectBlocksSchemas = createSelector(
    selectTemplateDataState,
    state => state.schemas?.blocks || {}
);

export const selectBlocksSchemasList = createSelector(
    selectBlocksSchemas,
    blocks => Object.keys(blocks).map(key => blocks[key])
);

export const selectCurrentTemplateSectionSchemas = createSelector(
    selectSectionsSchemas,
    fromShared.selectCurrentTemplateEntry,
    (schemas, entry) => entry.sections
        ? entry.sections.map(type => ({ ...schemas[type], type })).filter(x => !!x)
        : appHelpers.toList(schemas, 'type')
);

export const selectSectionModelFromRoute = createSelector(
    fromRoute.selectSectionIdParameter,
    selectCurrentTemplateModel,
    (sectionId, template) => sectionId
        ? template?.content.find(x => x.id === sectionId)
        : null
);

export const selectSectionSchemaFromRoute = createSelector(
    selectSectionModelFromRoute,
    selectSectionsSchemas,
    (section, schemas) => section && schemas[section.type]
);

export const selectBlockModelFromRoute = createSelector(
    fromRoute.selectBlockIdParameter,
    selectSectionModelFromRoute,
    (blockId, section) => section && blockId
        ? section.blocks.find(x => x.id === blockId)
        : null
);

export const selectBlockSchemaFromRoute = createSelector(
    selectBlockModelFromRoute,
    selectBlocksSchemas,
    selectSectionsSchemas,
    (model, blocksSchemas, sectionsSchemas) =>
        model && (blocksSchemas[model.type] || sectionsSchemas[model.type])
);

export const selectCurrentItemForEdit = createSelector(
    selectBlockModelFromRoute,
    selectSectionModelFromRoute,
    (block, section) => block || section
);

export const selectCurrentSchemaForEdit = createSelector(
    selectBlockSchemaFromRoute,
    selectSectionSchemaFromRoute,
    (block, section) => block || section
);

const selectSectionBlockSchemasFromRoute = createSelector(
    selectSectionModelFromRoute,
    selectBlocksSchemas,
    selectSectionsSchemas,
    (section, blocksSchemas, sectionsSchemas) => section
        ? sectionsSchemas[section.type].blocks?.map(type => ({ ...blocksSchemas[type], type }))
        : null
);

const selectCurrentItemsSchemas = createSelector(
    selectCurrentTemplateSectionSchemas,
    selectSectionBlockSchemasFromRoute,
    (sectionSchemas, blockSchemas) => blockSchemas || sectionSchemas
);

export const selectCurrentFilteredSectionSchemas = createSelector(
    selectCurrentItemsSchemas,
    selectCurrentSectionsFilter,
    (sections, filter) => filter
        ? sections.filter(x => x.type.toUpperCase().indexOf(filter.toUpperCase()) !== -1)
        : sections
);

export const selectGroupedSectionSchemas = createSelector(
    selectCurrentFilteredSectionSchemas,
    sections => {
        const groups = appHelpers.groupSections(sections);
        return {
            groups: groups.filter(x => x.items.length && !x.noname),
            items: groups.find(x => x.noname)?.items || []
        }
    }
);
