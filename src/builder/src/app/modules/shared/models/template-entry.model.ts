import { ServerRequestDescriptor } from '@models/index';
import { SectionPropertyDescriptor } from "@models/controls";
import { TemplateEntryList } from './template-entry-list.model';

export interface TemplateEntry {
    name: string;
    path?: string;
    type?: string;
    request?: ServerRequestDescriptor | ServerRequestDescriptor[] | string | string[];
    sort?: number;
    alias: string;
    prototype?: string;
    disabled?: boolean;
    previewUrl: string;
    isDefault?: boolean | null;
    sections?: string[];
    settings?: SectionPropertyDescriptor[];
    children?: TemplateEntryList;
    hasChildren: boolean;
    previewMessage?: any;
}

// export interface SearchPathEntry {
//     path: string;
//     type: string;
//     excludes?: string[];
// }
