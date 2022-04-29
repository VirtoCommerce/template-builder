import { Dictionary } from '@core/models';
import { SectionSchema } from '@core/models';
import { SectionsSchemasList } from '@editor/models';

/**
 * @description describe all schemas
 */
export type SchemasList = {
    blocks: SectionsSchemasList;
    sections: SectionsSchemasList;
};
