export interface ThemeDomainState {
    settingsLoading: boolean;
    schemaLoading: boolean;
    isDirty: boolean;
}

export const initialState: ThemeDomainState = {
    settingsLoading: false,
    schemaLoading: false,
    isDirty: false
}
