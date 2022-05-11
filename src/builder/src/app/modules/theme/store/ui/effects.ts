import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { withLatestFrom, filter, mapTo, map, tap } from "rxjs/operators";

import { NotificationsService } from '@core/services';

import * as actions from "../actions";
import { BuilderState } from "../state";

import * as routingActions from '@shared/routing/actions';
import * as routingSelectors from '@shared/routing'

import * as domainSelectors from "../selectors";
import { ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ThemeUiEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions
    ) { }

    gotoPresets$ = createEffect(() => this.actions$.pipe(
        ofType(actions.gotoPresets),
        mapTo(routingActions.go({ path: ['/themes/presets'] }))
    ));

    previewPreset$ = createEffect(() => this.actions$.pipe(
        ofType(actions.previewPreset),
        map(({ preset }) => routingActions.go({ queryParams: { preset } }))
    ));

    exitPresets$ = createEffect(() => this.actions$.pipe(
        ofType(actions.exitPresets, actions.applyPreset),
        mapTo(routingActions.go({ path: ['/themes'], queryParams: { preset: undefined } }))
    ));

    exitSettings$ = createEffect(() => this.actions$.pipe(
        ofType(actions.exitSettings),
        mapTo(routingActions.go({ path: ['/pages'] }))
    ));

}
