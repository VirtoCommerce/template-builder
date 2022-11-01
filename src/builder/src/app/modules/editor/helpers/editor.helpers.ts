import { appHelpers } from '@integration/helpers';
import { SectionPropertyDescriptor } from '@models/controls';
import { SectionModel, SectionSchema, TemplateModel } from '@models/document';
import {
    ObjectsSchemasList,
    SectionsSchemasList,
    // TemplatesList,
    // TemplateSchema,
    // SectionsSchemasList
} from '@editor/models';

// todo: refactor these
// replace section/block in collection can be extracted and done with lodash

export function addItemToTemplate(schema: SectionSchema, template: TemplateModel, section: SectionModel | null): {
    template: TemplateModel,
    sectionId: string,
    blockId?: string
} {
    const model = generateModelBySchema(schema);
    model.id = generateSectionId(model); // id generator center requried

    if (!section) {
        return {
            template: {
                ...template,
                content: [
                    ...template.content,
                    model
                ]
            },
            sectionId: model.id
        };
    } else {
        const sectionIndex = template.content.findIndex(item => item.id === section.id);
        if (sectionIndex === -1) {
            return { template, sectionId: section.id };
        }
        const blocks = section.blocks || [];
        return {
            template: {
                ...template,
                content: [
                    ...template.content.slice(0, sectionIndex),
                    {
                        ...section,
                        blocks: [
                            ...blocks,
                            model
                        ]
                    },
                    ...template.content.slice(sectionIndex + 1)
                ]
            },
            sectionId: section.id,
            blockId: model.id
        };
    }
}

function reorderSectionsInList(list: SectionModel[], currentIndex: number, previousIndex: number): SectionModel[] {
    const newList = [...list];
    const item = newList[previousIndex];
    newList.splice(previousIndex, 1);
    newList.splice(currentIndex, 0, item);
    return newList;
}

export function reorderSections(template: TemplateModel, currentIndex: number, previousIndex: number): TemplateModel {
    return {
        ...template,
        content: reorderSectionsInList(template.content, currentIndex, previousIndex)
    };
}

