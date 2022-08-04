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
        // todo: use http.doRequest and change settings to full request description
        return this.http.get<SettingsDataModel>(settingsDataUrl);
    }

    loadSettingsSchema(): Observable<SettingsSchemaModel> {
        const settingsSchemaUrl = this.appConfig.getValue('settingsSchemaUrl')
        // todo: use http.doRequest and change settings to full request description
        return this.http.get<SettingsSchemaModel>(settingsSchemaUrl);
    }

    saveSettings(settings: SettingsDataModel): Observable<boolean> {
        const saveSettingsUrl = this.appConfig.getValue('saveSettings');
        const settingsPath = this.appConfig.getValue('settingsPath');
        const files = JSON.stringify([{ path: settingsPath, type: 'themes', content: settings }]);
        // todo: use http.doRequest and change settings to full request description
        return this.http.post(saveSettingsUrl, { files }).pipe(map(() => true));
    }
}
