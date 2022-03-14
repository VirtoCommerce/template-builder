import { TemplateModel } from "@editor/models";

export type TemplatesList = {
    [key: string]: {
        isDirty: boolean;
        key: string;
        model: TemplateModel;
    }
};
