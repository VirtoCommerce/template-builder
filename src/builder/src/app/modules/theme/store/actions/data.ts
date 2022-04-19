import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { SettingsDataModel, SettingsSchemaModel } from '@theme/models';

export const raiseLoadData = createAction('[theme data] raise load data');

export const loadSettingsData = createAction('[theme data] load settings data');
export const loadSettingsDataSuccess = createAction('[theme data] load settings data success', props<{ settingsData: SettingsDataModel }>());
export const loadSettingsDataFail = createAction('[theme data] load settings data fail', props<{ error: HttpErrorResponse }>());

export const loadSettingsSchema = createAction('[theme data] load settings schema');
export const loadSettingsSchemaSuccess = createAction('[theme data] load settings schema success', props<{ schema: SettingsSchemaModel }>());
export const loadSettingsSchemaFail = createAction('[theme data] load settings schema fail', props<{ error: HttpErrorResponse }>());
