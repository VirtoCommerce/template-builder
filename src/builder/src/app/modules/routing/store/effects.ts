import { withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, routerNavigatedAction } from '@ngrx/router-store';

import * as actions from './actions';
import * as fromRoute from '.';
import { Store } from '@ngrx/store';
import { BuilderState } from '.';

@Injectable()
export class RoutingEffects {

    constructor(private actions$: Actions,
        private store$: Store<BuilderState>,
        private router: Router,
        private location: Location) { }

    // raiseLoadPageInfo$ = createEffect(() => this.actions$.pipe(
    //     ofType(ROUTER_NAVIGATION),
    //     // switchMap((action: any) => {
    //     tap((action: any) => {
    //         // return of(new pageSettingsActions.LoadInfo(action.payload.routerState));
    //     })
    // ), { dispatch: false });

    // @Effect()
    // navigateWithParameter: Observable<Action> = this.actions$.pipe(
    //     ofType<NavigateWithParameter>('[Router] Navigate With Parameter'),
    //     withLatestFrom(this.store.select(state => state)),
    //     map(([action, store]) => {
    //         const path = generateRoute(action.payload.url, { store: store });
    //         return new RouterGo({ path: path });
    //         // let skip: string = null;
    //         // const path = action.payload.map(x => {
    //         //     if (typeof x === 'string') {
    //         //         return x;
    //         //     }
    //         //     if (!!x.statePath) {
    //         //         const value = getObjectValue(state, x.statePath);
    //         //         if (!value) {
    //         //             skip = 'value in state path is null or empty';
    //         //             return '';
    //         //         }
    //         //         return value;
    //         //     }
    //         //     skip = 'cannot get parameter value for path';
    //         //     return '';
    //         // });
    //         // if (!!skip) {
    //         //     return new SkipNavigate(skip);
    //         // }
    //         // return new RouterGo({ path: path });
    //     })
    // );

    navigate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.go),
        withLatestFrom(
            this.store$.select(fromRoute.selectPath),
            this.store$.select(fromRoute.selectQueryParams),
        ),
        tap(([{ path, queryParams, extras }, currentPath, currentParams]) =>
            this.router.navigate(
                path || [currentPath], // save current path if it isn't exists
                {
                    queryParams: { ...currentParams, ...queryParams }, // save current query params too
                    ...extras
                }
            )
        )
    ), { dispatch: false });

    skipNavigate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.skipNavigation),
        tap((reason) => console.log('Navigation was skipped', reason))
    ), { dispatch: false });

    navigateBack$ = createEffect(() => this.actions$.pipe(
        ofType(actions.back),
        tap(() => this.location.back())
    ), { dispatch: false });

    navigateForward$ = createEffect(() => this.actions$.pipe(
        ofType(actions.forward),
        tap(() => this.location.forward())
    ), { dispatch: false });
}
