export * from './controls.factory';
export * from './base-control.directive';

export * from './text/text.component';
export * from './string/string.component';
export * from './select/select.component';
export * from './number/number.component';
export * from './images/images.component';
export * from './files/files.component';
export * from './color/color.component';
export * from './checkbox/checkbox.component';
export * from './calendar/calendar.component';

import { TextComponent } from './text/text.component';
import { StringComponent } from './string/string.component';
import { SelectComponent } from './select/select.component';
import { NumberComponent } from './number/number.component';
import { ImagesComponent } from './images/images.component';
import { FilesComponent } from './files/files.component';
import { ColorComponent } from './color/color.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CalendarComponent } from './calendar/calendar.component';

export const CONTROLS = [
    CalendarComponent,
    CheckboxComponent,
    ColorComponent,
    FilesComponent,
    ImagesComponent,
    NumberComponent,
    SelectComponent,
    StringComponent,
    TextComponent
];
