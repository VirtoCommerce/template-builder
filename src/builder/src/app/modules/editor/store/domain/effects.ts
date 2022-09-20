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
import { appHelpers } from "@integration/helpers";
import * as sharedActions from "@shared/store/actions";

import { PasteContentComponent } from '@editor/dialogs';
import { helpers as editorHelpers, clipboardHelpers } from '@editor/helpers';

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
        switchMap(([{ schema }, { template, section, templateId }]) => {
            const result = editorHelpers.addItemToTemplate(schema, template!, section!); // section can be null
            return [
                actions.updateTemplateAction({
                    template: result.template,
                    alias: templateId
                }),
                actions.closeAddItemPanel(),
                result.blockId ? actions.editBlockAction({ blockId: result.blockId, sectionId: result.sectionId }) : actions.editSectionAction({ sectionId: result.sectionId })
            ]
        })
    ));

    updateEditableModel$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sectionChangedAction),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template, sectionId }]) => !!template && !!sectionId),
        switchMap(([{ changes }, { template, templateId, sectionId, blockId }]) => [
            actions.updateTemplateAction({
                template: blockId
                    ? editorHelpers.applyBlockChanges(template!, changes, sectionId, blockId)
                    : editorHelpers.applySectionChanges(template!, changes, sectionId),
                alias: templateId
            }),
        ])
    ));

    updateTemplateSettings$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sectionChangedAction),
        withLatestFrom(this.store$.select(selectors.changeTemplateContext)),
        filter(([, { template, sectionId }]) => !!template && !sectionId),
        switchMap(([{ changes }, { template, templateId }]) => [
            actions.updateTemplateAction({
                template: editorHelpers.applySettingsChanges(template!, changes),
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
        switchMap(([action, context]) => {
            return clipboardHelpers.pasteDataIntoTemplate(action, context);
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
