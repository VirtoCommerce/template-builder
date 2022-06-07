import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { AppConfig } from './app.config';
import { SmartHttpClient } from '@core/services';
import { TemplateEntryList } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    constructor(private http: SmartHttpClient) { }

    getTemplatesList(): Observable<TemplateEntryList> {
        return this.http.get<TemplateEntryList>(AppConfig.templatesListUrl);
    }
}
