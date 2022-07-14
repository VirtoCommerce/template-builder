import { TemplateModel, SectionModel } from '@models/index';
import { AssetFile } from './integration';

export interface ControlContext {
    block: SectionModel;
    template: TemplateModel;
    page: SectionModel[];
    settings: SectionModel;
    index: number;
    item: any;
    element?: any; // element in the collection
    parent?: ControlContext
    file?: AssetFile;

    // filter: string | null; note! was used to filter by tabs in old version. should not be used in new version
    mode: string;
    __searchQuery: string | null;
}
