import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { withLatestFrom, filter, switchMapTo, map, catchError, switchMap, tap } from "rxjs/operators";

// import { ThemeSettingsService } from '@theme/services';

import * as routingActions from '@shared/routing/actions';
import * as routingSelectors from '@shared/routing'

import * as editorHelpers from '@editor/services/editor.helpers';

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
        private clipboard: ClipboardService
    ) { }

    addItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.addItemAction),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(selectors.selectSectionModelFromRoute),
            this.store$.select(routingSelectors.selectTemplateParameter)
        ),
        filter(([, template]) => !!template),
        switchMap(([{ schema }, template, section, templateId]) => [
            actions.updateTemplateAction({
                template: editorHelpers.addItemToTemplate(schema, template!, section!), // section can be null
                alias: templateId
            }),
            actions.closeAddItemPanel()
        ])
    ));

    // updateSection$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.sectionChangedAction),
    //     withLatestFrom(
    //         this.store$.select(selectors.selectCurrentTemplateModel),
    //         this.store$.select(routingSelectors.selectTemplateParameter),
    //         this.store$.select(routingSelectors.selectSectionIdParameter),
    //         this.store$.select(routingSelectors.selectBlockIdParameter)
    //     ),
    //     filter(([, template,,sectionId]) => !!template),
    //     switchMap(([{ changes }, template, templateId, sectionId]) => [
    //         actions.updateTemplateAction({
    //             template: editorHelpers.applySectionChanges(template!, changes, sectionId),
    //             alias: templateId
    //         }),
    //     ])
    // ));

    updateEditableModel$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sectionChangedAction),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(routingSelectors.selectTemplateParameter),
            this.store$.select(routingSelectors.selectSectionIdParameter),
            this.store$.select(routingSelectors.selectBlockIdParameter)
        ),
        filter(([, template]) => !!template),
        switchMap(([{ changes }, template, templateId, sectionId, blockId]) => [
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
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(routingSelectors.selectTemplateParameter),
            this.store$.select(routingSelectors.selectSectionIdParameter),
            this.store$.select(routingSelectors.selectBlockIdParameter)
        ),
        filter(([, template]) => !!template),
        map(([{ action, section, block }, template, templateId, sectionId, blockId]) => [
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
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(routingSelectors.selectTemplateParameter),
            this.store$.select(routingSelectors.selectSectionIdParameter),
            this.store$.select(routingSelectors.selectBlockIdParameter)
        ),
        filter(([, template]) => !!template),
        map(([{ action, section, block }, template, templateId, sectionId, blockId]) => [
            action, template, templateId, sectionId || section?.id, blockId || block?.id
        ]),
        switchMap(([action, template, templateId, sectionId, blockId]) => [
            actions.updateTemplateAction({
                template: blockId
                    ? editorHelpers.duplicateBlock(template!, sectionId, blockId)
                    : editorHelpers.duplicateSection(template!, sectionId),
                alias: templateId
            }),
        ])
    ));

    copyItemToClipboard$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeContextMenuAction),
        filter(x => x.action === 'copy'),
        tap(({ section, block }) => {
            this.clipboard.copy({
                content: { ...(block || section), id: undefined },
                type: block ? 'block' : 'section'
            });
        })
    ), { dispatch: false });

    orderSections$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sortItems),
        filter(({ options }) => !options.parent),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(routingSelectors.selectTemplateParameter)
        ),
        filter(([, template]) => !!template),
        switchMap(([{ options }, template, templateId]) => [
            actions.updateTemplateAction({
                template: editorHelpers.reorderSections(template!, options.currentIndex, options.previousIndex), // section can be null
                alias: templateId
            }),
        ])
    ));

    orderBlocks$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sortItems),
        filter(({ options }) => !!options.parent),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(routingSelectors.selectTemplateParameter)
        ),
        filter(([, template]) => !!template),
        switchMap(([{ options }, template, templateId]) => [
            actions.updateTemplateAction({
                template: editorHelpers.reorderBlocks(template!, options.parent!, options.currentIndex, options.previousIndex), // section can be null
                alias: templateId
            }),
        ])
    ));
}
