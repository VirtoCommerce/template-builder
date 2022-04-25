import { WindowRef } from '@core/services';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from "@angular/core";

import * as actions from './editor.actions';
import { tap } from 'rxjs';

@Injectable()
export class PreviewEffects {
    constructor(
        private windowRef: WindowRef,
        private actions$: Actions,
        private store$: Store
    ) {}

    updateItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.updateItem),
        tap(({ item }) => {
            const element = this.windowRef.nativeWindow.document.getElementById("preview-frame");
            if (element != null) {
                const target = (<HTMLIFrameElement>element).contentWindow;
                if (!!target) {
                    const message = { type: 'update', content: item };
                    try {
                        // todo: only in debug mode
                        // console.log('builder->preview:', message)
                        target.postMessage(message, 'http://localhost:3000');
                    } catch (error) {
                        console.error('Preview unavailable. Reason: ', error);
                    }
                }
            }
        })
    ), { dispatch: false });

}
