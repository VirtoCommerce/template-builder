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
        ofType(actions.loadTemplateEntriesSuccess),
        withLatestFrom(this.store$.select(fromRoute.selectTemplateParameter)),
        filter(([{ templatesEntries }, templateParameter]) => !templateParameter && !!Object.keys(templatesEntries).length),
        map(([{ templatesEntries } ]) => actions.selectTemplate({ template: this.listHelpers.findInObjectOrFirst<TemplateEntry>(templatesEntries, (item, key) => !!item.isDefault).key!! }))
    ));

    selectTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.selectTemplate),
        withLatestFrom(this.store$.select(fromRoute.selectTemplateParameter)),
        filter(([{ template }, templateParameter]) => templateParameter && template !== templateParameter),
        map(([{ template }]) => router.go({ queryParams: { template } }))
    ));

    changePreviewMode$ = createEffect(() => this.actions$.pipe(
        ofType(actions.changePreviewMode),
        map(({ mode }) => router.go({ queryParams: { 'preview-mode': mode } }))
    ));
}
