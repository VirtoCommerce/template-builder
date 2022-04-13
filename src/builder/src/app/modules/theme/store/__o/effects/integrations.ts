import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { switchMap, catchError, map, withLatestFrom, filter, mergeMap, mapTo } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

// import { AtmsService } from '@atms/services';
// import { AfterLoads } from './after-loads.enum';

// import { appHelpers } from '@shared/services';

import * as actions from '../actions';
import * as selectors from '../selectors';
// import * as routerActions from '@navigation/state/actions';
// import * as routerSelectors from '@navigation/state';

@Injectable()
export class IntegrationEffects {
    constructor(private actions$: Actions,
        private store$: Store,
        // private atms: AtmsService
    ) { }

    // enterModuleLoadData$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.enterToListMode),
    //     mapTo(actions.raiseLoadAtms())
    // ));

    // raiseLoadData$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.raiseLoadAtms),
    //     withLatestFrom(
    //         this.store$.select(routerSelectors.getPage),
    //         this.store$.select(routerSelectors.getFilter),
    //         this.store$.select(routerSelectors.getGroup),
    //         this.store$.select(routerSelectors.getQuery)
    //     ),
    //     switchMap(([, page, filter, group, query]) => [
    //         actions.loadAtms({ filter, group, page, query }),
    //         actions.loadAtmsCount({ filter, group, query })
    //     ])
    // ));

    // //#region loading data

    // loadAtmsCount$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.loadAtmsCount),
    //     mergeMap(({ query, filter, group }) => this.atms.loadAtmsCount(query, filter, group).pipe(
    //         map(count => actions.loadAtmsCountSuccess({ count })),
    //         catchError(error => of(actions.loadAtmsCountFails({ error })))
    //     ))
    // ));


}
