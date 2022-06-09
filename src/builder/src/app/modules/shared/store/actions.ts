import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { TemplateEntryList } from '@shared/models';

export const initShared = createAction('[shared] init');
export const initApp = createAction('[app] init');
export const empty = createAction('[app] empty');

export const loadTemplateEntries = createAction('[shared] load template entries');
export const loadTemplateEntriesSuccess = createAction('[shared] load template entries success', props<{ templatesEntries: TemplateEntryList }>());
export const loadTemplateEntriesFails = createAction('[shared] load template entries fails', props<{ error: HttpErrorResponse }>());

export const selectTemplate = createAction('[shared] select template', props<{ template: string }>());
export const templateChanged = createAction('[shared] template changed', props<{ template: string }>());
export const selectDefaultTemplate = createAction('[shared] select first template');
export const changePreviewMode = createAction('[shared] change preview mode', props<{ mode: string | null }>());

export const broadcastMessage = createAction('[shared] broadcast message', props<{ msg: any }>());
export const showNotification = createAction('[shared] show notification', props<{ message: string, msgType: 'error'|'success'|'info'|'warning', top?: boolean }>());
