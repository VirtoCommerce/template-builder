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
import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { cloneDeep } from 'lodash-es';

import { MessageService, ClipboardService } from '@shared/services';
import { BlockValuesModel } from '@shared/models';
import { appHelpers } from '@shared/services';
import { PageEditorService } from '@editor/services';
import { EDITOR_CONFIG, IEditorConfig } from '@editor/di/editor.config';

import * as editorActions from './editor.actions';
import * as fromEditor from '.';


@Injectable()
export class EditorEffects {
    constructor(private pages: PageEditorService,
        private messages: MessageService,
        private clipboard: ClipboardService,
        @Inject(EDITOR_CONFIG) private config: IEditorConfig,
        private actions$: Actions,
        private store$: Store<fromEditor.State>) { }

    convertPageTypeToPreviewSection$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.previewPageItemOfType),
        map(action => {
            if (!!action.blockSchema) {
                const result = <BlockValuesModel>{};
                const schema = action.blockSchema;
                schema.settings.forEach(x => {
                    result[x.id] = appHelpers.getValueOrDefault(x.preview, appHelpers.getValueOrDefault(x.default));
                });
                result.__id = 'preview-block';
                result.type = action.blockSchema.type;
                return result;
            }
            return null;
        }),
        mergeMap(item =>
            of(editorActions.previewPageItem({ block: item }))
        )
    ));

    closeEditors$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.closeEditors),
        switchMapTo([
            editorActions.completeEditPageItem(),
            editorActions.previewPageItemOfType({ blockSchema: null }),
            editorActions.toggleNewBlockPane({ display: false })
        ])
    ));

    copyBlock$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.copyPageItem),
        withLatestFrom(this.store$.select(fromEditor.getPage)),
        map(([action, page]) => {
            const block = cloneDeep(action.sourceBlock);
            block.id = page.content.reduce((v: number, b: BlockValuesModel) => Math.max(b.id, v), 0) + 1;
            block.__id = this.generateBlockId(block, true);
            return editorActions.clonePageItem({ originalBlock: action.sourceBlock, newBlock: block });
        })
    ));

    createPageItemModelByType$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.createPageItem),
        withLatestFrom(this.store$.select(fromEditor.getPage)),
        map(([action, page]) => {
            const block = <BlockValuesModel>{
                id: page.content.length ? Math.max(...page.content.map(v => v.id || 0)) + 1 : 1,
                type: action.newItemSchema.type
            };
            block.__id = this.generateBlockId(block);
            action.newItemSchema.settings.forEach(x => block[x.id] = appHelpers.getValueOrDefault(x.default));
            return block;
        }),
        mergeMap(item =>
            of(editorActions.addPageItem({ block: item }))
        )
    ));

    loadBlocksConfig$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.loadBlocksSchema),
        filter(() => this.config.hasPage),
        switchMap(() =>
            this.pages.loadSchema().pipe(
                map(result => editorActions.blocksSchemaLoaded({ schema: result })),
                catchError(error => of(editorActions.blocksSchemaFail({ error })))
            )
        )
    ));

    loadBlocks$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.loadBlocks),
        filter(() => this.config.hasPage),
        switchMap(() =>
            this.pages.downloadPage().pipe(
                tap(blocks => blocks.forEach(b => {
                    b.__id = this.generateBlockId(b);
                })),
                map(blocks => editorActions.loadBlocksSuccess({ blocks })),
                catchError(error => of(editorActions.loadBlocksFail({ error })))
            )
        )
    ));

    saveBlocks$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.saveBlocks),
        withLatestFrom(this.store$.select(fromEditor.getIsDirty)),
        filter(([, dirty]) => dirty),
        map(() => editorActions.reloadBlocks())
    ));

    reloadBlocks$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.reloadBlocks),
        switchMap(() => this.pages.downloadPage().pipe(
            map(blocks => editorActions.reloadBlocksSuccess({ blocks })),
            catchError(error => of(editorActions.reloadBlocksFail({ error })))
        ))
    ));

    uploadPage$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.reloadBlocksSuccess),
        withLatestFrom(
            this.store$.select(fromEditor.getPage),
            this.store$.select(fromEditor.getBlocksSchema)
        ),
        switchMap(([{ blocks }, page, schema]) => {
            const settings = { ...(blocks.find(x => x.type === 'settings') || page.settings) };
            Object.keys(schema)
                .filter(key => schema[key].static && (typeof schema[key].static === 'string'))
                .forEach(key => {
                    schema[key].settings.forEach(s => {
                        settings[s.id] = page.settings[s.id];
                    });
                });
            const data = [settings, ...page.content];
            return this.pages.uploadPage(data).pipe(
                map(() => editorActions.saveBlocksSuccess()),
                catchError(error => of(editorActions.saveBlocksFail({ error })))
            );
        })
    ));

    pageSaved$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.saveBlocksSuccess),
        withLatestFrom(this.store$.select(fromEditor.getPage)),
        tap(([, page]) => {
            this.messages.displayMessage('Page saved successfully');
            this.pages.onPageChanged(page).subscribe();
        })
    ), { dispatch: false });

    pageSaveFailed$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.saveBlocksFail),
        tap((action) => {
            this.messages.displayError('Couldn\'t save page', action.error);
        })
    ), { dispatch: false });

    copyToClipboard$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.copyToClipboard),
        tap(({ block }) => {
            const value = { ...block, __id: null };
            this.clipboard.copyTo(value);
        })
    ), { dispatch: false });

    pasteFromClipboard$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.tryPasteFromClipboard),
        switchMap(() => this.clipboard.pasteFrom()),
        map(pasteResult => {
            if (pasteResult.success) {
                return editorActions.tryPasteFromString({ value: pasteResult.data });
            } else {
                return editorActions.showPastePopup();
            }
        })
    ));

    showPastePopup$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.showPastePopup),
        exhaustMap(() => {
            return this.clipboard.pasteThroughPopup();
        }),
        filter(result => result.success),
        map(result => editorActions.tryPasteFromString({ value: result.data }))
    ));

    tryPasteFromString$ = createEffect(() => this.actions$.pipe(
        ofType(editorActions.tryPasteFromString),
        withLatestFrom(
            this.store$.select(fromEditor.getPage),
            this.store$.select(fromEditor.getBlocksSchema),
            this.store$.select(fromEditor.getCurrentBlockIndex)
        ),
        map(([{ value }, page, schema, index]) => {
            if (!value) {
                return editorActions.emptyAction();
            }
            try {
                const block = JSON.parse(value);
                if (!schema[block.type] || schema[block.type].static) {
                    this.messages.displayError('Unknown or unsupported block type', {});
                    return editorActions.showPastePopup();
                }
                block.id = page.content.reduce((v: number, b: BlockValuesModel) => Math.max(b.id, v), 0) + 1;
                block.__id = null;
                block.__id = this.generateBlockId(block);
                return editorActions.addPageItem({ block, index });
            } catch (error) {
                this.messages.displayError('Parse data error', error);
                return editorActions.showPastePopup();
            }
        })
    ));

    private generateBlockId(block: BlockValuesModel, force: boolean = false): string {
        if (block.__id && !force) {
            return block.__id;
        }
        return appHelpers.onlyLettersAndDigits(`${block.type}${appHelpers.generateUniqueString(4)}`);
    }
}
