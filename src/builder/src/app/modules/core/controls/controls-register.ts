import { inject } from '@angular/core';

import { ControlsFactory } from './controls.factory';
import { CalendarComponent } from './calendar/calendar.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CollectionComponent } from './collection/collection.component';
import { ColorComponent } from './color/color.component';
import { FilesComponent } from './files/files.component';
import { ImagesComponent } from './images/images.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { NumberComponent } from './number/number.component';
import { ObjectComponent } from './object/object.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { StringComponent } from './string/string.component';
import { TextComponent } from './text/text.component';

export function registerControls(): () => void {
    const factory = inject(ControlsFactory);
    return () => {
        factory.register('calendar', CalendarComponent);
        factory.register('checkbox', CheckboxComponent);
        factory.register('color', ColorComponent);
        factory.register('files', FilesComponent);
        factory.register('images', ImagesComponent);
        factory.register('list', CollectionComponent);
        factory.register('markdown', MarkdownComponent);
        factory.register('number', NumberComponent);
        factory.register('object', ObjectComponent);
        factory.register('slider', NumberComponent);
        factory.register('select', SelectComponent);
        factory.register('string', StringComponent);
        factory.register('text', TextComponent);
        factory.register('search', SearchComponent);
    };
}
