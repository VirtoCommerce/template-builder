import { AlphaChannel, ColorMode, OutputFormat } from "ngx-color-picker/lib/helpers";
import { BaseControlDescriptor } from "./base-control.descriptor";

export interface ColorDescriptor extends BaseControlDescriptor {
    outputFormat: OutputFormat;
    clearValue?: string;
    colorMode?: ColorMode;
    inline?: boolean;
    presets?: string[];
    alpha?: AlphaChannel;
}
