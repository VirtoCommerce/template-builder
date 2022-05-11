export * from './base-control.descriptor';
export * from './string.descriptor';
export * from './text.descriptor';
export * from './select.descriptor';
export * from './number.descriptor';
export * from './images.descriptor';
export * from './files.descriptor';
export * from './color.descriptor';
export * from './checkbox.descriptor';
export * from './calendar.descriptor';
export * from './display-text.descriptor';

// todo: list, object, search, popup (list|object), url? (maybe should be object)

import { StringDescriptor } from './string.descriptor';
import { TextDescriptor } from './text.descriptor';
import { SelectDescriptor } from './select.descriptor';
import { NumberDescriptor } from './number.descriptor';
import { ImagesDescriptor } from './images.descriptor';
import { FilesDescriptor } from './files.descriptor';
import { ColorDescriptor } from './color.descriptor';
import { CheckboxDescriptor } from './checkbox.descriptor';
import { CalendarDescriptor } from './calendar.descriptor';
import { DisplayTextDescriptor } from './display-text.descriptor';

export type ControlDescriptor = StringDescriptor
    | TextDescriptor
    | SelectDescriptor
    | NumberDescriptor
    | ImagesDescriptor
    | FilesDescriptor
    | ColorDescriptor
    | CheckboxDescriptor
    | CalendarDescriptor
    | DisplayTextDescriptor;

export type SectionPropertyDescriptor = ControlDescriptor;
