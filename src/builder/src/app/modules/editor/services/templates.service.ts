import { Injectable } from "@angular/core";

import { BuilderHttpClient, AppConfig } from '@integration/services';
import { SectionModel, TemplateModel } from '@models/document';
import { Observable, map, of } from "rxjs";

import { helpers } from '@editor/helpers';
import { TemplateEntry } from '@shared/models';
import { } from '@integration/services';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {

    constructor(private http: BuilderHttpClient, private appConfig: AppConfig) { }

    // this method requires templateId and parent to identify template, end template entry to fill out a request
    getTemplate(path: string, type: string, template: TemplateEntry): Observable<TemplateModel | null> {
        const entry = { ...template, path }
        if (!entry.path) {
            return of(null);
        }
        // get template depends of its type. If no such type, use '__template' entry
        const templateUrl = this.appConfig.getValue('templateUrl', { item: entry, type, path });
        const targetUrl = templateUrl[entry.type || type || '__templates'] || templateUrl['__templates'];
        const request = this.http.generateRequest(targetUrl, { item: entry });
        return this.http.doRequest<TemplateModel | SectionModel[]>(request, { nullWhenError: false }, null).pipe(
            map(template =>
                helpers.convertTemplateIntoCorrectVersion(template)
            )
        );
    }

    saveTemplates(templates: { entry: TemplateEntry, content: TemplateModel }[]): Observable<any> {
        const templatesToSave = templates.map(template => ({ ...template, content: helpers.prepareTemplateForSave(template.content) }));
        const context = { templatesToSave };
        const saveTemplates = this.appConfig.getValue('saveTemplates', context);
        const request = this.http.generateRequest(saveTemplates, null, context);
        return this.http.doRequest(request);
    }
}
