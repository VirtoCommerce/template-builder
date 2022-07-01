export * from './base-control.descriptor';
export * from './calendar.descriptor';
export * from './checkbox.descriptor';
export * from './color.descriptor';
export * from './display-text.descriptor';
export * from './files.descriptor';
export * from './images.descriptor';
export * from './number.descriptor';
export * from './object.descriptor';
export * from './select.descriptor';
export * from './select-option.model';
export * from './string.descriptor';
export * from './text.descriptor';

// todo: list, object, search, popup (list|object), url? (maybe should be object)

import { CalendarDescriptor } from './calendar.descriptor';
import { CheckboxDescriptor } from './checkbox.descriptor';
import { ColorDescriptor } from './color.descriptor';
import { DisplayTextDescriptor } from './display-text.descriptor';
import { FilesDescriptor } from './files.descriptor';
import { ImagesDescriptor } from './images.descriptor';
import { NumberDescriptor } from './number.descriptor';
import { ObjectDescriptor } from './object.descriptor';
import { SelectDescriptor } from './select.descriptor';
import { StringDescriptor } from './string.descriptor';
import { TextDescriptor } from './text.descriptor';

export type ControlDescriptor = CalendarDescriptor
    | CheckboxDescriptor
    | ColorDescriptor
    | DisplayTextDescriptor
    | FilesDescriptor
    | ImagesDescriptor
    | NumberDescriptor
    | ObjectDescriptor
    | SelectDescriptor
    | StringDescriptor
    | TextDescriptor;

export type SectionPropertyDescriptor = ControlDescriptor;
