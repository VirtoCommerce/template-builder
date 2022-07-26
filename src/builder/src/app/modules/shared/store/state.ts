import * as routerSelectors from '@shared/routing'
import { TemplateSelectorState, TemplateEntryList } from '@shared/models';

export interface SharedState {
    appInitialized: boolean;
    isLoading: boolean;
    templatesEntriesLoading: boolean;
    templatesEntriesLoaded: boolean;
    templatesEntries: TemplateEntryList;
    templatesFilter: string | null;
    templateSelected: string | null;
    childrenTemplatesState: { [alias: string] : TemplateSelectorState };
    // childrenTemplates:
}

export const initialState: SharedState = {
    appInitialized: false,
    isLoading: false,
    templatesEntriesLoading: false,
    templatesEntriesLoaded: false,
    templatesEntries: {},
    templatesFilter: null,
    templateSelected: null,
    childrenTemplatesState: {}
}

export interface BuilderState extends routerSelectors.BuilderState {
    shared: SharedState
}
