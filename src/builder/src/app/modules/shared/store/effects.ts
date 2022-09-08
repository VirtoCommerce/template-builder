import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { delay } from 'rxjs/operators';
import { catchError, switchMap, map, of, withLatestFrom, filter, tap, fromEvent } from "rxjs";

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

    initShared$ = createEffect(() => this.actions$.pipe(
        ofType(actions.initShared),
        switchMap(() => [
            actions.loadTemplateEntries()
        ])
    ));

    loadTemplateEntries$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntries),
        switchMap(() => this.templatesService.getTemplatesList().pipe(
            map(templatesEntries => actions.loadTemplateEntriesSuccess({ templatesEntries: templatesEntries || {} })),
            catchError(error => of(actions.loadTemplateEntriesFails({ error })))
        )),
    ));

    raiseInitApp$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntriesSuccess),
        withLatestFrom(this.store$.select(fromRoute.selectParentTemplateParameter)),
        filter(([, parent]) => !parent),
        switchMap(() => [
            actions.initApp(),
            actions.setLivePreviewUrl()
        ])
    ));

    loadChildrenOnStartApp$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntriesSuccess),
        withLatestFrom(this.store$.select(fromRoute.selectParentTemplateParameter)),
        filter(([, parent]) => !!parent),
        switchMap(() => [
            actions.raiseLoadChildrenTemplates() // todo: here must be a call to load specific template
        ])
    ));

    raiseLoadChildrenTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.raiseLoadChildrenTemplates),
        withLatestFrom(
            this.store$.select(fromRoute.selectParentTemplateParameter)
        ),
        switchMap(([, parent]) => [
            actions.loadChildrenTemplates({template: parent, onInit: true})
        ])
    ));

    redirectToDefaultTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.selectDefaultTemplate),
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
            // this action allows to inform other modules to do some stuff, i.e. editor module do the other redirect
            actions.templateChanged({ template, parent: parentTemplate })
        ])
    ));

    currentFilterChanged$ = createEffect(() => this.actions$.pipe(
        ofType(actions.filterTemplates),
        withLatestFrom(
            this.store$.select(fromState.selectParentTemplate),
            this.store$.select(fromState.selectParentTemplateAlias)
        ),
        filter(([, parent]) => !!parent?.request),
        map(([, , parent]) => actions.loadChildrenTemplates({ template: parent || '', onInit: false }))
    ));

    switchToChildrenTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.switchToChildrenTemplates),
        map(({ template }) => actions.loadChildrenTemplates({ template, onInit: false }))
    ));

    loadChildrenTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadChildrenTemplates),
        withLatestFrom(
            this.store$.select(fromState.selectTemplatesEntries),
            this.store$.select(fromState.selectCurrentFilter)
        ),
        filter(([{template}]) => !!template),
        switchMap(([{ template, onInit }, entries, filter]) => {
            const templateEntry = <TemplateEntry>entries[template]!;
            const context = { item: templateEntry, filter };
            return this.templatesService.getChildrenTemplates(templateEntry, context).pipe(
                switchMap(childrenEntries => {
                    const result = <Action[]>[actions.loadChildrenTemplatesSuccess({ childrenEntries, parentTemplate: template })];
                    if (onInit) {
                        result.push(actions.initApp());
                        result.push(actions.setLivePreviewUrl());
                    }
                    return result;
                }),
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

    // executeNavigation$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.selectTemplate),
    //     mapTo(actions.navigateToCurrentTemplate())
    // ));

    onStartPreviewUrl$ = createEffect(() => this.actions$.pipe(
        ofType(actions.setLivePreviewUrl),
        withLatestFrom(
            this.store$.select(fromRoute.selectTemplateParameter),
            this.store$.select(fromState.selectCurrentTemplatesEntries)
        ),
        delay(1000), // todo: ad-hoc solution. we need wait when the preview will be completely loaded and then send messages
        tap(([, template, templates]) => {
            this.eventsBus.emit({
                type: 'navigate',
                url: templates?.[template]?.previewUrl || this.appConfig.getValue('startPreviewPath') || '/'
            });
        })
    ), { dispatch: false });

    broadcastNavigation$ = createEffect(() => this.actions$.pipe(
        ofType(actions.selectTemplate),
        withLatestFrom(
            this.store$.select(fromState.selectCurrentTemplatesEntries)
        ),
        tap(([{ template }, templates]) => this.eventsBus.emit({
            type: 'navigate',
            url: templates?.[template]?.previewUrl || this.appConfig.getValue('startPreviewPath') || '/'
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

    previewLoadedMessage$ = createEffect(() => fromEvent<MessageEvent>(window, 'message').pipe(
        filter((event: MessageEvent) => event.data.source === 'preview'),
        tap(() => this.eventsBus.emit({ type: 'preview-loaded' }))
    ), { dispatch: false });
}
