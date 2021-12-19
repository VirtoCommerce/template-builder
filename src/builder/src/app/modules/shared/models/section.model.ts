export type SectionPropertyType = string|number|boolean|SectionModel;

export interface SectionModel {
    __id: string;
    __index: number;
    name: string;
    type: string;

    [key: string]: SectionPropertyType|SectionPropertyType[];
}
