import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

import { TemplateEntryList } from '@shared/models';

export const initShared = createAction('[shared] init');
export const initApp = createAction('[app] init');
export const empty = createAction('[app] empty');

export const loadTemplateEntries = createAction('[shared] load template entries');
export const loadTemplateEntriesSuccess = createAction('[shared] load template entries success', props<{ templatesEntries: TemplateEntryList }>());
export const loadTemplateEntriesFails = createAction('[shared] load template entries fails', props<{ error: HttpErrorResponse }>());

export const templateChanged = createAction('[shared] template changed', props<{ template: string, in: string | null }>());
export const selectDefaultTemplate = createAction('[shared] select first template');
export const changePreviewMode = createAction('[shared] change preview mode', props<{ mode: string | null }>());

export const setCurrentDirtyState = createAction('[shared] set current dirty state', props<{ dirty: boolean }>());
export const setRootDirtyState = createAction('[shared] set root dirty state', props<{ template: string, dirty: boolean }>());
export const setDirtyState = createAction('[shared] set dirty state', props<{ template: string, parent: string, dirty: boolean }>());

export const selectTemplate = createAction('[shared] select template', props<{ template: string }>());
export const navigateToCurrentTemplate = createAction('[shared] navigate to current template');
export const filterTemplates = createAction('[shared] filter templates', props<{ filter: string }>());
export const displayRootTemplates = createAction('[shared] display root templates');

export const loadChildrenTemplates = createAction('[shared] load children templates', props<{ template: string }>());
export const loadChildrenTemplatesSuccess = createAction('[shared] load children templates success', props<{ childrenEntries: TemplateEntryList, parentTemplate: string }>());
export const loadChildrenTemplatesFails = createAction('[shared] load children requested', props<{ error: HttpErrorResponse, parentTemplate: string }>());

export const broadcastMessage = createAction('[shared] broadcast message', props<{ msg: any }>());
export const showNotification = createAction('[shared] show notification', props<{ message: string, msgType: 'error'|'success'|'info'|'warning', top?: boolean }>());
