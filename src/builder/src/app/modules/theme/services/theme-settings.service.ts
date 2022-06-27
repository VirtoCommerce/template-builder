import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

import { BuilderHttpClient, AppConfig } from '@integration/services';
import { SettingsDataModel, SettingsSchemaModel } from '@theme/models';

@Injectable({
    providedIn: 'root'
})
export class ThemeSettingsService {

    constructor(
        private http: BuilderHttpClient,
        private appConfig: AppConfig
    ) { }

    loadSettingsData(): Observable<SettingsDataModel> {
        const settingsDataUrl = this.appConfig.getValue('settingsDataUrl');
        return this.http.get<SettingsDataModel>(settingsDataUrl);
    }

    loadSettingsSchema(): Observable<SettingsSchemaModel> {
        const settingsSchemaUrl = this.appConfig.getValue('settingsSchemaUrl')
        return this.http.get<SettingsSchemaModel>(settingsSchemaUrl);
    }

    saveSettings(settings: SettingsDataModel): Observable<boolean> {
        const saveSettings = this.appConfig.getValue('saveSettings');
        const settingsPath = this.appConfig.getValue('settingsPath');
        const files = JSON.stringify({ [settingsPath]: settings });
        return this.http.post(saveSettings, { files }).pipe(map(() => true));
    }
}
