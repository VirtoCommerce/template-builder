import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { EnvironmentRef } from '@integration/services';
import { BaseControlDirective } from '@core/controls';
import { NumberDescriptor } from '@models/controls';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberComponent extends BaseControlDirective<NumberDescriptor> {
    @ViewChild('control') control!: ElementRef<HTMLInputElement>;

    constructor(private windowRef: EnvironmentRef) {
        super();
    }

    onPaste(event: ClipboardEvent) {
        const value = (event.clipboardData || this.windowRef.nativeWindow.clipboardData).getData('text');
        if (!isNaN(value)) {
            this.onValueChanged(Number(value));
        }
    }

    raiseOnChange(target: EventTarget | null) {
        const element = <HTMLInputElement>target;
        if (element) {
            this.onValueChanged(element.valueAsNumber);
        }
    }

    raiseOnTouched(target: EventTarget | null) {
        const element = <HTMLInputElement>target;
        if (!!element) {
            this.onControlTouched(element.valueAsNumber);
        }
    }

    sliderChanged(value: number) {
        this.onValueChanged(value);
    }

    override getFocusableControl(): ElementRef {
        return this.control;
    }
}
