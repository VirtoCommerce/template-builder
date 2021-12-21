import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TemplateModel, TemplatesList, PageModel } from '@editor/models';

export const EDITOR_SERVICE = new InjectionToken<IEditorService>('editor.service');

export interface IEditorService {
    downloadTemplatesList(): Observable<TemplatesList>;
    uploadTemplate(name: string, template: TemplateModel): Observable<any>;
    uploadPage(path: string, page: PageModel): Observable<any>;
    onTemplateChanged(template: TemplateModel): Observable<unknown>; // ??
}
