import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

    editableGroup!: any;

    @Input() settings: any;
    @Input() schema: any[] = [];
    context = {};
    currentSettings: any;

    @Output() editGroup = new EventEmitter();
    @Output() showPresets = new EventEmitter();

    uiState: any = {};

    constructor() { }

    ngOnInit(): void {
        this.schema.forEach((group, index) => {
            this.uiState[group.name] = {
                opened: false,
                inline: index !== 0
            }
        });
        this.currentSettings = typeof this.settings.current === 'string'
            ? (<any>this.settings.presets)[this.settings.current]
            : this.settings.current;

    }

    toggleGroup(group: any) {
        if (this.uiState[group.name].inline) {
            this.uiState[group.name].opened = !this.uiState[group.name].opened;
        } else {
            this.editableGroup = group;
        }
    }

    onBackClick() {
        this.editableGroup = null;
    }

    onPresetsClick() {
        this.showPresets.emit();
    }
}
