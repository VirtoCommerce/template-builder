export type SectionPropertyType = string|number|boolean|SectionModel;

export interface SectionModel {
    __id: string;
    __index: number;
    type: string;

    blocks: SectionModel[];

    [key: string]: SectionPropertyType|SectionPropertyType[];
}
