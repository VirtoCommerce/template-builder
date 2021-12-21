import { Inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import {
    map,
    switchMapTo,
    tap,
    filter,
    exhaustMap,
    catchError,
    mergeMap,
    switchMap,
    withLatestFrom
} from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, ofType, createEffect, ROOT_EFFECTS_INIT, OnInitEffects } from '@ngrx/effects';

import { EDITOR_SERVICE, IEditorService } from '@editor/di';

import * as actions from './editor.actions';
import * as editor from './editor.selectors';


@Injectable()
export class EditorEffects { // implements OnInitEffects {
    constructor(
        @Inject(EDITOR_SERVICE) private service: IEditorService,
        private actions$: Actions,
        private store$: Store) { }

    // ngrxOnInitEffects(): Action {
    //     return actions.initEditorFeature();
    // }

    init$ = createEffect(() => this.actions$.pipe(
        ofType(actions.initEditorFeature),
        tap(() => {
            console.log('editor effects init')
        }),
        switchMap(() => [
            actions.loadAvailableTemplates()
        ])
    ));

    loadAvailableTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadAvailableTemplates),
        switchMap(() => this.service.downloadTemplatesList().pipe(
            map(templates => actions.loadAvailableTemplatesSuccess({ templates })),
            catchError(error => of(actions.loadAvailableTemplatesFails({ error })))
        ))
    ));
}
