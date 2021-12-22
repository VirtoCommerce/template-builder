import { SectionPropertyDescriptor } from '@shared/models';

export interface TemplateSchema {
    name: string;
    icon: string;
    sections: string[];
    settings: SectionPropertyDescriptor[];
}
