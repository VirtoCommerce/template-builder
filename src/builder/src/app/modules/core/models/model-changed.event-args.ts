import { SectionModel } from "./section.model";

export interface ModelChangedEventArgs {
    model: SectionModel;
    changes: Partial<SectionModel>;
}
