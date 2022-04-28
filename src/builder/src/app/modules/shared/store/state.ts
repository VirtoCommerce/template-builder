import * as routerSelectors from '@shared/routing'
import { TemplateEntryList } from '@shared/models';

export interface SharedState {
    templatesEntriesLoading: boolean;
    templatesEntriesLoaded: boolean;
    templatesEntries: TemplateEntryList;
    currentTemplateKey: string | null;
}

export const initialState: SharedState = {
    templatesEntriesLoading: false,
    templatesEntriesLoaded: false,
    templatesEntries: {},
    currentTemplateKey: null // todo: initialize from config?
}

export interface BuilderState extends routerSelectors.BuilderState {
    shared: SharedState
}
