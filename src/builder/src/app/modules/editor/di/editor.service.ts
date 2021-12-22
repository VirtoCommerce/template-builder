import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateModel, TemplatesSchemasList, /*PageModel, */ SectionsSchemasList } from '@editor/models';

export const EDITOR_SERVICE = new InjectionToken<IEditorService>('editor.service');

export interface IEditorService {
    downloadTemplatesSchemasList(): Observable<TemplatesSchemasList>;
    downloadSectionsSchemasList(): Observable<SectionsSchemasList>;
    downloadBlocksSchemasList(): Observable<SectionsSchemasList>;

    downloadTemplate(templateKey: string): Observable<TemplateModel>;
    uploadTemplate(name: string, template: TemplateModel): Observable<any>;
    // uploadPage(path: string, page: PageModel): Observable<any>;
    onTemplateChanged(template: TemplateModel): Observable<unknown>; // ??
}
