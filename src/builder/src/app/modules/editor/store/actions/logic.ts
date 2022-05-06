import { createAction, props } from "@ngrx/store";

export const showBlankSections = createAction('[template editor] show blank sections', props<{ sectionId: string | null }>());
export const closeAddItemPanel = createAction('[template editor] close add item panel');
export const editSectionAction = createAction('[template editor] edit section', props<{ sectionId: string }>());
export const closeEditItemPanel = createAction('[template editor] close edit item panel');
