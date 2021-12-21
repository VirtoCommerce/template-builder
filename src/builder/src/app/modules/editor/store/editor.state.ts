import { TemplateModel, TemplatesList } from '@editor/models';

export interface EditorState {
    templatesLoading: boolean; // list of available templates
    templatesLoaded: boolean;
    templateLoading: boolean; // specified template

    showSectionsSelector: boolean;
    showTemplateSelector: boolean;

    availableTemplates: TemplatesList;
    loadedTemplates: { [key: string]: TemplateModel }
}

export const initialState: EditorState = {
    templatesLoading: false,
    templatesLoaded: false,
    templateLoading: false,

    showSectionsSelector: false,
    showTemplateSelector: true,

    availableTemplates: {},
    loadedTemplates: {}
};
