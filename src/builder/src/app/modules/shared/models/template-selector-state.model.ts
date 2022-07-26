import { TemplateEntryStateList } from './template-entry-state.model';

export interface TemplateSelectorState {
    filter: string | null;
    isLoading: boolean;
    isDirty: boolean;
    templates: TemplateEntryStateList;
}
