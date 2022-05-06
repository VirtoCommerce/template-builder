import { Dictionary } from "@core/models";

export interface EditorUIState {
    states: Dictionary<{
        opened: boolean;
    }>;
    previewItemType: string | null;
    currentSectionsFilter: string | null;
};

export const initialState: EditorUIState = {
    states: {},
    previewItemType: null,
    currentSectionsFilter: null
};
