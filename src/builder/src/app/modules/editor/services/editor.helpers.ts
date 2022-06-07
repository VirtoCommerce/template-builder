import { cloneDeep } from 'lodash-es';
import { appHelpers } from '@core/services';
import { SectionModel, SectionPropertyDescriptor, SectionSchema } from '@core/models';
import {
    SectionsSchemasList,
    TemplateModel,
    // TemplatesList,
    TemplateSchema,
    // SectionsSchemasList
} from '@editor/models';

// todo: refactor these
// replace section/block in collection can be extracted and done with lodash

export function addItemToTemplate(schema: SectionSchema, template: TemplateModel, section: SectionModel | null): TemplateModel {
    const model = generateModelBySchema(schema);
    model.id = generateSectionId(model); // id generator center requried

    if (!section) {
        return {
            ...template,
            content: [
                ...template.content,
                model
            ]
        };
    } else {
        const sectionIndex = template.content.findIndex(item => item.id === section.id);
        if (sectionIndex === -1) {
            return template;
        }
        return {
            ...template,
            content: [
                ...template.content.slice(0, sectionIndex),
                {
                    ...section,
                    blocks: [
                        ...section.blocks,
                        model
                    ]
                },
                ...template.content.slice(sectionIndex + 1)
            ]
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

export function duplicateBlock(template: TemplateModel, sectionId: string, blockId: string): TemplateModel {
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
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex),
            newSection,
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

export function duplicateSection(template: TemplateModel, sectionId: string): TemplateModel {
    const sectionIndex = template.content.findIndex(item => item.id === sectionId);
    const section = template.content[sectionIndex];
    const newSection = { ...section, id: generateSectionId(section, true) };
    return {
        ...template,
        content: [
            ...template.content.slice(0, sectionIndex + 1),
            newSection,
            ...template.content.slice(sectionIndex + 1)
        ]
    };
}

function generateModelBySettings(settings: SectionPropertyDescriptor[], mode: 'default' | 'preview' = 'default'): any {
    // todo: consder object and collections too
    return (settings || []).reduce((result, value) => ({
        ...result,
        [value.id]: value[mode] || value['default']
    }), {});
}


// export function getTemplateName(templateSchema: TemplateSchema | null, key: string | null = null) {
//     return templateSchema?.name || key || 'Select template';
// }

export function prepareTemplate(template: TemplateModel): TemplateModel {
    return {
        ...template,
        content: template?.content.map(section => ({
            ...section,
            id: generateSectionId(section),
            blocks: section.blocks?.map((block, jndex) => ({
                ...block,
                id: generateSectionId(block)
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
    return item.type || '[no name]';
}

// export function addNewItemToList(items: SectionModel[], schema: SectionSchema, currentSection: number | boolean)
//     : { items: SectionModel[], indexes: { sectionIndex: number, blockIndex: number | null } } {
//     const result = <SectionModel>{ type: schema.type, __index: items.length + 1, ...schema.default };
//     result.__id = generateItemId(result);
//     schema.settings.forEach(item => {
//         if (item.default !== undefined) {
//             result[item.id] = item.default;
//         }
//     });

//     if (currentSection === true) {
//         return {
//             items: [...items, result],
//             indexes: { sectionIndex: result.__index, blockIndex: null }
//         };
//     }
//     return {
//         items: items.map(x => x.__index === currentSection ? { ...x, blocks: [...x.blocks, result] } : x),
//         indexes: { sectionIndex: <number>currentSection, blockIndex: result.__index }
//     }
// }

// export function removeItemFromList(items: SectionModel[], section: SectionModel, block: SectionModel | null): SectionModel[] {

//     if (block === null) {
//         const index = items.findIndex(x => x.__index === section.__index);
//         const result = [
//             ...items.slice(0, index),
//             ...items.slice(index + 1),
//         ];
//         return reindexItems(result);
//     } else {
//         const sectionIndex = items.findIndex(x => x.__index === section.__index);
//         const blockIndex = section.blocks.findIndex(x => x.__index === block.__index);
//         const result = [
//             ...items.slice(0, sectionIndex),
//             {
//                 ...section,
//                 blocks: reindexItems([
//                     ...section.blocks.slice(0, blockIndex),
//                     ...section.blocks.slice(blockIndex + 1)
//                 ])
//             },
//             ...items.slice(sectionIndex + 1)
//         ];
//         return result;
//     }

// }

// export function cloneItem(items: SectionModel[], section: SectionModel, block: SectionModel | null)
//     : { items: SectionModel[], sectionIndex: number, blockIndex: number | null } {
//     if (block === null) {

//         const index = items.findIndex(x => x.__index === section.__index);
//         const newSection = cloneDeep(section);
//         newSection.__id = generateItemId(section, true);
//         if (newSection.blocks) {
//             newSection.blocks = newSection.blocks.map(x => ({ ...x, __id: generateItemId(x, true) }));
//         }
//         const result = [
//             ...items.slice(0, index + 1),
//             newSection,
//             ...items.slice(index + 1)
//         ];
//         return {
//             items: reindexItems(result),
//             sectionIndex: index + 1,
//             blockIndex: null
//         };

//     } else {
//         const sectionIndex = items.findIndex(x => x.__index === section.__index);
//         const blockIndex = section.blocks.findIndex(x => x.__index === block.__index);
//         const result = [
//             ...items.slice(0, sectionIndex),
//             {
//                 ...section,
//                 blocks: reindexItems([
//                     ...section.blocks.slice(0, blockIndex + 1),
//                     {
//                         ...cloneDeep(block),
//                         __id: generateItemId(block, true)
//                     },
//                     ...section.blocks.slice(blockIndex + 1)
//                 ])
//             },
//             ...items.slice(sectionIndex + 1)
//         ];
//         return {
//             items: result,
//             sectionIndex: sectionIndex,
//             blockIndex: blockIndex + 1
//         };
//     }
// }

// export function replaceItem(items: SectionModel[], section: SectionModel, block: SectionModel | null, item: SectionModel): SectionModel[] {
//     return updateItemByIndex(items, section.__index, block === null ? null : block.__index, item);
// }

// export function updateItemByIndex(items: SectionModel[], sectionIndex: number, blockIndex: number | null, item: Partial<SectionModel>): SectionModel[] {
//     if (blockIndex === null) {

//         const index = items.findIndex(x => x.__index === sectionIndex);
//         const currentItem = items[index];
//         const result = [
//             ...items.slice(0, index),
//             <SectionModel>{ ...currentItem, ...item },
//             ...items.slice(index + 1)
//         ];
//         return result;

//     } else {
//         const _sectionIndex = items.findIndex(x => x.__index === sectionIndex);
//         const section = items[_sectionIndex];
//         const _blockIndex = section.blocks.findIndex(x => x.__index === blockIndex);
//         const block = section.blocks[_blockIndex];
//         const result = [
//             ...items.slice(0, sectionIndex),
//             {
//                 ...section,
//                 blocks: reindexItems([
//                     ...section.blocks.slice(0, blockIndex),
//                     <SectionModel>{ ...block, ...item },
//                     ...section.blocks.slice(blockIndex + 1)
//                 ])
//             },
//             ...items.slice(sectionIndex + 1)
//         ];
//         return result;
//     }
// }

// export function prepareSections(sections: any /* SectionsSchemasList */): any /* SectionsSchemasList */ {
//     return Object.keys(sections).reduce((acc, key) => ({ ...acc, [key]: { ...sections[key], type: key } }), {})
// }

// export function prepareBlocks(blocks: any /* SectionsSchemasList */): any /* SectionsSchemasList */ {
//     return Object.keys(blocks).reduce((acc, key) => ({ ...acc, [key]: { ...blocks[key], type: key } }), {})
// }

// function generateItemId(item: SectionModel, force: boolean = false): string {
//     if (item.__id && !force) {
//         return item.__id;
//     }
//     return appHelpers.onlyLettersAndDigits(`${item.type}${appHelpers.generateUniqueString(4)}`);
// }

// function reindexItems(sections: SectionModel[]): SectionModel[] {
//     return sections.map((x, index) => ({ ...x, __index: index }));
// }
