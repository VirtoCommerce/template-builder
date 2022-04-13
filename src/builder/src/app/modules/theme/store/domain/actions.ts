import { createAction, props } from "@ngrx/store";

export const previewPreset = createAction('[theme presets] preview preset', props<{ preset: string }>());
export const applyPreset = createAction('[theme presets] apply preset', props<{ preset: string }>());
