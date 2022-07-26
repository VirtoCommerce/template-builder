import { ServerRequestDescriptor } from '@models/index';
import { Injectable } from "@angular/core";
import { map, Observable } from 'rxjs';

import { AppConfig } from '@integration/services';
import { BuilderHttpClient } from '@integration/services';
import { TemplateEntry, TemplateEntryList } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    constructor(private http: BuilderHttpClient, private appConfig: AppConfig) { }

    getTemplatesList(): Observable<TemplateEntryList> {
        const templatesListUrl = this.appConfig.getValue('templatesListUrl');
        return this.http.get<TemplateEntryList>(templatesListUrl);
    }

    getChildrenTemplates(templateEntry: TemplateEntry): Observable<TemplateEntryList> {
        const givenRequest = Array.isArray(templateEntry.request) ? templateEntry.request[0] : templateEntry.request; // todo: can be multiple requests
        const httpRequest = this.http.generateRequest(givenRequest || null); // todo: need context to generate request
        return this.http.doRequest<TemplateEntryList>(httpRequest, null, { item: templateEntry }).pipe(map(x => x || {})); // todo: what should be context?
    }
}
