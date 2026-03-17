import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BuilderState } from '@theme/store/state';

import * as actions from '@theme/store/actions';
import * as fromTheme from '@theme/store/selectors';
import * as fromRoute from '@shared/routing/selectors';

@Component({
    selector: 'app-presets-panel',
    templateUrl: './presets-panel.component.html',
    styleUrls: ['./presets-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetsPanelComponent implements OnInit {

    filter$ = this.store$.select(fromTheme.selectPresetsFilter);
    viewModel$ = this.store$.select(fromTheme.selectPresetsContext);
    isHalfScreen$ = this.store$.select(fromRoute.isDesktop50);

    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void { }

    onBackClick() {
        this.store$.dispatch(actions.exitPresets());
    }

    usePreset(preset: string) {
        this.store$.dispatch(actions.applyPreset({ preset }));
    }

    previewPreset(preset: string) {
        this.store$.dispatch(actions.previewPreset({ preset }));
    }

    applyPresetsFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.store$.dispatch(actions.applyPresetsFilter({ filter: value }));
    }
}
