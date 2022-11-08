import { BaseControlDescriptor } from "./base-control.descriptor";

export interface MarkdownDescriptor extends BaseControlDescriptor {
    resultType: 'markdown' | 'html' | 'mixed';
}
