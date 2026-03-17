import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, AfterViewInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { ModelChangedEventArgs } from '@core/models';

import * as fromTheme from '@theme/store/selectors';
import * as actions from '@theme/store/actions';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeEditorComponent implements OnInit {

    private readonly store$ = inject(Store<any>);

    editableGroup$ = this.store$.select(fromTheme.selectEditableGroup);
    settings$ = this.store$.select(fromTheme.selectCurrentSettings);
    schema$ = this.store$.select(fromTheme.selectSettingsSchema);
    uiState$ = this.store$.select(fromTheme.selectGroupsState);

    context = <any>{}; // todo: select from state


    ngOnInit(): void { }

    toggleGroup(group: any) {
        this.store$.dispatch(actions.toggleGroup({ group }));
    }

    onBackClick(group: any) {
        this.store$.dispatch(actions.toggleGroup({ group }));
    }

    onPresetsClick() {
        this.store$.dispatch(actions.gotoPresets());
    }

    onSettingsChanged(args: ModelChangedEventArgs) {
        this.store$.dispatch(actions.updateSettings(args));
    }
}
