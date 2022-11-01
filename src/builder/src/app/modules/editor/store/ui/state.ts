import { Dictionary } from "@models/index";

export interface EditorUIState {
    states: Dictionary<{
        opened: boolean;
    }>;
    previewItemType: string | null;
    currentSectionsFilter: string | null;
    dragSectionId: string | null;
    isTemplateLoading: boolean;
    isSchemasLoading: boolean;
};

export const initialState: EditorUIState = {
    states: {},
    previewItemType: null,
    currentSectionsFilter: null,
    dragSectionId: null,
    isTemplateLoading: false,
    isSchemasLoading: false
};
