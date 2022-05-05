import { Injectable } from "@angular/core";

import { of } from "rxjs";
import { withLatestFrom, filter, switchMapTo, map, catchError, switchMap } from "rxjs/operators";

import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { RouterStateUrl } from '@shared/routing';

// import { ThemeSettingsService } from '@theme/services';

import { BuilderState } from "../state";
import * as actions from "../actions";
import { RouterNavigatedAction, ROUTER_NAVIGATED } from "@ngrx/router-store";
import * as selectors from "../selectors";
import * as fromRoute from '@shared/routing';

import { ModuleInfo } from "@editor/module.info";



import { SchemasServiceSimulator } from './../../services/schemas.service-simulator';
import { TemplatesServiceSimulator } from "../../services/templates.service-simulator";



@Injectable({
    providedIn: 'root'
})
export class TemplateEditorDataEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions,
        private schemas: SchemasServiceSimulator,
        private templates: TemplatesServiceSimulator
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

    raiseLoadTemplateModel$ = createEffect(() => this.actions$.pipe(
        ofType(actions.raiseLoadData),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(selectors.selectCurrentTemplateState),
            this.store$.select(fromRoute.selectTemplateParameter),
        ),
        // load when template still is not loaded or hasn't been changed yet
        filter(([, template, state]) => !template || !state || !state.isDirty),
        switchMap(([, , , alias]) => [actions.loadTemplateModel({ alias })])
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
        switchMap(() => this.schemas.getSchemas().pipe(
            map(schemas => actions.loadTemplateSchemasSuccess({ schemas })),
            catchError(error => of(actions.loadTemplateSchemasFails({ error })))
        ))
    ));

    loadTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.loadTemplateModel),
        switchMap(({ alias }) => this.templates.getTemplate(alias).pipe(
            map(template => actions.loadTemplateModelSuccess({ template, alias })),
            catchError(error => of(actions.loadTemplateModelFails({ error })))
        ))
    ));


    // loadSettingsData$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.loadSettingsData),
    //     switchMap(() => this.service.loadSettingsData().pipe(
    //         map(settingsData => actions.loadSettingsDataSuccess({ settingsData })),
    //         catchError(error => of(actions.loadSettingsDataFail({ error })))
    //     ))
    // ));

    // loadSettingsSchema$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.loadSettingsSchema),
    //     switchMap(() => this.service.loadSettingsSchema().pipe(
    //         map(schema => actions.loadSettingsSchemaSuccess({ schema })),
    //         catchError(error => of(actions.loadSettingsSchemaFail({ error })))
    //     ))
    // ));
}
