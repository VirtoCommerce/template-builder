import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModelChangedEventArgs } from '@core/models';

@Component({
    selector: 'app-settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.scss']
})
export class SettingsPanelComponent implements OnInit {

    @Input() settings: any;
    @Input() group: any;
    @Input() context = {};

    @Output() backClick = new EventEmitter();
    @Output() settingsChanged = new EventEmitter<ModelChangedEventArgs>();

    constructor() { }

    ngOnInit(): void {
    }

    onBackClick() {
        this.backClick.emit();
    }

    onSettingsChanged(args: ModelChangedEventArgs) {
        this.settingsChanged.emit(args);
    }
}
