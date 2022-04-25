import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { ColorDescriptor } from '@core/models';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent extends BaseControlDirective<ColorDescriptor> {
    clearColor() {
        this.onValueChanged(this.descriptor.clearValue || null);
    }

    changeColor(value: string) {
        this.onValueChanged(value);
    }
}
