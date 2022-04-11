import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-presets-panel',
    templateUrl: './presets-panel.component.html',
    styleUrls: ['./presets-panel.component.scss']
})
export class PresetsPanelComponent implements OnInit {

    activePreset: any;

    @Input() presets: any;

    @Output() backClick = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }

    onBackClick() {
        this.backClick.emit();
    }

    usePreset(preset: any) {
        // todo: should execute action
        this.activePreset = preset;
    }

    previewPreset(preset: any) {
        // todo: should execute action
        if (this.activePreset !== preset) {
            this.activePreset = preset;
        } else{
            this.activePreset = null;
        }
    }
}
