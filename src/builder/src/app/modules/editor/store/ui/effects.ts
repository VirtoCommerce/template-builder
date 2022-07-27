import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { withLatestFrom, filter, tap, map, catchError, switchMap } from "rxjs/operators";

import { broadcastMessage } from '@shared/store/actions';
import * as routingActions from '@shared/routing/actions';

// import * as routingSelectors from '@shared/routing'
// import * as editorHelpers from '@editor/services/editor.helpers';

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

    // remove it because in shared effects already occurs router go action
    // templateChanged$ = createEffect(() => this.actions$.pipe(
    //     ofType(sharedActions.templateChanged),
    //     switchMap(({ template, in }) => [
    //         routingActions.go({ path: ['/pages'], queryParams: { template, in } })
    //     ])
    // ));

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
        withLatestFrom(this.store$.select(selectors.selectCurrentTemplateModel)),
        switchMap(([, template]) => [
            broadcastMessage({ msg: { type: 'changed', model: { template } } }),
            sharedActions.setCurrentDirtyState({ dirty: true })
        ])
    ));

    navigateToThemeSettings$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeToolbarAction),
        filter(x => x.action === 'theme-settings'),
        map(() => routingActions.jump({ path: ['/themes'] }))
    ));

    notifySuccessSave$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplateSuccess),
        switchMap(() => [
            sharedActions.showNotification({ message: 'Template saved successfully', msgType: 'success', top: true }),
            sharedActions.setCurrentDirtyState({ dirty: false })
        ])
    ));

    notifyFailsSave$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplateFails),
        tap(({ error }) => {
            console.log(error)
        }),
        map(() => sharedActions.showNotification({ message: 'Could not save template', msgType: 'error', top: true }))
    ));
}