export function reorderBlocks(template: TemplateModel, section: SectionModel, currentIndex: number, previousIndex: number): TemplateModel {
    const sectionIndex = template.content.findIndex(item => item.id === section.id);
    return {
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex),
            {
                ...section,
                blocks: reorderSectionsInList(section.blocks, currentIndex, previousIndex)
            },
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

export function generateSectionId(section: SectionModel, force: boolean = false): string {
    if (!force && section.id) {
        return section.id;
    }
    return appHelpers.onlyLettersAndDigits(`${section.type}${appHelpers.generateUniqueString(4)}`);
}

export function generateModelBySchema(schema: SectionSchema): SectionModel {
    const result: SectionModel = {
        ...schema.default,
        ...generateModelBySettings(schema.settings, 'default'),
        type: schema.type
    };
    return result;
}

export function generatePreviewBySchema(schema: SectionSchema): SectionModel {
    const result: SectionModel = {
        ...schema.preview || schema.default,
        ...generateModelBySettings(schema.settings, 'preview'),
        type: schema.type
    };
    return result;
}

export function applySectionChanges(template: TemplateModel, changes: Partial<SectionModel>, sectionId: string): TemplateModel {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    const section = template.content[sectionIndex];
    return {
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex),
            <SectionModel>{
                ...section,
                ...changes
            },
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

export function applySettingsChanges(template: TemplateModel, changes: Partial<SectionModel>): TemplateModel {
    return {
        ...template,
        settings: <SectionModel>{
            ...template.settings,
            ...changes
        }
    }
}

export function applyBlockChanges(template: TemplateModel, changes: Partial<SectionModel>, sectionId: string, blockId: string): TemplateModel {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    const section = template.content[sectionIndex];
    const blockIndex = section.blocks.findIndex(item => item.id === blockId);
    const block = section.blocks[blockIndex];
    const newSection = {
        ...section,
        blocks: [
            ...section.blocks.slice(0, blockIndex),
            <SectionModel>{
                ...block,
                ...changes
            },
            ...section.blocks.slice(blockIndex + 1)
        ]
    };
    return {
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex),
            newSection,
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

export function duplicateBlock(
    template: TemplateModel,
    sectionId: string,
    blockId?: string): {
        template: TemplateModel,
        sectionId: string,
        blockId: string
    } {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    const section = template.content[sectionIndex];
    const blockIndex = section.blocks.findIndex(item => item.id === blockId);
    const block = section.blocks[blockIndex];
    const newBlock = { ...block, id: generateSectionId(block, true) };
    const newSection = {
        ...section,
        blocks: [
            ...section.blocks.slice(0, blockIndex + 1),
            newBlock,
            ...section.blocks.slice(blockIndex + 1)
        ]
    };
    return {
        template: {
            ...template,
            content: [
                ...template.content.slice(0, sectionIndex),
                newSection,
                ...template.content.slice(sectionIndex + 1)
            ]
        },
        sectionId,
        blockId: newBlock.id
    };
}

export function duplicateSection(template: TemplateModel, sectionId: string): {
    template: TemplateModel,
    sectionId: string,
    blockId?: string
} {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    const section = template.content[sectionIndex];
    const newSection = { ...section, id: generateSectionId(section, true) };
    return {
        template: {
            ...template,
            content: [
                ...template.content.slice(0, sectionIndex + 1),
                newSection,
                ...template.content.slice(sectionIndex + 1)
            ]
        },
        sectionId: newSection.id
    };
}

export function removeBlock(template: TemplateModel, sectionId: string, blockId: string): TemplateModel {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    const section = template.content[sectionIndex];
    const blockIndex = section.blocks.findIndex(item => item.id === blockId);
    const newSection = {
        ...section,
        blocks: [
            ...section.blocks.slice(0, blockIndex),
            ...section.blocks.slice(blockIndex + 1)
        ]
    };
    return {
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex),
            newSection,
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

export function removeSection(template: TemplateModel, sectionId: string): TemplateModel {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    return {
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex),
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

function generateModelBySettings(settings: SectionPropertyDescriptor[], mode: 'default' | 'preview' = 'default'): any {
    // todo: consder object and collections too
    return (settings || []).map(x => {
        if (isElementType(x) && x.type !== 'list') {
            let e = x as { element: SectionPropertyDescriptor[] };
            let currentValue = x[mode] || x.preview || {};
            let valueFromProps = generateModelBySettings(e.element, mode);
            return {
                ...x,
                [mode]: {
                    ...currentValue,
                    ...valueFromProps
                }
            }
        }
        return x;
    }).reduce((result, value) => {
        let res = result;
        if (value.hasOwnProperty(mode) || value.hasOwnProperty('default')) {
            res = {
                ...res,
                [value.id]: value[mode] || value['default']
            };
        }
        return res;
    }, {});
}


// export function getTemplateName(templateSchema: TemplateSchema | null, key: string | null = null) {
//     return templateSchema?.name || key || 'Select template';
// }

export function prepareTemplate(template: TemplateModel): TemplateModel {
    const result = {
        ...template,
        content: template?.content?.map(section => {
            const res = {
                ...section,
                id: generateSectionId(section)
            };
            if (section.blocks) {
                res.blocks = section.blocks.map((block, jndex) => ({
                    ...block,
                    id: generateSectionId(block)
                }));
            }
            return res;
        }) || []
    };

    return result;
}

export function getSectionName(item: SectionModel | null, schema: SectionSchema | null, defaultValue: string | null = null): string {
    if (!!schema && !!item) {
        if (schema.displayField) {
            const result = item[schema.displayField];
            if (!!result) {
                return <string>result;
            }
        } else {
            const result = <string>item['name'];
            if (!!result) {
                return result;
            }
        }
    }
    return defaultValue || schema?.name || item?.type || '[no name]';
}

export function insertBlock(template: TemplateModel, sectionId: string, blockId: string | null, block: SectionModel, direction: number): {
    template: TemplateModel,
    sectionId: string,
    blockId?: string
} {

    const newBlock = {
        ...block,
        id: generateSectionId(block, true)
    };

    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    if (sectionIndex !== -1) {
        const section = template.content[sectionIndex];
        const blockIndex = direction === -1 ? -1 : section.blocks.findIndex(item => item.id === blockId);
        const blocks = section.blocks || [];
        const newSection = blockIndex !== -1
            ? {
                ...section,
                blocks: [
                    ...blocks.slice(0, blockIndex + direction),
                    newBlock,
                    ...blocks.slice(blockIndex + direction)
                ]
            }
            : {
                ...section,
                blocks: [
                    ...blocks,
                    newBlock
                ]
            };
        return {
            template: {
                ...template,
                content: [
                    ...template.content.slice(0, sectionIndex),
                    newSection,
                    ...template.content.slice(sectionIndex + 1)
                ]
            },
            sectionId,
            blockId: newBlock.id
        };
    }
    return { template, sectionId };
}

export function insertSection(template: TemplateModel, sectionId: string | null, section: SectionModel, direction: number): {
    template: TemplateModel,
    sectionId: string,
    blockId?: string
} {

    const newSection = {
        ...section,
        id: generateSectionId(section, true)
    };

    const sectionIndex = direction === -1 ? -1 : template.content.findIndex(item => item.id === sectionId);
    const changedTemplate = {
        ...template,
        content: sectionIndex !== -1
            ? [
                ...template.content.slice(0, sectionIndex + direction),
                newSection,
                ...template.content.slice(sectionIndex + direction)
            ]
            : [
                ...template.content,
                newSection
            ]
    };
    return {
        template: changedTemplate,
        sectionId: newSection.id
    };
}

function isElementType(setting: SectionPropertyDescriptor): boolean {
    return ['object', 'list', 'images', 'files'].indexOf(setting.type) !== -1 &&
        (!!(<any>setting).element || !!(<any>setting).elementDescriptor);
}

function fillElementProperty(setting: SectionPropertyDescriptor, objects: ObjectsSchemasList): SectionPropertyDescriptor {
    if (!isElementType(setting)) return setting;
    let result = setting as { element: SectionPropertyDescriptor[], elementDescriptor?: string };
    if (!!result.elementDescriptor) {
        const shared = objects[result.elementDescriptor] || { settings: [] };
        const given = result.element || [];
        result = {
            element: [
                ...shared.settings.filter(x => !given.some(y => y.id === x.id)),
                ...given
            ]
        };
    }

    const element = result.element?.map(x => fillElementProperty(x, objects));

    return {
        ...setting,
        element
    };
}

export function prepareSchema(schema: SectionSchema,
    shared: ObjectsSchemasList,
    objects: ObjectsSchemasList,
    itemType: '_sections' | '_blocks'): SectionSchema {
    const result = {
        ...schema,
        settings: [
            ...schema.settings,
            ...(schema.excludeShared !== true ? shared?.[itemType]
                ?.settings?.filter(x => !schema.settings?.find(s => s.id === x.id)) : []) || [],
            ...schema?.includeShared?.map(name => shared?.[name]?.settings)?.flat(1)
                .filter(x => !!x && !schema.settings?.find(s => s.id === x.id)) || [],
        ].filter(x =>
            schema.excludeShared === true || (<string[]>schema.excludeShared || []).indexOf(x.id) === -1
        ).map(x => fillElementProperty(x, objects)).sort((a, b) => {
            if (a.sort !== undefined && b.sort !== undefined) {
                return a.sort - b.sort;
            }
            if (a.sort !== undefined) {
                return -1;
            }
            if (b.sort !== undefined) {
                return 1;
            }
            return 0;
        })
    };
    return result;
}
