import { Observable } from 'rxjs';

import { HttpWrapper, AppConfig } from '@app/services';

import {
    //SectionsSchemasList,
    TemplatesSchemasList
} from '@app/models';
import { TemplateModel } from '@editor/models';
import { IEditorService } from '@editor/di';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PlatformService implements IEditorService {

    constructor(private appConfig: AppConfig, private http: HttpWrapper) { }

    downloadTemplatesSchemasList(): Observable<TemplatesSchemasList> {
        return this.http.get<TemplatesSchemasList>(this.appConfig.config.templatesUrl);
    }

    downloadSectionsSchemasList(): Observable<any> {
        return this.http.get<any>(this.appConfig.config.sectionsUrl);
    }

    downloadBlocksSchemasList(): Observable<any> {
        return this.http.get<any>(this.appConfig.config.blocksUrl);
    }

    // downloadSectionsSchemasList(): Observable<SectionsSchemasList> {
    //     return this.http.get<SectionsSchemasList>(this.appConfig.config.sectionsUrl);
    // }

    // downloadBlocksSchemasList(): Observable<SectionsSchemasList> {
    //     return this.http.get<SectionsSchemasList>(this.appConfig.config.blocksUrl);
    // }

    downloadTemplate(templateKey: string): Observable<TemplateModel> {
        return this.http.get<TemplateModel>(`${this.appConfig.config.loadTemplateUrl}${templateKey}.json`);
    }

    uploadTemplate(name: string, template: TemplateModel): Observable<any> {
        throw new Error('Method not implemented.');
    }

    // uploadPage(path: string, page: PageModel): Observable<any> {
    //     throw new Error('Method not implemented.');
    // }

    onTemplateChanged(template: TemplateModel): Observable<unknown> {
        throw new Error('Method not implemented.');
    }

}
