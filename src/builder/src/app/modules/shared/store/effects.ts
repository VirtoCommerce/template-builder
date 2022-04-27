import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, switchMap, map, of } from "rxjs";

import { TemplatesService } from '@shared/services';

import * as actions from "./actions";

@Injectable({
    providedIn: "root"
})
export class SharedEffects {
    constructor(private store$: Store,
        private actions$: Actions,
        private templatesService: TemplatesService
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
}
