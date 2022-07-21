import { SectionPropertyDescriptor } from "../controls";
import { SectionModel } from "./section.model";

export interface SectionSchema {
    icon: string;
    type: string;
    name: string;
    static?: boolean | string;
    displayField?: string;
    group?: string;
    groupIcon?: string;
    blocks?: string[];
    inline?: boolean; // used for settings groups, when false, group displayed as a overlap panel
    settings: SectionPropertyDescriptor[];
    default?: SectionModel;
}
