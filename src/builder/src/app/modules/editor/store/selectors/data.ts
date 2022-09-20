import { TemplateEntry } from '@shared/models';
import { SectionModel, SectionSchema } from '@models/index';
import { createSelector } from '@ngrx/store';

import { selectTemplateParameter } from '@shared/routing';
import { selectTemplateDataState, selectCurrentSectionsFilter } from './common';

import { SectionsSchemasList } from '@editor/models';
import { appHelpers } from '@integration/helpers';
import { coreHelpers } from '@core/helpers';
import { helpers } from '@editor/helpers';

import * as fromRoute from '@shared/routing/selectors';
import * as fromShared from '@shared/store/selectors';

export const selectLoadedTemplates = createSelector(
    selectTemplateDataState,
    state => state.templates
);

export const selectCurrentTemplateModel = createSelector(
    selectLoadedTemplates,
    selectTemplateParameter,
    (templates, alias) => alias ? templates[alias] : null
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

export const selectChangedTemplates = createSelector(
    selectLoadedTemplates, // models
    fromShared.selectChangedTemplates, // entries
    (templates, entries) => entries.map(x => ({ entry: x.entry, info: x, content: templates[x.alias] })).filter(x => !!x.content)
);

export const selectSectionsSchemasList = createSelector(
    selectSectionsSchemas,
    sections => Object.keys(sections).map(key => ({ ...sections[key], alias: key }))
);

export const selectBlocksSchemas = createSelector(
    selectTemplateDataState,
    state => state.schemas?.blocks || {}
);

export const selectSharedSchemas = createSelector(
    selectTemplateDataState,
    state => state.schemas?.shared || {}
);

export const selectTemplateSettings = createSelector(
    selectCurrentTemplateModel,
    template => template?.settings || <SectionModel>{}
);

export const selectBlocksSchemasList = createSelector(
    selectBlocksSchemas,
    blocks => Object.keys(blocks).map(key => blocks[key])
);

const selectCurrentTemplateAllSectionsSchemas = createSelector(
    selectSectionsSchemas,
    fromShared.selectCurrentTemplateEntry,
    (schemas, entry) => entry.sections
        ? entry.sections.map(type => ({ ...schemas[type], type })).filter(x => !!x)
        : appHelpers.toList(schemas, 'type')
);

const selectCurrentTemplateEmbeddedSettingsSchemas = createSelector(
    fromShared.selectCurrentTemplateEntry,
    (entry: TemplateEntry) => entry.settings && entry.settings.length
        ? <SectionSchema>{
            // todo: should it be in config?
            icon: 'construction',
            type: '',
            name: 'Settings',
            displayField: 'default',
            settings: entry.settings
        }
        : null
);

export const selectCurrentTemplateSettingsSchemas = createSelector(
    selectCurrentTemplateAllSectionsSchemas,
    selectCurrentTemplateEmbeddedSettingsSchemas,
    (schemas, entry) => ({
        top: [entry, ...schemas.filter(x => x.static === true || x.static === 'top')].filter(x => !!x),
        bottom: schemas.filter(x => x.static === 'bottom')
    })
);

export const selectCurrentTemplateSectionsSchemas = createSelector(
    selectCurrentTemplateAllSectionsSchemas,
    schemas => schemas.filter(x => !x.static)
);

export const selectSettingsFromRoute = createSelector(
    fromRoute.selectSettingsTypeParameter,
    selectCurrentTemplateModel,
    (settingsType, template) => settingsType === null
        ? null
        : template?.settings
);

export const selectSettingsSchemaFromRoute = createSelector(
    fromRoute.selectSettingsTypeParameter,
    selectSectionsSchemas,
    selectCurrentTemplateEmbeddedSettingsSchemas,
    (settingsType, schemas, settingsSchema) => settingsType === null
        ? null
        : settingsType === '' ? settingsSchema : schemas[settingsType]
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
    selectSharedSchemas,
    (section, schemas, shared) => section && helpers.prepareSchema(schemas[section.type], shared, '_sections')
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
    selectSharedSchemas,
    (model, blocksSchemas, sectionsSchemas, shared) =>
        model && (helpers.prepareSchema(blocksSchemas[model.type] || sectionsSchemas[model.type], shared, '_blocks'))
);

export const selectCurrentItemForEdit = createSelector(
    selectBlockModelFromRoute,
    selectSectionModelFromRoute,
    selectSettingsFromRoute,
    (block, section, settings) => block || section || settings
);

export const selectCurrentSchemaForEdit = createSelector(
    selectBlockSchemaFromRoute,
    selectSectionSchemaFromRoute,
    selectSettingsSchemaFromRoute,
    (block, section, settings) => block || section || settings
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
    selectCurrentTemplateSectionsSchemas,
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
        const groups = coreHelpers.groupSections(sections);
        return {
            groups: groups.filter(x => x.items.length && !x.noname),
            items: groups.find(x => x.noname)?.items || []
        }
    }
);
