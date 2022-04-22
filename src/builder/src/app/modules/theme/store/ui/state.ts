export interface ThemeUIState {
    mode: 'list' | 'tile';
    presetsFilter: string | null;
};

export const initialState: ThemeUIState = {
    mode: 'list',
    presetsFilter: null
};
