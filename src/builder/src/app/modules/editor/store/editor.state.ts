import { SectionsSchemasList, TemplateModel, TemplatesList, TemplatesSchemasList } from '@editor/models';

export interface EditorState {
    templatesLoading: boolean; // list of available templates
    templatesLoaded: boolean;
    templateLoading: boolean; // specified template

    showSectionsSelector: boolean;
    showTemplateSelector: boolean;
    showTemplateSettings: boolean;
    indexAddSectionPanel: boolean | number;

    availableTemplates: TemplatesSchemasList;
    templates: TemplatesList;
    currentTemplate: string | null;

    sections: SectionsSchemasList;
    blocks: SectionsSchemasList;
    // objects;

    sectionIndex: number | null;
    blockIndex: number | null;
}

export const initialState: EditorState = {
    templatesLoading: false,
    templatesLoaded: false,
    templateLoading: false,

    showSectionsSelector: false,
    showTemplateSelector: true,
    showTemplateSettings: false,
    indexAddSectionPanel: false,

    availableTemplates: {},
    templates: {},
    currentTemplate: null,

    sections: {},
    blocks: {},

    sectionIndex: null,
    blockIndex: null
};
