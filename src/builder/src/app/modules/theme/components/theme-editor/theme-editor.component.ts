import { SettingsSchemaServiceTmp } from './../../services/settings_schema.service';
import { SettingsDataServiceTmp } from './../../services/settings_data.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-theme-editor',
    templateUrl: './theme-editor.component.html',
    styleUrls: ['./theme-editor.component.scss']
})
export class ThemeEditorComponent implements OnInit {

    settings = this.data.getSettings();
    schema = this.schemaService.getSchema();

    constructor(
        private data: SettingsDataServiceTmp,
        private schemaService: SettingsSchemaServiceTmp
    ) { }

    ngOnInit(): void {
    }

}
