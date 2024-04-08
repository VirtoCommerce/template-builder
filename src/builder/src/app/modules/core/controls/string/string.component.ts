import { Component, ElementRef, ViewChild } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { StringDescriptor } from '@models/controls';

@Component({
    selector: 'app-string',
    templateUrl: './string.component.html',
    styleUrls: ['./string.component.scss']
})
export class StringComponent extends BaseControlDirective<StringDescriptor> {
    @ViewChild('control') control!: ElementRef;
    @ViewChild('textarea') textarea!: ElementRef;

    override getFocusableControl(): ElementRef {
        return this.descriptor.multiline
            ? this.textarea
            : this.control;
    }

    raiseOnChange(event: Event) {
        const element = <HTMLInputElement>event.target;
        this.onValueChanged(element.value);
    }
}
