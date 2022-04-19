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
    inline?: boolean; // used for settings groups, when false, group displayed as a popup
    settings: SectionPropertyDescriptor[];
    default?: SectionModel;
}
