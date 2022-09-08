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

    getTemplatesList(): Observable<TemplateEntryList | null> {
        const templatesListUrl = this.appConfig.getValue('templatesListUrl');
        const request = this.http.generateRequest(templatesListUrl);
        return this.http.doRequest<TemplateEntryList>(request);
    }

    getChildrenTemplates(templateEntry: TemplateEntry, context: any): Observable<TemplateEntryList> {
        const httpRequest = this.http.generateRequest(templateEntry.request || null, null, context);
        return this.http.doRequest<TemplateEntryList>(httpRequest, null, context).pipe(map(x => x || {}));
    }
}
