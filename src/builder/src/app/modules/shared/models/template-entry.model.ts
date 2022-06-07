import { SectionPropertyDescriptor } from "@core/models";

export interface TemplateEntry {
    name: string;
    path: string;
    sort?: number;
    alias: string;
    previewUrl: string;
    isDefault?: boolean | null;
    sections?: string[];
    settings?: SectionPropertyDescriptor[];
    children?: any;
}
