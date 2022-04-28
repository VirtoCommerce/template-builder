export interface EditorDomainState {
    templateLoading: boolean;
    schemaLoading: boolean;
}

export const initialState: EditorDomainState = {
    templateLoading: false,
    schemaLoading: false
}
