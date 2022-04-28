import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { withLatestFrom, filter, switchMapTo, map, catchError, switchMap } from "rxjs/operators";

// import { ThemeSettingsService } from '@theme/services';

import { BuilderState } from "../state";
import * as actions from "../actions";
// import * as selectors from "../selectors";

@Injectable({
    providedIn: 'root'
})
export class TemplateEditorDomainEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions,
        // private service: ThemeSettingsService
    ) { }

    // raiseLoadData$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.raiseLoadData),
    //     withLatestFrom(
    //         this.store$.select(selectors.selectCurrentSettings),
    //     ),
    //     filter(([, settings]) => settings === null),
    //     switchMapTo([actions.loadSettingsData(), actions.loadSettingsSchema()])
    // ));

    // loadSettingsData$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.loadSettingsData),
    //     switchMap(() => this.service.loadSettingsData().pipe(
    //         map(settingsData => actions.loadSettingsDataSuccess({ settingsData })),
    //         catchError(error => of(actions.loadSettingsDataFail({ error })))
    //     ))
    // ));

    // loadSettingsSchema$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.loadSettingsSchema),
    //     switchMap(() => this.service.loadSettingsSchema().pipe(
    //         map(schema => actions.loadSettingsSchemaSuccess({ schema })),
    //         catchError(error => of(actions.loadSettingsSchemaFail({ error })))
    //     ))
    // ));
}
