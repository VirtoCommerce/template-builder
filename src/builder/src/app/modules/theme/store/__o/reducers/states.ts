
export interface ThemeState {
    dataLoading: boolean;
    schemaLoading: boolean;

    settingsData: any | null;
    settingsSchema: any | null;
}

export const initialState: ThemeState = {
    dataLoading: false,
    schemaLoading: false,
    settingsData: null,
    settingsSchema: null
};
