import { SectionPropertyDescriptor } from "./descriptors";

export interface SectionSchema {
    icon: string;
    type: string;
    name: string;
    displayNameProperty?: string;
    group?: string;
    groupIcon?: string;
    blocks?: string[];
    settings: SectionPropertyDescriptor[];
}
