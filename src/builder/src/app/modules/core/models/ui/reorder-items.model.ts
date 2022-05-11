import { SectionModel } from "../section.model";

export interface ReoderItemsModel {
    item: SectionModel;
    parent?: SectionModel;
    currentIndex: number;
    previousIndex: number;
}
