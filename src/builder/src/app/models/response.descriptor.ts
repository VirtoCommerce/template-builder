import { ValueDescriptorModel } from ".";

export interface ResponseDescriptor {
    result: string; // path to result field
    isArray: boolean; // result should be array
    value: string | (string | ValueDescriptorModel)[];
}
