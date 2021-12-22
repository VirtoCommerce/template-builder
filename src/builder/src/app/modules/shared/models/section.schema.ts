import { SectionPropertyDescriptor } from "./descriptors";

export interface SectionSchema {
    icon: string;
    type: string;
    name: string;
    group?: string;
    groupIcon?: string;
    settings: SectionPropertyDescriptor[];
}
