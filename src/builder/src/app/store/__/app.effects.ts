import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, tap } from "rxjs";

import { actions } from ".";
// import * as editors from '@editor/store/editor.actions';
// import { PreviewService } from "@app/services";

@Injectable()
export class AppEffects {
    constructor(
        // private preview: PreviewService,
        private actions$: Actions,
        private store$: Store) { }

    // init$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.initApp),
    //     switchMap(() => [ editors.initEditorFeature() ])
    // ));

    // closeAllPanels$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.closeAllPanels),
    //     switchMap(() => [
    //         editors.closeAllPanels()
    //     ])
    // ));

    // sendNewBlockToStoreLoaded$ = createEffect(() => this.actions$.pipe(
    //     ofType(editors.addItem, editors.updateItem),
    //     tap((action) => this.preview.send('test-action-from-builder', action.item))
    // ), { dispatch: false });
}
