import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { withLatestFrom, filter, switchMapTo, map, catchError, switchMap, exhaustMap } from "rxjs/operators";

import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { RouterStateUrl } from '@shared/routing';

// import { ThemeSettingsService } from '@theme/services';

import { BuilderState } from "../state";
import { helpers as editorHelpers } from '@editor/helpers';
import * as actions from "../actions";
import * as shared from '@shared/store/actions';
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import * as selectors from "../selectors";
import * as fromRoute from '@shared/routing';
import * as fromShared from '@shared/store/selectors';

import { ModuleInfo } from "@editor/module.info";

import { SchemasService, TemplatesService } from "@editor/services";

@Injectable({
    providedIn: 'root'
})
export class TemplateEditorDataEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions,
        private schemas: SchemasService,
        private templates: TemplatesService
    ) { }

    loadTemplateData$ = createEffect(() => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        filter((action: RouterNavigatedAction<RouterStateUrl>) => !!action?.payload?.routerState?.data),
        map((action: RouterNavigatedAction<RouterStateUrl>) => action.payload.routerState.data),
        filter((data: any) => data.module === ModuleInfo.name),
        switchMap(() => [
            actions.raiseLoadData()
        ])
    ));

    loadTemplateDataOnInit$ = createEffect(() => this.actions$.pipe(
        ofType(shared.initApp),
        switchMap(() => [
            actions.raiseLoadData()
        ])
    ));

    raiseLoadTemplateModel$ = createEffect(() => this.actions$.pipe(
        ofType(actions.raiseLoadData),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(selectors.selectCurrentTemplateState),
            this.store$.select(fromShared.selectCurrentTemplateEntry),
            this.store$.select(fromRoute.selectTemplateParameter),
        ),
        // load when template still is not loaded or hasn't been changed yet
        filter(([, template, state, entry]) => !template || !state || !entry),
        switchMap(([, , , , alias]) => [actions.loadTemplateModel({ alias })])
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
            this.store$.select(fromShared.selectCurrentTemplateEntry)
        ),
        filter(([, templateEntry]) => !!templateEntry && !!templateEntry.path),
        switchMap(([{ alias }, templateEntry]) => this.templates.getTemplate(templateEntry.path).pipe(
            filter(template => !!template),
            map(template => editorHelpers.prepareTemplate(template!)),
            map(template => actions.loadTemplateModelSuccess({ template, alias })),
            catchError(error => [
                actions.loadTemplateModelFails({ error }),
                shared.showNotification({
                    message: 'Could not load template',
                    msgType: 'error',
                    top: true
                })
            ])
        ))
    ));

    saveTemplates$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeToolbarAction),
        withLatestFrom(
            // todo: only current template will be processed
            // question: should we save all templates?
            this.store$.select(selectors.selectCurrentTemplateState),
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(fromShared.selectCurrentTemplateEntry)
        ),
        filter(([x, state, model]) => x.action === 'save' && state!.isDirty && !!model),
        switchMap(([, , model, entry]) => this.templates.saveTemplate({ [entry.path]: model! }).pipe(
            map(() => actions.saveTemplateSuccess({ alias: entry!.alias })),
            catchError(error => of(actions.saveTemplateFails({ error })))
        ))
    ));

}
