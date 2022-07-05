import { ControlDescriptor } from './index';
import { BaseControlDescriptor } from '.';

export interface CollectionDescriptor extends BaseControlDescriptor {
    addText?: string;
    displayField?: string;
    element: ControlDescriptor[];
}
