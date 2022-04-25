import { SectionPropertyDescriptor } from '@core/models';

export interface TemplateSchema {
    name: string;
    icon: string;
    sections: string[];
    settings: SectionPropertyDescriptor[];
}
