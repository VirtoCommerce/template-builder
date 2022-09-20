import { Dictionary } from '@models/index';

// template ui state
export interface TemplateState {
    id: string;
    sections: SectionStatesList;
}

export interface SectionState {
    expanded: boolean;
    canHaveChildren?: boolean;
}

export type TemplateStatesList = Dictionary<TemplateState>;
export type SectionStatesList = Dictionary<SectionState>;
