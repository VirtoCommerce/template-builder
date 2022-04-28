import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { TemplateEntryList } from '@shared/models';

export const initApp = createAction('[app] init');

export const loadTemplateEntries = createAction('[shared] load template entries');
export const loadTemplateEntriesSuccess = createAction('[shared] load template entries success', props<{ templatesEntries: TemplateEntryList }>());
export const loadTemplateEntriesFails = createAction('[shared] load template entries fails', props<{ error: HttpErrorResponse }>());

export const selectTemplate = createAction('[shared] select template', props<{ template: string }>());
