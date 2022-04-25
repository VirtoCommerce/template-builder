import { Component, ElementRef, ViewChild } from '@angular/core';

import { WindowRef } from '@core/services';
import { BaseControlDirective } from '@core/controls';
import { StringDescriptor } from '@core/models';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent extends BaseControlDirective<StringDescriptor> {
    @ViewChild('control') control: ElementRef | null = null;
    @ViewChild('textarea') textarea: ElementRef | null = null;

    constructor(private windowRef: WindowRef) {
        super();
    }

    onPaste(event: ClipboardEvent) {
        const value = (event.clipboardData || this.windowRef.nativeWindow.clipboardData).getData('text');
        this.onValueChanged(value);
    }

    override getFocusableControl(): ElementRef {
        return this.descriptor.multiline
            ? this.textarea!
            : this.control!;
    }

    raiseOnChange(event: Event) {
        const element = <HTMLInputElement>event.target;
        this.onValueChanged(element.value);
    }
}
