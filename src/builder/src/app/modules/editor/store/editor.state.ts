import { TemplateModel, TemplatesList, TemplatesSchemasList } from '@editor/models';

export interface EditorState {
    templatesLoading: boolean; // list of available templates
    templatesLoaded: boolean;
    templateLoading: boolean; // specified template

    showSectionsSelector: boolean;
    showTemplateSelector: boolean;

    availableTemplates: TemplatesSchemasList;
    templates: TemplatesList;
    currentTemplate: string | null;

    sectionIndex: number | null;
    blockIndex: number | null;
}

export const initialState: EditorState = {
    templatesLoading: false,
    templatesLoaded: false,
    templateLoading: false,

    showSectionsSelector: false,
    showTemplateSelector: true,

    availableTemplates: {},
    templates: {},
    currentTemplate: null,

    sectionIndex: null,
    blockIndex: null
};
