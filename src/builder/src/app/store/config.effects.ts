import { Injectable } from "@angular/core";
import { switchMap, map, withLatestFrom, catchError, of, tap } from "rxjs";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';

import { LoaderService } from '@app/services';
import { WindowRef } from '@shared/services';

import * as actions from './config.actions';
import * as selectors from './config.selectors';
import { Store } from "@ngrx/store";

@Injectable()
export class ConfigEffects {

    constructor(
        private actions$: Actions,
        private store$: Store,
        private windowRef: WindowRef,
        private loader: LoaderService
    ) { }

    initialLoading$ = createEffect(() => this.actions$.pipe(
        ofType(ROOT_EFFECTS_INIT),
        switchMap(() => [
            actions.readUrlParameters(),
        ])
    ));

    readUrlParameters$ = createEffect(() => this.actions$.pipe(
        ofType(actions.readUrlParameters),
        switchMap(() => [
            actions.setUrlParameters({ location: this.windowRef.getLocationContext() }),
            actions.loadConfig()
        ])
    ));

    loadConfig$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadConfig),
        withLatestFrom(
            this.store$.select(selectors.getConfigUrl)
        ),
        switchMap(([_, url]) => this.loader.load(url).pipe(
            map(config => actions.loadConfigSuccess({ config })),
            catchError(error => of(actions.loadConfigFails({ error })))
        ))
    ));
}
