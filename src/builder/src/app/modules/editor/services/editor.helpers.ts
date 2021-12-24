import { appHelpers } from '@shared/services';
import { SectionModel } from '@shared/models';
import { TemplateModel, TemplatesList, TemplateSchema, SectionsSchemasList } from '@editor/models';

export function getTemplateName(templateSchema: TemplateSchema | null, key: string | null = null) {
    return templateSchema?.name || key || 'Select template';
}

export function prepareTemplate(template: TemplateModel): TemplateModel {
    return {
        ...template,
        content: template?.content.map((section, index) => ({
            ...section,
            __id: generateItemId(section),
            __index: index,
            blocks: section.blocks?.map((block, jndex) => ({
                ...block,
                __id: generateItemId(block),
                __index: jndex
            }))
        }))
    };
}

export function getSectionName(item: SectionModel, schemas: SectionsSchemasList): string {
    const schema = schemas[item.type];
    if (!!schema) {
        if (schema.displayNameProperty) {
            const result = item[schema.displayNameProperty];
            if (!!result) {
                return <string>result;
            }
        }
    }
    const result = <string>item['name'];
    if (!!result) {
        return result;
    }
    return item.type;

}

export function prepareSections(sections: SectionsSchemasList): SectionsSchemasList {
    return Object.keys(sections).reduce((acc, key) => ({ ...acc, [key]: { ...sections[key], type: key } }), {})
}

export function prepareBlocks(blocks: SectionsSchemasList): SectionsSchemasList {
    return Object.keys(blocks).reduce((acc, key) => ({ ...acc, [key]: { ...blocks[key], type: key } }), {})
}

function generateItemId(item: SectionModel, force: boolean = false): string {
    if (item.__id && !force) {
        return item.__id;
    }
    return appHelpers.onlyLettersAndDigits(`${item.type}${appHelpers.generateUniqueString(4)}`);
}
