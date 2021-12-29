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

    addSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.addItem),
        withLatestFrom(
            this.store$.select(editor.selectCurrentTemplate),
            this.store$.select(editor.currentTemplateKey),
            this.store$.select(editor.selectCurrentSectionIndexForAdding)
        ),
        map(([{ item }, template, templateKey, currentSectionIndex]) => ({
            result: helpers.addNewItemToList(template!.content, item, currentSectionIndex),
            templateKey
        })),
        switchMap(({ result, templateKey }) => [
            actions.setSections({ sections: result.items, templateKey: templateKey! }),
            actions.editItem(result.indexes),
            actions.closeAddItemPanel()
        ])
    ));

    deleteSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.deleteItem),
        withLatestFrom(
            this.store$.select(editor.selectCurrentTemplate),
            this.store$.select(editor.currentTemplateKey),
            this.store$.select(editor.selectCurrentSection),
            this.store$.select(editor.selectCurrentBlock)
        ),
        map(([, template, templateKey, section, block]) => ({
            result: helpers.removeItemFromList(template!.content, section!, block),
            templateKey
        })),
        switchMap(({ result, templateKey }) => [
            actions.completeEditItem(),
            actions.setSections({ sections: result, templateKey: templateKey! })
        ])
    ));

    cloneSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.cloneItem),
        withLatestFrom(
            this.store$.select(editor.selectCurrentTemplate),
            this.store$.select(editor.currentTemplateKey),
            this.store$.select(editor.selectCurrentSection),
            this.store$.select(editor.selectCurrentBlock)
        ),
        map(([, template, templateKey, section, block]) => ({
            ...helpers.cloneItem(template!.content, section!, block),
            templateKey
        })),
        switchMap(({ items, sectionIndex, blockIndex, templateKey }) => [
            actions.setSections({ sections: items, templateKey: templateKey! }),
            actions.editItem({ sectionIndex, blockIndex })
        ])
    ));

    updateItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.updateItem),
        withLatestFrom(
            this.store$.select(editor.selectCurrentTemplate),
            this.store$.select(editor.currentTemplateKey),
            this.store$.select(editor.selectCurrentSection),
            this.store$.select(editor.selectCurrentBlock)
        ),
        map(([{ item }, template, templateKey, section, block]) => ({
            items: helpers.replaceItem(template!.content, section!, block, item),
            templateKey
        })),
        switchMap(({ items, templateKey }) => [
            actions.setSections({ sections: items, templateKey: templateKey! })
        ])
    ));

    setVisibility$ = createEffect(() => this.actions$.pipe(
        ofType(actions.setVisibility),
        withLatestFrom(
            this.store$.select(editor.selectCurrentTemplate),
            this.store$.select(editor.currentTemplateKey)
        ),
        map(([{ sectionIndex, blockIndex, value }, template, templateKey]) => ({
            items: helpers.updateItemByIndex(template!.content, sectionIndex, blockIndex, { hidden: !value }),
            templateKey
        })),
        switchMap(({ items, templateKey }) => [
            actions.setSections({ sections: items, templateKey: templateKey! })
        ])
    ));
}
