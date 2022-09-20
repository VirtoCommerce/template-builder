import { TypedAction } from "@ngrx/store/src/models";

import * as editorHelpers from './editor.helpers';
import * as actions from "@editor/store/actions";
import * as sharedActions from "@shared/store/actions";

export function pasteDataIntoTemplate(
    action: any, // actions.pasteFromClipboard
    context: any // selectors.changeTemplateContext
): TypedAction<any>[] {
    const value = action.value;
    const { template, sectionsSchemas, templateId, templateEntry } = context;
    const direction = action.action === 'paste-after'
        ? 1 // after
        : action.action === 'paste-before'
            ? 0 // before
            : -1; // to end of list
    if (value.wrongData !== true) {

        // case when we paste block after or before section
        // it's a wrong case, therefore we must display paste window
        if (!!action.section && !action.block && value.type === 'block' && action.action !== 'paste-block') {
            return [
                sharedActions.showNotification({
                    message: `Block can be inserted into section only`,
                    msgType: 'info'
                }),
                actions.showClipboardModal({ ...action })
            ];
        }
        // paste block after or before
        else if (!!action.section && value.type === 'block') {
            return pasteBlockIntoSection(action, sectionsSchemas, template, templateId, value, direction);
        }
        // paste section after or before
        if (value.type === 'section') {
            return pasteSectionIntoTemplate(action, sectionsSchemas, templateEntry, template, templateId, value, direction);
        }
    }
    return [
        sharedActions.showNotification({
            message: `Incorrect data in clipboard`,
            msgType: 'info'
        }),
        actions.showClipboardModal({ ...action })
    ];
}

function pasteBlockIntoSection(
    action: any,
    sectionsSchemas: any,
    template: any,
    templateId: string,
    value: any,
    direction: number
): TypedAction<any>[] {
    let accept = false;
    try {
        const blocks = sectionsSchemas[action.section.type].blocks;
        accept = !!(blocks && blocks.includes(value.content.type));
    } catch (error) {
        console.log(error);
    }

    if (accept) {
        const changedTemplate = editorHelpers.insertBlock(template!, action.section.id, action.block?.id || null, value.content, direction);
        return [
            actions.updateTemplateAction({
                template: changedTemplate.template,
                alias: templateId
            }),
            sharedActions.showNotification({
                message: 'Block pasted',
                msgType: 'info'
            }),
            ...action.source === 'editor'
                ? [actions.editBlockAction({ sectionId: changedTemplate.sectionId, blockId: changedTemplate.blockId! })]
                : []
        ];
    } else {
        return [
            sharedActions.showNotification({
                message: `Section ${action.section.type} cannot contain block ${value.content.type}`,
                msgType: 'error'
            }),
            actions.showClipboardModal({ ...action })
        ];
    }
}

function pasteSectionIntoTemplate(
    action: any,
    sectionsSchemas: any,
    templateEntry: any,
    template: any,
    templateId: string,
    value: any,
    direction: number
): TypedAction<any>[] {
    if ((!action.section || !!sectionsSchemas[action.section.type]) &&
        (!templateEntry.sections || !templateEntry.sections.length || templateEntry.sections?.includes(value.content.type))) {
        const changedTemplate = editorHelpers.insertSection(template!, action.section?.id || null, value.content, direction);
        return [
            actions.updateTemplateAction({
                template: changedTemplate.template,
                alias: templateId
            }),
            sharedActions.showNotification({
                message: 'Section pasted',
                msgType: 'info'
            }),
            ...action.source === 'editor'
                ? [actions.editSectionAction({ sectionId: changedTemplate.sectionId })]
                : []

        ];
    } else {
        return [
            sharedActions.showNotification({
                message: `Template ${templateEntry.alias} cannot contain section ${value.content.type}`,
                msgType: 'error'
            }),
            actions.showClipboardModal({ ...action })
        ];
    }
}
