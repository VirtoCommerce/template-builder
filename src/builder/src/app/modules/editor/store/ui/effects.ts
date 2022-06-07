import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { withLatestFrom, filter, tap, map, catchError, switchMap } from "rxjs/operators";

import { NotificationsService } from '@core/services';
import { broadcastMessage } from '@shared/store/actions';
import * as routingActions from '@shared/routing/actions';
import * as routingSelectors from '@shared/routing'

import * as editorHelpers from '@editor/services/editor.helpers';

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
        private actions$: Actions,
        private notifications: NotificationsService
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

    templateChanged$ = createEffect(() => this.actions$.pipe(
        ofType(sharedActions.templateChanged),
        switchMap(({ template }) => [
            routingActions.go({ path: ['/pages'], queryParams: { template } })
        ])
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

    updateSectionInPreview$ = createEffect(() => this.actions$.pipe(
        ofType(actions.sectionChangedAction),
        withLatestFrom(this.store$.select(selectors.selectCurrentItemForEdit)),
        map(([{ changes }, item]) => broadcastMessage({ msg: { type: 'changed', model: { ...item, ...changes } } }))
    ));

    navigateToThemeSettings$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeToolbarAction),
        filter(x => x.action === 'theme-settings'),
        map(() => routingActions.jump({ path: ['/themes'] }))
    ));

    notifySuccessSave$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplateSuccess),
        tap(() => this.notifications.successRight('Template saved successfully'))
    ), { dispatch: false });

    notifyFailsSave$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplateFails),
        tap(({ error }) => {
            this.notifications.errorRight('Could not save template');
            console.log(error)
        })
    ), { dispatch: false });
}
