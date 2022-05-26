import { createAction, props } from "@ngrx/store";
import { ReoderItemsModel, SectionModel } from "@app/modules/core/models";

export const showBlankSections = createAction('[template editor] show blank sections', props<{ sectionId: string | null }>());
export const closeAddItemPanel = createAction('[template editor] close add item panel');
export const editSectionAction = createAction('[template editor] edit section', props<{ sectionId: string }>());
export const editBlockAction = createAction('[template editor] edit block', props<{ sectionId: string, blockId: string }>());
export const closeEditItemPanel = createAction('[template editor] close edit item panel');
export const sortItems = createAction('[template editor] sort items', props<{ options: ReoderItemsModel }>());

export const sectionChangedAction = createAction('[template editor] section changed', props<{ changes: Partial<SectionModel> }>());
export const executeContextMenuAction = createAction('[template editor] execute context menu action', props<{ action: string, source: string, section?: SectionModel, block?: SectionModel }>());
