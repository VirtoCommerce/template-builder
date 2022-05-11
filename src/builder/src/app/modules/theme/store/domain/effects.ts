import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { withLatestFrom, filter, switchMap, map, tap } from "rxjs/operators";

import { NotificationsService } from '@core/services';

import * as actions from "../actions";
import { BuilderState } from "../state";

import * as routingActions from '@shared/routing/actions';
import * as routingSelectors from '@shared/routing'

import * as domainSelectors from "../selectors";

@Injectable({
    providedIn: 'root'
})
export class ThemeDomainEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions,
        private notifications: NotificationsService
    ) { }

    toggleGroup$ = createEffect(() => this.actions$.pipe(
        ofType(actions.toggleGroup),
        withLatestFrom(
            this.store$.select(domainSelectors.selectOpenedGroups)
        ),
        map(([{ group }, groups]) => {
            // const route = this.getAllRouteParameters(currentRoute);
            const newGroups = groups.indexOf(group.name) === -1 ? [...groups.filter(x => !!x), group.name] : [...groups.filter(g => g !== group.name)];
            return routingActions.go({ queryParams: { groups: newGroups.join(',') || undefined } })
        })
    ));

    presetApplied$ = createEffect(() => this.actions$.pipe(
        ofType(actions.applyPreset),
        tap(() => this.notifications.successLeft('Preset applied')),
    ), { dispatch: false });

    saveSettingsSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveSettingsSuccess),
        tap(() => this.notifications.successRight('Settings were successfully saved')),
    ), { dispatch: false });

    saceSettingsFail$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveSettingsFail),
        tap(() => this.notifications.errorRight('Could not save settings'))
    ), { dispatch: false });

    cancelAction$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeAction),
        filter(({ action }) => action === 'cancel'),
        switchMap(() => [
            actions.revertChanges(),
            actions.exitSettings()
        ])
    ));

    applyAction$ = createEffect(() => this.actions$.pipe(
        ofType(actions.executeAction),
        filter(({ action }) => action === 'save'),
        switchMap(() => [
            actions.saveSettings()
        ])
    ));

    successfullSaved$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveSettingsSuccess),
        switchMap(() => [
            actions.applyChanges(),
            actions.exitSettings()
        ])
    ));
}
