import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from, of } from 'rxjs';
import {
    withLatestFrom,
    filter,
    map,
    switchMap,
    tap
} from "rxjs/operators";

import { ModalService } from '@core/services';
import { appHelpers } from "@core/helpers";
import * as sharedActions from "@shared/store/actions";

import { PasteContentComponent } from '@editor/dialogs';
import { helpers as editorHelpers } from '@editor/helpers';

import { BuilderState } from "../state";
import * as actions from "../actions";
import * as selectors from "../selectors";
import { ClipboardService } from "@core/services";

@Injectable({
    providedIn: 'root'
})
export class TemplateEditorDomainEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions,
        private clipboard: ClipboardService,
        private modals: ModalService
    ) { }

    addItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.addItemAction),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template }]) => !!template),
        switchMap(([{ schema }, { template, section, templateId }]) => [
            actions.updateTemplateAction({
                template: editorHelpers.addItemToTemplate(schema, template!, section!), // section can be null
                alias: templateId
            }),
            actions.closeAddItemPanel()
        ])
    ));

    updateEditableModel$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sectionChangedAction),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template }]) => !!template),
        switchMap(([{ changes }, { template, templateId, sectionId, blockId }]) => [
            actions.updateTemplateAction({
                template: blockId
                    ? editorHelpers.applyBlockChanges(template!, changes, sectionId, blockId)
                    : editorHelpers.applySectionChanges(template!, changes, sectionId),
                alias: templateId
            }),
        ])
    ));

    showItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeContextMenuAction),
        filter(x => x.action === 'show' || x.action === 'hide'),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template }]) => !!template),
        map(([{ action, section, block }, { template, templateId, sectionId, blockId }]) => [
            action, template, templateId, sectionId || section?.id, blockId || block?.id
        ]),
        switchMap(([action, template, templateId, sectionId, blockId]) => [
            actions.updateTemplateAction({
                template: blockId
                    ? editorHelpers.applyBlockChanges(template!, { hidden: action === 'hide' }, sectionId, blockId)
                    : editorHelpers.applySectionChanges(template!, { hidden: action === 'hide' }, sectionId),
                alias: templateId
            }),
        ])
    ));

    duplicateItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeContextMenuAction),
        filter(x => x.action === 'duplicate'),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template }]) => !!template),
        map(([{ section, block, source }, { template, templateId, sectionId, blockId }]) => [
            source, template, templateId, sectionId || section?.id, blockId || block?.id
        ]),
        switchMap(([source, template, templateId, sectionId, blockId]) => {
            const changedTemplate = blockId
                ? editorHelpers.duplicateBlock(template!, sectionId, blockId)
                : editorHelpers.duplicateSection(template!, sectionId);
            return [
                actions.updateTemplateAction({
                    template: changedTemplate.template,
                    alias: templateId
                }),
                sharedActions.showNotification({
                    message: changedTemplate.blockId ? 'Block duplicated' : 'Section duplicated',
                    msgType: 'info'
                }),
                ...source === 'editor' ? [
                    changedTemplate.blockId
                        ? actions.editBlockAction({ sectionId: changedTemplate.sectionId, blockId: changedTemplate.blockId })
                        : actions.editSectionAction({ sectionId: changedTemplate.sectionId })
                ] : []
            ]
        })
    ));

    copyItemToClipboard$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeContextMenuAction),
        filter(x => x.action === 'copy'),
        tap(({ section, block }) => {
            this.clipboard.copy({
                content: { ...(block || section) },
                type: block ? 'block' : 'section'
            });
        }),
        map(() => sharedActions.showNotification({
            message: 'Copied to clipboard',
            msgType: 'info'
        }))
    ));

    pasteItemFromClipboardAction$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeContextMenuAction),
        filter(x => x.action === 'paste-after'
            || x.action === 'paste-before'
            || x.action === 'paste-block'
            || x.action === 'paste-section'),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template }]) => !!template),
        switchMap(([{ section, block, action, source }]) =>
            from(this.clipboard.getData()).pipe(
                filter(x => !!x),
                map(data => actions.pasteFromClipboard({ value: data!, section, block, action, source }))
            )
        )
    ));

    pasteFromClipboardAction$ = createEffect(() => this.actions$.pipe(
        ofType(actions.pasteFromClipboard),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        switchMap(([action, { template, sectionsSchemas, templateId, templateEntry }]) => {
            const value = action.value;
            const direction = action.action === 'paste-after'
                ? 1 // after
                : action.action === 'paste-before'
                    ? 0 // before
                    : -1; // to end of list
            if (value.wrongData !== true) {
                // paste block after or before
                if (!!action.section && value.type === 'block') {
                    if (sectionsSchemas[action.section.type].blocks?.includes(value.content.type)) {
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
                // paste section after or before
                if (value.type === 'section') {
                    if ((!action.section || !!sectionsSchemas[action.section.type]) && templateEntry.sections?.includes(value.content.type)) {
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
            }
            return [
                sharedActions.showNotification({
                    message: `Incorrect data in clipboard`,
                    msgType: 'info'
                }),
                actions.showClipboardModal({ ...action })
            ];
        })
    ));

    showClipboardModal$ = createEffect(() => this.actions$.pipe(
        ofType(actions.showClipboardModal),
        switchMap(action => {
            return this.modals.show<{ accept: boolean, value: string }>(PasteContentComponent, {
                data: {
                    clipboardData: action.value.sourceContent
                }
            }).pipe(
                map((result) => result?.accept
                    ? actions.pasteFromClipboard({
                        ...action,
                        value: {
                            ...action.value,
                            wrongData: undefined,
                            sourceContent: result.value,
                            ...appHelpers.tryParseJson(result.value)
                        }
                    })
                    : sharedActions.empty()
                )
            );
        })
    ));

    deleteSectionOrBlock$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeContextMenuAction),
        filter(({ action }) => action === 'delete'),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, template]) => !!template),
        map(([{ action, section, block }, { template, templateId, sectionId, blockId }]) => [
            action, template, templateId, sectionId || section?.id, blockId || block?.id
        ]),
        switchMap(([, template, templateId, sectionId, blockId]) =>
            this.modals.confirm('Are you sure you want to delete this item?').pipe(
                map(confirmed => confirmed
                    ? actions.updateTemplateAction({
                        template: blockId
                            ? editorHelpers.removeBlock(template!, sectionId, blockId)
                            : editorHelpers.removeSection(template!, sectionId),
                        alias: templateId
                    })
                    : sharedActions.empty()
                )
            ))
    ));

    orderSections$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sortItems),
        filter(({ options }) => !options.parent),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, template]) => !!template),
        switchMap(([{ options }, { template, templateId }]) => [
            actions.updateTemplateAction({
                template: editorHelpers.reorderSections(template!, options.currentIndex, options.previousIndex), // section can be null
                alias: templateId
            }),
        ])
    ));

    orderBlocks$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sortItems),
        filter(({ options }) => !!options.parent),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, template]) => !!template),
        switchMap(([{ options }, { template, templateId }]) => [
            actions.updateTemplateAction({
                template: editorHelpers.reorderBlocks(template!, options.parent!, options.currentIndex, options.previousIndex), // section can be null
                alias: templateId
            }),
        ])
    ));
}
