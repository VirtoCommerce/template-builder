import { Injectable } from "@angular/core";

import { BuilderHttpClient, AppConfig } from '@integration/services';
import { PageModel, SectionModel, TemplateModel } from '@models/document';
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
    getTemplate(path: string, type: string, template: TemplateEntry, pageId: string): Observable<TemplateModel | null> {
        const entry = { ...template, path, pageId }
        if (!entry.pageId && !entry.path) {
            return of(null);
        }

        // get template depends of its type. If no such type, use '__template' entry
        const templateUrl = this.appConfig.getValue('templateUrl', { item: entry, type, path, pageId });
        const targetUrl = templateUrl[entry.type || type || '__templates'] || templateUrl['__templates'] || templateUrl;
        const request = this.http.generateRequest(targetUrl, { item: entry });
        return this.http.doRequest<TemplateModel | SectionModel[] | PageModel>(request, { nullWhenError: false }, null).pipe(
            map(template =>
                helpers.convertTemplateIntoCorrectVersion(template)
            )
        );
    }

    getTemplatePublishStatus(path: string, type: string, entry: TemplateEntry): Observable<{ published: boolean, hasChanges: boolean }> {
        const publishStatusUrls = this.appConfig.getValue('publish', { item: entry, type, path });
        const statusUrl = publishStatusUrls['status'];
        const request = this.http.generateRequest(statusUrl, { item: entry });
        return this.http.doRequest<{ published: boolean, hasChanges: boolean }>(request, { nullWhenError: false }, null).pipe(
            map(result => result || { published: true, hasChanges: false })
        );
    }

    publishTemplate(path: string, type: string, entry: TemplateEntry): Observable<any> {
        const publishStatusUrls = this.appConfig.getValue('publish', { item: entry, type, path });
        const statusUrl = publishStatusUrls['publish'];
        const request = this.http.generateRequest(statusUrl, { item: entry });
        return this.http.doRequest(request, { nullWhenError: false }, null);
    }

    unpublishTemplate(path: string, type: string, entry: TemplateEntry): Observable<any> {
        const publishStatusUrls = this.appConfig.getValue('publish', { item: entry, type, path });
        const statusUrl = publishStatusUrls['unpublish'];
        const request = this.http.generateRequest(statusUrl, { item: entry });
        return this.http.doRequest(request, { nullWhenError: false }, null);
    }

    externalPreview(path: string, type: string, entry: TemplateEntry) {
        const previewUrl = this.appConfig.getValue('externalPreview', { item: entry, type, path });
        // open new tab with the previewUrl
        window.open(previewUrl.url, '_blank');
    }

    saveTemplates(templates: { entry: TemplateEntry, content: TemplateModel }[]): Observable<any> {
        const templatesToSave = templates.map(template => (
            {
                ...template, 
                content: helpers.prepareTemplateForSave(template.content) 
            }));
        const context = { templatesToSave };
        const saveTemplates = this.appConfig.getValue('saveTemplates', context);
        const request = this.http.generateRequest(saveTemplates, null, context);
        return this.http.doRequest(request);
    }
}
