import { createAction, props } from "@ngrx/store";

export const applyPreset = createAction('[theme presets] apply preset', props<{ preset: string }>());

export const toggleGroup = createAction('[theme settings] toggle group', props<{ group: any }>());
export const gotoPresets = createAction('[theme settings] go to presets');
export const previewPreset = createAction('[theme settings] preview preset', props<{ preset: string }>());
export const exitPresets = createAction('[theme settings] exit presets');

export const updateSettings = createAction('[theme data] update settings', props<{ model: any, value: any }>());
