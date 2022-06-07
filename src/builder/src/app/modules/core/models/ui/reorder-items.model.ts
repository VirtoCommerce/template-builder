import { SectionModel } from "../section.model";

export interface ReorderItemsModel {
    item: SectionModel;
    parent?: SectionModel;
    currentIndex: number;
    previousIndex: number;
}
