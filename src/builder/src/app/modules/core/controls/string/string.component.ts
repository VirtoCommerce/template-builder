import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';

import { BaseControlDirective } from '@core/controls/base-control.directive';
import { StringDescriptor } from '@models/controls';
import { IconButtonComponent } from '@core/components/icon-button/icon-button.component';

@Component({
    selector: 'app-string',
    templateUrl: './string.component.html',
    styleUrls: ['./string.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, KeyValuePipe, IconButtonComponent]
})
export class StringComponent extends BaseControlDirective<StringDescriptor> {
    @ViewChild('control') control!: ElementRef;
    @ViewChild('textarea') textarea!: ElementRef;

    override getFocusableControl(): ElementRef {
        return this.descriptor?.multiline
            ? this.textarea
            : this.control;
    }

    raiseOnChange(event: Event) {
        const element = <HTMLInputElement>event.target;
        this.onValueChanged(element.value);
    }
}
