import { createAction, props } from '@ngrx/store';

export const loadSettingsData = createAction('[theme integration] load settings data');
export const loadSettingsDataSuccess = createAction('[theme integration] load settings data success');
export const loadSettingsDataFail = createAction('[theme integration] load settings data fail');

export const loadSettingsSchema = createAction('[theme integration] load settings schema');
export const loadSettingsSchemaSuccess = createAction('[theme integration] load settings schema success');
export const loadSettingsSchemaFail = createAction('[theme integration] load settings schema fail');

