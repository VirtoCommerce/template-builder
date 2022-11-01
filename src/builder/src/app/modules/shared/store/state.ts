import * as routerSelectors from '@shared/routing'
import { TemplateSelectorState, TemplateEntryStateList, TemplateEntryList } from '@shared/models';

export interface SharedState {
    appInitialized: boolean;
    templatesEntriesLoading: boolean;
    templatesEntriesLoaded: boolean;
    templatesEntries: TemplateEntryList;
    templatesFilter: string | null;
    templateSelected: string | null;
    entriesStates: TemplateEntryStateList
    childrenTemplatesState: { [alias: string] : TemplateSelectorState };
    // childrenTemplates:
}

export const initialState: SharedState = {
    appInitialized: false,
    templatesEntriesLoading: false,
    templatesEntriesLoaded: false,
    templatesEntries: {},
    entriesStates: {},
    templatesFilter: null,
    templateSelected: null,
    childrenTemplatesState: {}
}

export interface BuilderState extends routerSelectors.BuilderState {
    shared: SharedState
}
