import { createAction, props } from "@ngrx/store";

export const editSettingsGroup = createAction('[theme settings] edit settings group', props<{ group: string }>());
