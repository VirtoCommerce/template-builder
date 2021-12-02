import { BaseControlDirective } from '@shared/controls';
import { Component } from '@angular/core';
import { TextDescriptor } from '@shared/models';

@Component({
    selector: 'app-text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.scss']
})
export class TextComponent extends BaseControlDirective<TextDescriptor> {

}
