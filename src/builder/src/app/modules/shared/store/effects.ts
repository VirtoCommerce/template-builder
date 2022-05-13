import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, switchMap, map, of, withLatestFrom, filter } from "rxjs";

import { ListHelpers } from "@core/services";
import { TemplatesService } from '@shared/services';

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
        private listHelpers: ListHelpers
    ) { }

    raiseInitApp$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(this.store$.select(fromState.isAppInitialized)),
        filter(([, init]) => !init),
        switchMap(() => [
            actions.initApp(),
        ])
    ));

    selectDefaultTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        withLatestFrom(this.store$.select(fromRoute.selectTemplateParameter)),
        filter(([, template]) => !template),
        switchMap(() => [
            actions.selectDefaultTemplate()
        ])
    ));

    initApp$ = createEffect(() => this.actions$.pipe(
        ofType(actions.initApp),
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

    redirectToDefaultTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateEntriesSuccess, actions.selectDefaultTemplate),
        withLatestFrom(
            this.store$.select(fromState.selectTemplatesEntries),
            this.store$.select(fromRoute.selectTemplateParameter)
        ),
        filter(([, templatesEntries, templateParameter]) => !templateParameter && !!templatesEntries.length),
        map(([, templatesEntries]) => actions.selectTemplate({
            template: (templatesEntries.find(item => !!item.isDefault) || templatesEntries[0]).alias
        }))
    ));

    selectTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.selectTemplate),
        withLatestFrom(
            this.store$.select(fromRoute.selectTemplateParameter),
            this.store$.select(fromRoute.isEmpty)
        ),
        filter(([{ template }, templateParameter, isEmpty]) => !isEmpty && template !== templateParameter || !templateParameter),
        map(([{ template }]) => router.go({ queryParams: { template } }))
    ));

    changePreviewMode$ = createEffect(() => this.actions$.pipe(
        ofType(actions.changePreviewMode),
        map(({ mode }) => router.go({ queryParams: { 'preview-mode': mode } }))
    ));
}
