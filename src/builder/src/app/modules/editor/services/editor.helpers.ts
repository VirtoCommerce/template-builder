import { appHelpers } from '@shared/services';
import { SectionModel } from '@shared/models';
import { TemplateModel, TemplatesList, TemplateSchema } from '@editor/models';

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

function generateItemId(item: SectionModel, force: boolean = false): string {
    if (item.__id && !force) {
        return item.__id;
    }
    return appHelpers.onlyLettersAndDigits(`${item.type}${appHelpers.generateUniqueString(4)}`);
}
