import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from "@ngrx/store";
import { SectionSchema } from '@core/models';
import { TemplateModel, SchemasList } from '@editor/models';

export const raiseLoadData = createAction('[template editor] raise load data');

export const loadTemplateModel = createAction('[template editor] load template model', props<{ alias: string }>());
export const loadTemplateModelSuccess = createAction('[template editor] load template model success', props<{ template: TemplateModel, alias: string }>());
export const loadTemplateModelFails = createAction('[template editor] load template model fails', props<{ error: HttpErrorResponse }>());

export const loadTemplateSchemas = createAction('[template editor] load template schemas');
export const loadTemplateSchemasSuccess = createAction('[template editor] load template schemas success', props<{ schemas: SchemasList }>());
export const loadTemplateSchemasFails = createAction('[template editor] load template schemas fails', props<{ error: HttpErrorResponse }>());

export const updateTemplateAction = createAction('[template editor] update template', props<{ template: TemplateModel, alias: string }>());
export const addItemAction = createAction('[template editor] add item', props<{ schema: SectionSchema }>());
