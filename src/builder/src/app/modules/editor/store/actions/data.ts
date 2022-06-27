import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from "@ngrx/store";
import { SchemasList } from '@editor/models';
import { TemplateModel } from '@models/document';

export const raiseLoadData = createAction('[template editor] raise load data');

export const loadTemplateModel = createAction('[template editor] load template model', props<{ alias: string }>());
export const loadTemplateModelSuccess = createAction('[template editor] load template model success', props<{ template: TemplateModel, alias: string }>());
export const loadTemplateModelFails = createAction('[template editor] load template model fails', props<{ error: HttpErrorResponse }>());

export const loadTemplateSchemas = createAction('[template editor] load template schemas');
export const loadTemplateSchemasSuccess = createAction('[template editor] load template schemas success', props<{ schemas: SchemasList }>());
export const loadTemplateSchemasFails = createAction('[template editor] load template schemas fails', props<{ error: HttpErrorResponse }>());

export const updateTemplateAction = createAction('[template editor] update template', props<{ template: TemplateModel, alias: string }>());

export const saveTemplateSuccess = createAction('[template editor] save template success', props<{ alias: string }>());
export const saveTemplateFails = createAction('[template editor] save template fails', props<{ error: HttpErrorResponse }>());
