import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

import { SmartHttpClient } from '@core/services';
import { AppConfig } from '@shared/services';
import { SettingsDataModel, SettingsSchemaModel } from '@theme/models';

@Injectable({
    providedIn: 'root'
})
export class ThemeSettingsService {

    constructor(
        private http: SmartHttpClient
    ) { }

    loadSettingsData(): Observable<SettingsDataModel> {
        return this.http.get<SettingsDataModel>(AppConfig.settingsDataUrl);
    }

    loadSettingsSchema(): Observable<SettingsSchemaModel> {
        return this.http.get<SettingsSchemaModel>(AppConfig.settingsSchemaUrl);
    }

    saveSettings(settings: SettingsDataModel): Observable<boolean> {
        const files = JSON.stringify({ [AppConfig.settingsPath]: settings });
        return this.http.post(AppConfig.saveSettings, { files }).pipe(map(() => true));
    }
}
