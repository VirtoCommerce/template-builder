import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { withLatestFrom, filter, mapTo, map } from "rxjs/operators";

import * as actions from "../actions";
import { BuilderState } from "../state";

import * as routingActions from '@routing/store/actions';
import * as routingSelectors from '@routing/store'

import * as domainSelectors from "../selectors";
import { ActivatedRouteSnapshot } from "@angular/router";

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

    gotoPresets$ = createEffect(() => this.actions$.pipe(
        ofType(actions.gotoPresets),
        mapTo(routingActions.go({ path: ['/themes/presets'] }))
    ));

    previewPreset$ = createEffect(() => this.actions$.pipe(
        ofType(actions.previewPreset),
        map(({ preset }) => routingActions.go({ queryParams: { preset } }))
    ));

    exitPresets$ = createEffect(() => this.actions$.pipe(
        ofType(actions.exitPresets, actions.applyPreset),
        mapTo(routingActions.go({ path: ['/themes'], queryParams: { preset: undefined } }))
    ));

    // private getAllRouteParameters(root: ActivatedRouteSnapshot) {
    //     let route = root;
    //     let params = new Map(Object.keys(route.params).map(key => [key, route.params[key]]));
    //     while (route.firstChild) {
    //         route = route.firstChild;
    //         Object.keys(route.params).forEach(key => params.set(key, route.params[key]));
    //     }
    //     return params;
    // }

    // here we need to send presets to preview or notify settings changes


    // raiseLoadData$ = createEffect(() => this.actions$.pipe(
    //     ofType(actions.data.raiseLoadData),
    //     withLatestFrom(
    //         this.store$.select(dataSelectors.selectCurrentSettings),
    //     ),
    //     filter(([, settings]) => settings !== null),
    //     mapTo(dataActions.loadSettingsData())
    // ));
}
