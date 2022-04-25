import { SectionModel } from '@core/models';

/**
 * @description describe templates, like static page, catalog, product, cart, etc.
 */
export interface TemplateModel {
    settings: SectionModel;
    content: SectionModel[];
}
