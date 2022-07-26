import { Dictionary } from '@models/index';

export interface TemplateEntryState {
    id: string;
    isDirty: boolean;
    isLoading: boolean;
}

export type TemplateEntryStateList = Dictionary<TemplateEntryState>;
