import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModelChangedEventArgs, ControlContext } from '@core/models';
import { OverlapPanelComponent } from '@core/components/overlap-panel/overlap-panel.component';
import { PanelComponent } from '@core/components/panel/panel.component';
import { DynamicFormComponent } from '@core/dynamics/dynamic-form/dynamic-form.component';
import { IconComponent } from '@core/components/icon/icon.component';

@Component({
    selector: 'app-settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [OverlapPanelComponent, PanelComponent, DynamicFormComponent, IconComponent]
})
export class SettingsPanelComponent implements OnInit {

    @Input() settings: any;
    @Input() group: any;
    @Input() context!: ControlContext;

    @Output() backClick = new EventEmitter();
    @Output() settingsChanged = new EventEmitter<ModelChangedEventArgs>();

    ngOnInit(): void {
    }

    onBackClick() {
        this.backClick.emit();
    }

    onSettingsChanged(args: ModelChangedEventArgs) {
        this.settingsChanged.emit(args);
    }
}
