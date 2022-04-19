import { SectionModel } from '@shared/models';

/**
 * @description describe templates, like static page, catalog, product, cart, etc.
 */
export interface TemplateModel {
    settings: SectionModel;
    content: SectionModel[];
}
