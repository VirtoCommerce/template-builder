import { SectionPropertyDescriptor } from "./descriptors";
import { SectionModel } from "./section.model";

export interface SectionSchema {
    icon: string;
    type: string;
    name: string;
    displayNameProperty?: string;
    group?: string;
    groupIcon?: string;
    blocks?: string[];
    settings: SectionPropertyDescriptor[];
    default?: SectionModel;
}
