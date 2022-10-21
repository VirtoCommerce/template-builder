import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { withLatestFrom, filter, tap, map, catchError, switchMap } from "rxjs/operators";

import { broadcastMessage } from '@shared/store/actions';
import * as routingActions from '@shared/routing/actions';
import * as sharedSelectors from '@shared/store/selectors';

// import * as routingSelectors from '@shared/routing'
import * as editorHelpers from '@editor/helpers/editor.helpers';

import * as sharedActions from '@shared/store/actions';

import { BuilderState } from "../state";
import * as actions from "../actions";
import * as selectors from "../selectors";

@Injectable({
    providedIn: 'root'
})
export class TemplateEditorUiEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions
    ) { }

    navigateToAddSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.showBlankSections),
        filter(x => !x.sectionId),
        map(() => routingActions.go({ path: ['/pages/add'] }))
    ));

    navigateToAddBlock$ = createEffect(() => this.actions$.pipe(
        ofType(actions.showBlankSections),
        filter(x => !!x.sectionId),
        map(({ sectionId }) => routingActions.go({ path: ['/pages/add', sectionId] }))
    ));

    navigateToEditTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.closeAddItemPanel),
        switchMap(() => [
            routingActions.go({ path: ['/pages'] }),
            actions.resetGroupsState()
        ])
    ));

    navigateToEditSettings$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editSettings),
        switchMap(({ schema }) => [
            routingActions.go({ path: ['/pages', 'settings', schema.type] })
        ])
    ));

    // this redirect is necessary when we edit other page, it happens after redirect from shared module
    templateChanged$ = createEffect(() => this.actions$.pipe(
        ofType(sharedActions.templateChanged),
        switchMap(({ template, parent }) => [
            routingActions.go({ path: ['/pages'], queryParams: { template, in: parent } })
        ])
    ));

    setWindowTitle$ = createEffect(() => this.actions$.pipe(
        ofType(actions.setWindowTitle),
        withLatestFrom(this.store$.select(sharedSelectors.selectCurrentTemplateEntry)),
        map(([, templateEntry]) => sharedActions.setWindowTitle({ title: templateEntry?.name || null }))
    ));

    completeEditSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.closeEditItemPanel),
        switchMap(() => [
            routingActions.go({ path: ['/pages'] })
        ])
    ));

    navigateToEditSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editSectionAction),
        switchMap(({ sectionId }) => [
            routingActions.go({ path: ['/pages', sectionId] })
        ])
    ));

    navigateToEditBlock$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editBlockAction),
        switchMap(({ sectionId, blockId }) => [
            routingActions.go({ path: ['/pages', sectionId, blockId] })
        ])
    ));

    raiseUpdateTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(
            actions.updateTemplateAction
        ),
        map(() => actions.templateContentChanged())
    ));

    templateContentChanged$ = createEffect(() => this.actions$.pipe(
        ofType(actions.templateContentChanged),
        // withLatestFrom(this.store$.select(selectors.selectCurrentItemForEdit)),
        // todo: should be only one section
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(sharedSelectors.selectCurrentTemplateEntry),
            this.store$.select(sharedSelectors.selectParentTemplateAlias),
            this.store$.select(selectors.selectSectionModelFromRoute),
            this.store$.select(selectors.selectBlockModelFromRoute)
        ),
        switchMap(([, template, entry, parent, section, block]) => [
            broadcastMessage({
                msg: {
                    type: 'changed',
                    template, section, block,
                    ...entry?.previewMessage
                }
            }),
            parent
                ? sharedActions.setDirtyState({ parent: parent, template: entry.alias, dirty: true })
                : sharedActions.setRootDirtyState({ template: entry.alias, dirty: true })
        ])
    ));

    navigateToThemeSettings$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeToolbarAction),
        filter(x => x.action === 'theme-settings'),
        map(() => routingActions.jump({ path: ['/themes'] }))
    ));

    notifySuccessSave$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplateSuccess),
        switchMap(({ alias, parent }) => [
            sharedActions.showNotification({ message: `Template ${alias} saved successfully`, msgType: 'success', top: true }),
            parent
                ? sharedActions.setDirtyState({ parent, template: alias, dirty: false })
                : sharedActions.setRootDirtyState({ template: alias, dirty: false })
        ])
    ));

    notifyFailsSave$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplateFails),
        tap(({ error }) => {
            console.log(error)
        }),
        map(() => sharedActions.showNotification({ message: 'Could not save template', msgType: 'error', top: true }))
    ));

    previewItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.previewItemAction),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(sharedSelectors.selectCurrentTemplateEntry),
            this.store$.select(selectors.selectSectionModelFromRoute)
        ),
        map(([{ item }, template, entry, section]) => {
            const model = editorHelpers.generatePreviewBySchema(item);
            return broadcastMessage({
                msg: {
                    type: 'preview',
                    template, section, model,
                    ...entry?.previewMessage
                }
            })
        })
    ));

    scrollToSectionInPreview$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editSectionAction),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(sharedSelectors.selectCurrentTemplateEntry)
        ),
        map(([{ sectionId }, template, entry]) =>
            broadcastMessage({
                msg: {
                    type: 'select',
                    template, sectionId,
                    ...entry?.previewMessage
                }
            })
        )
    ));

    scrollToBlockInPreview$ = createEffect(() => this.actions$.pipe(
        ofType(actions.editBlockAction),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(sharedSelectors.selectCurrentTemplateEntry),
            this.store$.select(selectors.selectSectionModelFromRoute)
        ),
        map(([{ sectionId, blockId }, template, entry, section]) =>
            broadcastMessage({
                msg: {
                    type: 'select',
                    template, section, sectionId, blockId,
                    ...entry?.previewMessage
                }
            })
        )
    ));

}
