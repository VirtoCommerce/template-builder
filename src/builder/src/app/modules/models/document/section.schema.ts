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

    includeShared?: string[]; // list of names to add settings from Shared
    excludeShared?: string[] | true; // true - not use shared settings, string[] - list of settings id to exclude from result shared list
}
