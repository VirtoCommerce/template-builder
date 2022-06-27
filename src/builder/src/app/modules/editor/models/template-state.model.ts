import { Dictionary } from '@models/index';

export interface TemplateState {
    id: string;
    isDirty: boolean;
    isLoading: boolean;
    sections: SectionStatesList;
}

export interface SectionState {
    expanded: boolean;
    canHaveChildren?: boolean;
}

export type TemplateStatesList = Dictionary<TemplateState>;
export type SectionStatesList = Dictionary<SectionState>;
