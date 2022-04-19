import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BuilderState } from '@theme/store/state';

import * as actions from '@theme/store/actions';
import * as fromTheme from '@theme/store/selectors';

@Component({
    selector: 'app-presets-panel',
    templateUrl: './presets-panel.component.html',
    styleUrls: ['./presets-panel.component.scss']
})
export class PresetsPanelComponent implements OnInit {

    presets$ = this.store$.select(fromTheme.selectPresets);
    presetsState$ = this.store$.select(fromTheme.selectPresetsState);

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
}
