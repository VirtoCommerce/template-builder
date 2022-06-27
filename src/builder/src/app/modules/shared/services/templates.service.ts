import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

import { AppConfig } from '@integration/services';
import { BuilderHttpClient } from '@integration/services';
import { TemplateEntryList } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    constructor(private http: BuilderHttpClient, private appConfig: AppConfig) { }

    getTemplatesList(): Observable<TemplateEntryList> {
        const templatesListUrl = this.appConfig.getValue('templatesListUrl');
        return this.http.get<TemplateEntryList>(templatesListUrl);
    }
}
