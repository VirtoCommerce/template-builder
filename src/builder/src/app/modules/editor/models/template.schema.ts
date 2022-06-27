import { SectionPropertyDescriptor } from '@models/controls';

export interface TemplateSchema {
    name: string;
    icon: string;
    sections: string[];
    settings: SectionPropertyDescriptor[];
}
