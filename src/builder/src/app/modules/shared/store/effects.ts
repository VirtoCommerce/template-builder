import { mapTo } from 'rxjs/operators';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, switchMap, map, of, withLatestFrom, filter, tap } from "rxjs";

import { EventsBusService, NotificationsService } from "@core/services";
import { TemplatesService } from '@shared/services';
import { AppConfig } from '@integration/services';

import { BuilderState } from "./state";
import * as actions from "./actions";
import * as fromRoute from '@shared/routing';
import * as router from "@shared/routing/actions";
import * as fromState from "@shared/store/selectors";
import { TemplateEntry } from "../models";

@Injectable({
    providedIn: "root"
})
export class SharedEffects {
    constructor(private store$: Store<BuilderState>,
        private actions$: Actions,
        private templatesService: TemplatesService,
        private eventsBus: EventsBusService,
        private notification: NotificationsService,
        private appConfig: AppConfig
    ) { }

    raiseInitModule$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(this.store$.select(fromState.isAppInitialized)),
        filter(([, init]) => !init),
        switchMap(() => [
            actions.initShared()
        ])
    ));

    selectDefaultTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(
            this.store$.select(fromRoute.selectTemplateParameter)
        ),
        filter(([, template]) => !template),
        switchMap(() => [
            actions.selectDefaultTemplate()
        ])
    ));

    initApp$ = createEffect(() => this.actions$.pipe(
        ofType(actions.initShared),
        switchMap(() => [
            actions.loadTemplateEntries()
        ])
    ));

    loadTemplateEntries$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntries),
        switchMap(() => this.templatesService.getTemplatesList().pipe(
            map(templatesEntries => actions.loadTemplateEntriesSuccess({ templatesEntries })),
            catchError(error => of(actions.loadTemplateEntriesFails({ error })))
        )),
    ));

    raiseInitApp$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntriesSuccess),
        switchMap(() => [
            actions.initApp()
        ])
    ));

    redirectToDefaultTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntriesSuccess, actions.selectDefaultTemplate),
        withLatestFrom(
            this.store$.select(fromState.selectTemplatesEntries),
            this.store$.select(fromState.selectTemplatesEntriesAsList),
            this.store$.select(fromRoute.selectTemplateParameter)
        ),
        filter(([, entriesAsObject, templatesEntriesAsList, templateParameter]) => !templateParameter && !!templatesEntriesAsList.length || !entriesAsObject[templateParameter]),
        map(([, , templatesEntries]) => actions.selectTemplate({
            template: (templatesEntries.find(item => !!item.isDefault) || templatesEntries[0]).alias
        }))
    ));

    selectTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.selectTemplate),
        withLatestFrom(
            this.store$.select(fromState.selectParentTemplateAlias),
            this.store$.select(fromRoute.selectTemplateParameter),
            this.store$.select(fromRoute.selectParentTemplateParameter),
            this.store$.select(fromRoute.isEmpty)
        ),
        filter(([{ template }, parentTemplate, templateParameter, parentTemplateParameter, isEmpty]) =>
            !isEmpty // if route is not initialized yet
            && (
                template !== templateParameter // and template entry was changed
                || parentTemplate !== parentTemplateParameter // or parent template was changed
            )
            || !templateParameter), // or template parameter from route is empty
        switchMap(([{ template }, parentTemplate]) => [
            router.go({ queryParams: { template, in: parentTemplate } }),
            // remove it because in editour.ui.effects occurs extra router.go action
            // actions.templateChanged({ template, in: parentTemplate })
        ])
    ));

    loadChildrenTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadChildrenTemplates),
        withLatestFrom(this.store$.select(fromState.selectTemplatesEntries)),
        switchMap(([{ template }, entries]) => {
            const templateEntry = <TemplateEntry>entries[template]!;
            return this.templatesService.getChildrenTemplates(templateEntry).pipe(
                map(childrenEntries => actions.loadChildrenTemplatesSuccess({ childrenEntries, parentTemplate: template })),
                catchError(error => of(actions.loadChildrenTemplatesFails({ error, parentTemplate: template })))
            );
        })
    ));

    changePreviewMode$ = createEffect(() => this.actions$.pipe(
        ofType(actions.changePreviewMode),
        map(({ mode }) => router.go({ queryParams: { 'preview-mode': mode } }))
    ));

    setCurrentDirtyState$ = createEffect(() => this.actions$.pipe(
        ofType(actions.setCurrentDirtyState),
        withLatestFrom(
            this.store$.select(fromRoute.selectTemplateParameter),
            this.store$.select(fromRoute.selectParentTemplateParameter),
        ),
        map(([{ dirty }, template, parent]) => parent
            ? actions.setDirtyState({ dirty, template, parent })
            : actions.setRootDirtyState({ dirty, template })
        )
    ));

    executeNavigation$ = createEffect(() => this.actions$.pipe(
        ofType(actions.selectTemplate),
        mapTo(actions.navigateToCurrentTemplate())
    ), { dispatch: false });

    broadcastNavigation$ = createEffect(() => this.actions$.pipe(
        ofType(actions.navigateToCurrentTemplate),
        withLatestFrom(
            this.store$.select(fromState.selectCurrentTemplateEntry)
        ),
        // todo: probably we should skip this action if url is empty
        tap(([, templateEntry]) => this.eventsBus.emit({
            type: 'navigate',
            url: templateEntry?.previewUrl || this.appConfig.getValue('defaultPreviewUrl') || '/'
        }))
    ), { dispatch: false });

    broadcastMessage$ = createEffect(() => this.actions$.pipe(
        ofType(actions.broadcastMessage),
        tap(({ msg }) => this.eventsBus.emit(msg))
    ), { dispatch: false });

    showNotification$ = createEffect(() => this.actions$.pipe(
        ofType(actions.showNotification),
        tap(({ message, msgType, top }) => this.notification.show(message, msgType, top ? 'tr' : 'bl'))
    ), { dispatch: false });
}
