import {
    TemplateModelsList,
    SchemasList
} from '@editor/models';

export interface EditorDataState {
    templates: TemplateModelsList;
    schemas: SchemasList | null;
}

export const initialState: EditorDataState = {
    templates: {},
    schemas: null
}
