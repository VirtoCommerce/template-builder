import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

import { SettingsDataModel, SettingsSchemaModel } from '@theme/models';

// todo: remove it
import { SettingsDataServiceTmp } from './settings_data.service';
import { SettingsSchemaServiceTmp } from './settings_schema.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeSettingsService {

    constructor(
        private data: SettingsDataServiceTmp,
        private schema: SettingsSchemaServiceTmp
    ) { }

    loadSettingsData(): Observable<SettingsDataModel> {
        return of(this.data.getSettings());
    }

    loadSettingsSchema(): Observable<SettingsSchemaModel> {
        return of(this.schema.getSchema());
    }
}
