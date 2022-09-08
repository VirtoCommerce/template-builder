import { Injectable } from "@angular/core";

import { BuilderHttpClient, AppConfig } from '@integration/services';
import { TemplateModel } from '@models/document';
import { map, Observable, of } from "rxjs";

// import { helpers } from '@editor/helpers';
import { TemplateEntry } from '@shared/models';
import {  } from '@integration/services';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    constructor(private http: BuilderHttpClient, private appConfig: AppConfig) { }

    getTemplate(template: TemplateEntry): Observable<TemplateModel | null> {
        if (!template.path) {
            return of(null);
        }
        const templateUrl = this.appConfig.getValue('templateUrl', { item: template });
        const request = this.http.generateRequest(templateUrl, { item: template });
        // const url = `${templateUrl}&path=${template.path}&type=${template.type}`;
        return this.http.doRequest<TemplateModel>(request);
    }

    saveTemplate(templates: { path: string, type: string, content: TemplateModel }[]): Observable<any> {
        const files = JSON.stringify(templates);
        const context = { item: files, items: files, templates };
        const saveTemplates = this.appConfig.getValue('saveTemplates', context);
        const request = this.http.generateRequest(saveTemplates, null, context);
        return this.http.doRequest(request);
        // todo: note that it probably should use doRequest method
        // return this.http.post(saveTemplates, { files });
    }
}
