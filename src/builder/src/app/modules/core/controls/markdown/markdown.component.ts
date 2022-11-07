import { Component, ElementRef, ViewChild } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { MarkdownDescriptor } from '@models/controls';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss']
})
export class MarkdownComponent extends BaseControlDirective<MarkdownDescriptor> {

    // override getFocusableControl(): ElementRef {
    //     return this.descriptor.multiline
    //         ? this.textarea
    //         : this.control;
    // }

    // raiseOnChange(event: Event) {
    //     const element = <HTMLInputElement>event.target;
    //     this.onValueChanged(element.value);
    // }
}
