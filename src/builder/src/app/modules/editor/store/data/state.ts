import { TemplatesList } from '@editor/models';

export interface EditorDataState {
    templates: TemplatesList
}

export const initialState: EditorDataState = {
    templates: {}
}
