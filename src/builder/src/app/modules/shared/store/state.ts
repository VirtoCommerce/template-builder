import * as routerSelectors from '@shared/routing'
import { TemplateEntryList } from '@shared/models';

export interface SharedState {
    templatesEntriesLoading: boolean;
    templatesEntriesLoaded: boolean;
    templatesEntries: TemplateEntryList;
    appInitialized: boolean;
}

export const initialState: SharedState = {
    templatesEntriesLoading: false,
    templatesEntriesLoaded: false,
    templatesEntries: {},
    appInitialized: false
}

export interface BuilderState extends routerSelectors.BuilderState {
    shared: SharedState
}
