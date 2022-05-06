import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { withLatestFrom, filter, switchMapTo, map, catchError, switchMap } from "rxjs/operators";

// import { ThemeSettingsService } from '@theme/services';

import * as routingActions from '@shared/routing/actions';
import * as routingSelectors from '@shared/routing'

import * as editorHelpers from '@editor/services/editor.helpers';

import { BuilderState } from "../state";
import * as actions from "../actions";
import * as selectors from "../selectors";

@Injectable({
    providedIn: 'root'
})
export class TemplateEditorDomainEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions
    ) { }

    navigateToAddSection$ = createEffect(() => this.actions$.pipe(
        ofType(actions.showBlankSections),
        filter(x => !x.sectionId),
        map(() => routingActions.go({ path: ['/pages/add'] }))
    ));

    navigateToAddBlock$ = createEffect(() => this.actions$.pipe(
        ofType(actions.showBlankSections),
        filter(x => !!x.sectionId),
        map(({ sectionId }) => routingActions.go({ path: ['/pages/add', sectionId] }))
    ));

    navigateToEditTemplate$ = createEffect(() => this.actions$.pipe(
        ofType(actions.closeAddItemPanel),
        switchMap(() => [
            routingActions.go({ path: ['/pages'] }),
            actions.resetGroupsState()
        ])
    ));

    addItem$ = createEffect(() => this.actions$.pipe(
        ofType(actions.addItemAction),
        withLatestFrom(
            this.store$.select(selectors.selectCurrentTemplateModel),
            this.store$.select(selectors.selectSectionModelFromRoute),
            this.store$.select(routingSelectors.selectTemplateParameter)
        ),
        filter(([, template]) => !!template),
        switchMap(([{ schema }, template, section, templateId]) => [
            actions.updateTemplateAction({
                template: editorHelpers.addItemToTemplate(schema, template!, section!), // section can be null
                alias: templateId
            }),
            actions.closeAddItemPanel()
        ])
    ));
}
