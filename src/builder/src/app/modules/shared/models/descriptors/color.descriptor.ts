import { OutputFormat } from "ngx-color-picker/lib/helpers";
import { BaseControlDescriptor } from "./base-control.descriptor";

export interface ColorDescriptor extends BaseControlDescriptor {
    outputFormat: OutputFormat;
    clearValue?: string;
}
