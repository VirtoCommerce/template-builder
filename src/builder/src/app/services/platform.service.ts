import { Observable } from 'rxjs';

import { HttpWrapper, AppConfig } from '@app/services';

import { TemplatesList, TemplateModel, PageModel } from '@editor/models';
import { IEditorService } from '@editor/di';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlatformService implements IEditorService {

    constructor(private appConfig: AppConfig, private http: HttpWrapper) { }

    downloadTemplatesList(): Observable<TemplatesList> {
        return this.http.get<TemplatesList>(this.appConfig.config.templatesUrl);
    }

    uploadTemplate(name: string, template: TemplateModel): Observable<any> {
        throw new Error('Method not implemented.');
    }

    uploadPage(path: string, page: PageModel): Observable<any> {
        throw new Error('Method not implemented.');
    }

    onTemplateChanged(template: TemplateModel): Observable<unknown> {
        throw new Error('Method not implemented.');
    }

}
