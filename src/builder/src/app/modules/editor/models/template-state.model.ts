import { Dictionary } from '@models/index';

// template ui state
export interface TemplateState {
    id: string;
    isLoading: boolean;
    hasChanges?: boolean;
    published?: boolean;
    error?: string;
    sections: SectionStatesList;
}

export interface SectionState {
    expanded: boolean;
    canHaveChildren?: boolean;
}

export type TemplateStatesList = Dictionary<TemplateState>;
export type SectionStatesList = Dictionary<SectionState>;
