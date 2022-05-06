import { createAction, props } from "@ngrx/store";

export const showBlankSections = createAction('[template editor] show blank sections', props<{ sectionId: string | null }>());
export const closeAddItemPanel = createAction('[template editor] close add item panel');
