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
import { helpers } from '@editor/services';

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
            actions.loadAvailableTemplates(),
            actions.loadAvailableSections(),
            actions.loadAvailableBlocks()
        ])
    ));

    loadAvailableTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadAvailableTemplates),
        switchMap(() => this.service.downloadTemplatesSchemasList().pipe(
            switchMap(templates => [
                actions.loadAvailableTemplatesSuccess({ templates }),
                actions.templateSelected({ templateKey: Object.keys(templates)[0] })
            ]),
            catchError(error => of(actions.loadAvailableTemplatesFails({ error })))
        ))
    ));

    checkTemplateLoaded$ = createEffect(() => this.actions$.pipe(
        ofType(actions.templateSelected),
        withLatestFrom(this.store$.select(editor.selectCurrentTemplate)),
        filter(([, template]) => !template),
        map(([{ templateKey }]) => actions.loadTemplate({ templateKey }))
    ));

    loadTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplate),
        switchMap(({ templateKey }) => this.service.downloadTemplate(templateKey).pipe(
            map(template => helpers.prepareTemplate(template)),
            map(template => actions.loadTemplateSuccess({ template, templateKey })),
            catchError(error => of(actions.loadTemplateFails({ error })))
        ))
    ));

    loadAvailableSections$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadAvailableSections),
        switchMap(() => this.service.downloadSectionsSchemasList().pipe(
            map(sections => helpers.prepareSections(sections)),
            map(sections => actions.loadAvailableSectionsSuccess({ sections })),
            catchError(error => of(actions.loadAvailableSectionsFails({ error })))
        ))
    ));

    loadAvailableBlocks$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadAvailableBlocks),
        switchMap(() => this.service.downloadBlocksSchemasList().pipe(
            map(blocks => helpers.prepareBlocks(blocks)),
            map(blocks => actions.loadAvailableBlocksSuccess({ blocks })),
            catchError(error => of(actions.loadAvailableBlocksFails({ error })))
        ))
    ));
}
