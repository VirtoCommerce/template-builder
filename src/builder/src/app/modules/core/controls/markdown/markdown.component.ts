import { Component, ElementRef, ViewChild } from '@angular/core';

import { MarkdownModel } from 'dist/ngv-markdown/lib/markdown.model';
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

    override setControlValue(value: any): void {
        const result = { markdown: null, html: null };
        if (this.descriptor.resultType === 'markdown') {
            result.markdown = typeof value === 'string' ? value : value.markdown;
        } else if (this.descriptor.resultType === 'html') {
            result.html = typeof value === 'string' ? value : value.html;
        } else {
            result.markdown = typeof value === 'string' ? value : value.markdown;
            result.html = typeof value === 'string' ? value : value.html;
        }
        this.controlValue = result;
    }

    valueChanged(event: MarkdownModel) {
        let value: MarkdownModel | string | null;
        if (this.descriptor.resultType === 'markdown') {
            value = event.markdown;
        } else if (this.descriptor.resultType === 'html') {
            value = event.html;
        } else {
            value = event;
        }
        this.onValueChanged(value);
    }
}
