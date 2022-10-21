import { ControlDescriptor } from './index';
import { BaseControlDescriptor } from '.';

export interface CollectionDescriptor extends BaseControlDescriptor {
    addText?: string;
    displayField?: string;
    skipRemoveConfirmation?: boolean;
    removeMessage?: string;
    elementDescriptor?: string;
    element?: ControlDescriptor[];
}
