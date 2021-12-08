import { BaseControlDescriptor } from "./base-control.descriptor";

export interface SelectDescriptor extends BaseControlDescriptor {
    multiple?: boolean;
    options?: { label?: string, value?: any, group?: string }[];
}
