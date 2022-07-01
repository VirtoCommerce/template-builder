export * from './controls.factory';
export * from './base-control.directive';

export * from './calendar/calendar.component';
export * from './checkbox/checkbox.component';
export * from './color/color.component';
export * from './files/files.component';
export * from './images/images.component';
export * from './number/number.component';
export * from './object/object.component';
export * from './select/select.component';
export * from './string/string.component';
export * from './text/text.component';
export * from './unknown-editor/unknown-editor.component';

import { CalendarComponent } from './calendar/calendar.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ColorComponent } from './color/color.component';
import { FilesComponent } from './files/files.component';
import { ImagesComponent } from './images/images.component';
import { NumberComponent } from './number/number.component';
import { ObjectComponent } from './object/object.component';
import { SelectComponent } from './select/select.component';
import { StringComponent } from './string/string.component';
import { TextComponent } from './text/text.component';
import { UnknownEditorComponent } from './unknown-editor/unknown-editor.component';

export const CONTROLS = [
    CalendarComponent,
    CheckboxComponent,
    ColorComponent,
    FilesComponent,
    ImagesComponent,
    NumberComponent,
    ObjectComponent,
    SelectComponent,
    StringComponent,
    TextComponent,
    UnknownEditorComponent
];
