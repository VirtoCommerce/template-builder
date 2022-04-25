import { BaseControlDescriptor } from '@core/models';

export interface TabModel {
    groups: {
        [key: string]: BaseControlDescriptor[];
    };
    ungrouped: BaseControlDescriptor[];
}

export interface TabsModel {
    [key: string]: TabModel;
}
