import { ResponseDescriptor } from ".";

export interface RequestDescriptor {
    url: string;
    method: string;
    body: any;
    form?: any;
    options?: any;
    response?: ResponseDescriptor;
    // cacheContextPath?: string;
    // value: string | (string | ValueDescriptorModel)[];
    // resultField: string;
    // searchField: string;
}
