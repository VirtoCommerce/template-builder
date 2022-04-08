import { Component, OnInit } from '@angular/core';

// todo: remove it
import { SettingsSchemaServiceTmp } from './../../services/settings_schema.service';
import { SettingsDataServiceTmp } from './../../services/settings_data.service';

@Component({
    selector: 'app-theme-editor-host',
    templateUrl: './theme-editor-host.component.html',
    styleUrls: ['./theme-editor-host.component.scss']
})
export class ThemeEditorHostComponent implements OnInit {

    showOverlay = false;

    settings = this.data.getSettings();
    schema: any = this.schemaService.getSchema();

    constructor(
        private data: SettingsDataServiceTmp,
        private schemaService: SettingsSchemaServiceTmp
    ) { }

    ngOnInit(): void { }

    openGroup() {
        this.showOverlay = true;
    }
}
