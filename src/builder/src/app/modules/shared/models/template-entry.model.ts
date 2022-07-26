import { ServerRequestDescriptor } from '@models/index';
import { SectionPropertyDescriptor } from "@models/controls";

export interface TemplateEntry {
    name: string;
    path?: string;
    type?: string;
    request?: ServerRequestDescriptor | ServerRequestDescriptor[] | string | string[];
    sort?: number;
    alias: string;
    previewUrl: string;
    isDefault?: boolean | null;
    sections?: string[];
    settings?: SectionPropertyDescriptor[];
    children?: any;
    hasChildren: boolean;
}

// export interface SearchPathEntry {
//     path: string;
//     type: string;
//     excludes?: string[];
// }
