import { TemplateModel, SectionModel } from '@models/index';

export interface ControlContext {
    block: SectionModel;
    template: TemplateModel;
    page: SectionModel[];
    settings: SectionModel;
    index: number;
    item: any;
    parent?: ControlContext

    filter: string;
    mode: string;
    __searchQuery: string | null;
}
