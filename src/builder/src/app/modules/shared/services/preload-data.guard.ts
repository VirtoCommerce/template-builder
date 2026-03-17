import { Injectable, inject } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, map, Observable, take, tap } from "rxjs";

import { BuilderState } from '@shared/store/state';
import * as actions from '@shared/store/actions';
import * as selectors from '@shared/store/selectors';

@Injectable({
    providedIn: "root"
})
export class PreloadDataGuard implements CanActivate {
    private readonly store$ = inject(Store<BuilderState>);

    canActivate(): Observable<boolean>{
        return this.store$.select(selectors.selectTemplatesEntriesAsList).pipe(
            tap(templates => {
                if (!templates || !templates.length) {
                    this.store$.dispatch(actions.loadTemplateEntries());
                }
            }),
            filter(templates => !!templates),
            take(1),
            map(() => true)
        );
    }
}
