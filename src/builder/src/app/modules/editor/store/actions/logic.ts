import { createAction, props } from "@ngrx/store";

export const toggleSection = createAction('[template editor] toggle section', props<{ sectionId: string, template: string }>());
