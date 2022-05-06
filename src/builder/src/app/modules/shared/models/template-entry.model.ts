import { SectionPropertyDescriptor } from "@core/models";

export interface TemplateEntry {
    name: string;
    alias: string;
    previewUrl: string;
    isDefault?: boolean | null;
    sections?: string[];
    settings?: SectionPropertyDescriptor[];
    children?: any;
}
