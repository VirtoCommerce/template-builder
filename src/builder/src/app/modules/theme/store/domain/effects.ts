import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { withLatestFrom, filter, switchMap, map, tap } from "rxjs/operators";

import * as actions from "../actions";
import { BuilderState } from "../state";

import * as sharedActions from '@shared/store/actions';

import * as routingActions from '@shared/routing/actions';
import * as routingSelectors from '@shared/routing'

import * as domainSelectors from "../selectors";

@Injectable({
    providedIn: 'root'
})
export class ThemeDomainEffects {
    constructor(
        private store$: Store<BuilderState>,
        private actions$: Actions
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
        map(() => sharedActions.showNotification({ message: 'Preset applied', msgType: 'success' }))
    ));

    saveSettingsSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveSettingsSuccess),
        map(() => sharedActions.showNotification({ message: 'Settings were successfully saved', msgType: 'success', top: true }))
    ));

    saceSettingsFail$ = createEffect(() => this.actions$.pipe(
        ofType(actions.saveSettingsFail),
        tap((error) => console.log(error)),
        map(() => sharedActions.showNotification({ message: 'Could not save settings', msgType: 'error', top: true }))
    ));

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
