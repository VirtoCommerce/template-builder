export interface ThemeDomainState {
    settingsLoading: boolean;
    schemaLoading: boolean;
}

export const initialState: ThemeDomainState = {
    settingsLoading: false,
    schemaLoading: false
}
