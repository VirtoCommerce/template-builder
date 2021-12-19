import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from "@ngrx/store";

import { BuilderConfig } from '@app/models';
import { LocationContext } from '@shared/models';

export const loadConfig = createAction('[Config] load config');
export const loadConfigSuccess = createAction('[Config] load config success', props<{ config: BuilderConfig }>());
export const loadConfigFails = createAction('[Config] load config fails', props<{ error: HttpErrorResponse }>());

export const readUrlParameters = createAction('[Config] read url parameters');
export const setUrlParameters = createAction('[Config] set url parameters', props<{ location: LocationContext }>());
