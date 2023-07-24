import { ModalService } from '@core/services';
import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { withLatestFrom, filter, switchMapTo, map, catchError, switchMap, exhaustMap, tap } from "rxjs/operators";

import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { RouterStateUrl } from '@shared/routing';

// import { ThemeSettingsService } from '@theme/services';

import { SaveTemplateComponent } from '@shared/dialogs';

import { BuilderState } from "../state";
import { helpers as editorHelpers } from '@editor/helpers';
import * as actions from "../actions";
import * as shared from '@shared/store/actions';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import { broadcastMessage } from '@shared/store/actions';
import * as selectors from "../selectors";
import * as fromRoute from '@shared/routing';
import * as fromShared from '@shared/store/selectors';

import { EditorModuleInfo } from "@models/modules";

import { SchemasService, TemplatesService } from "@editor/services";

@Injectable({
    providedIn: 'root'
})
export class TemplateEditorDataEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions,
        private schemas: SchemasService,
        private templates: TemplatesService,
        private modals: ModalService
    ) { }

    loadTemplateData$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((action: RouterNavigatedAction<RouterStateUrl>) => !!action?.payload?.routerState?.data),
        map((action: RouterNavigatedAction<RouterStateUrl>) => action.payload.routerState.data),
        withLatestFrom(this.store$.select(fromRoute.isEmpty)),
        filter(([data, isEmpty]) => data?.['module'] === EditorModuleInfo.name && !isEmpty),
        switchMap(() => [
            actions.raiseLoadData(),
            actions.setWindowTitle()
        ])
    ));

    loadTemplateDataOnInit$ = createEffect(() => this.actions$.pipe(
        ofType(shared.initApp),
        switchMap(() => [
            actions.raiseLoadData(),
            actions.setWindowTitle()
        ])
    ));

    raiseLoadTemplateModel$ = createEffect(() => this.actions$.pipe(
        ofType(actions.raiseLoadData),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(selectors.selectCurrentTemplateState),
            this.store$.select(fromShared.selectCurrentTemplateEntry),
            this.store$.select(fromRoute.selectTemplateKeyParameter),
        ),
        // load when template still is not loaded or hasn't been changed yet
        filter(([, template, state, entry]) => !template || !state || !entry),
        switchMap(([, , , , templateKey]) => [
            actions.loadTemplateModel({ templateKey })
        ])
    ));

    raiseLoadTemplateSchemas$ = createEffect(() => this.actions$.pipe(
        ofType(actions.raiseLoadData),
        withLatestFrom(
            this.store$.select(selectors.isSchemasLoaded)
        ),
        filter(([, schemasLoaded]) => !schemasLoaded),
        switchMap(() => [actions.loadTemplateSchemas()])
    ));

    loadSchemas$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateSchemas),
        exhaustMap(() => this.schemas.getSchemas().pipe(
            map(schemas => actions.loadTemplateSchemasSuccess({ schemas })),
            catchError(error => of(actions.loadTemplateSchemasFails({ error })))
        ))
    ));

    loadTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateModel),
        withLatestFrom(
            this.store$.select(fromShared.selectCurrentTemplateEntry),
            this.store$.select(fromRoute.selectRelativeUrlParameter),
            this.store$.select(fromRoute.selectContentTypeParameter)
        ),
        switchMap(([{ templateKey }, templateEntry, relativeUrl, contentType]) => this.templates.getTemplate(relativeUrl, contentType, templateEntry).pipe(
            filter(template => !!template),
            map(template => editorHelpers.prepareTemplate(template!)),
            switchMap(template => [
                actions.loadTemplateModelSuccess({ template, templateKey }),
                broadcastMessage({
                    msg: {
                        type: 'page',
                        template,
                        ...templateEntry?.previewMessage
                    }
                })
            ]),
            catchError(error => [
                actions.loadTemplateModelFails({ error, templateKey }),
                shared.showNotification({
                    message: 'Could not load template',
                    msgType: 'error',
                    top: true
                })
            ])
        ))
    ));

    // saveTemplates$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.executeToolbarAction),
    //     filter(({ action }) => action === 'save-new'),
    //     withLatestFrom(
    //         this.store$.select(fromShared.selectChangedTemplates)
    //     ),
    //     switchMap(([, model, entry, changedTemplates]) => {
    //         console.log(changedTemplates);
    //         return this.templates.saveTemplate([{ entry, content: model! }]).pipe(
    //             map(() => actions.saveTemplateSuccess({ alias: entry!.alias })),
    //             catchError(error => of(actions.saveTemplateFails({ error })))
    //         );
    //     })
    // ));

    saveTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeToolbarAction),
        filter(({ action }) => action === 'save'),
        withLatestFrom(
            this.store$.select(selectors.selectChangedTemplates),
        ),
        filter(([, changedTemplates]) => changedTemplates.length === 1),
        map(([, changedTemplates]) => actions.saveTemplates({ templates: changedTemplates }))
    ));

    showSaveDialog$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeToolbarAction),
        filter(({ action }) => action === 'save'),
        withLatestFrom(
            this.store$.select(selectors.selectChangedTemplates),
        ),
        filter(([, changedTemplates]) => changedTemplates.length > 1),
        switchMap(([, changedTemplates]) => this.modals.show<{ accept: boolean, entries: string[] }>(SaveTemplateComponent, {
            data: {
                entries: changedTemplates.map(x => x.info)
            }
        }).pipe(
            map((result) => result?.accept
                ? actions.saveTemplates({
                    templates: result.entries.map(x => changedTemplates.find(y => y.info.key === x)!)
                })
                : shared.empty()
            )
        ))
    ));

    sendTemplateToServer$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveTemplates),
        switchMap(({ templates }) => {
            return this.templates.saveTemplates(templates).pipe(
                switchMap(() => templates.map(x => actions.saveTemplateSuccess({ templateKey: x.info.key, parentKey: x.info.parent, template: x.content }))),
                catchError(error => of(actions.saveTemplateFails({ error })))
            );
        })
    ));

}
