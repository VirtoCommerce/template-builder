import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";

import { actions } from ".";
import * as editors from '@editor/store/editor.actions';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private store$: Store) { }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(actions.initApp),
        switchMap(() => [ editors.initEditorFeature() ])
    ));
}
