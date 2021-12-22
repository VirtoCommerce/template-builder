import { TemplateModel } from "./template.model";

export type TemplatesList = {
    [key: string]: {
        isDirty: boolean;
        key: string;
        model: TemplateModel;
    }
};
