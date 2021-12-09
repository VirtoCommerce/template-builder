import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { ColorDescriptor } from '@shared/models';

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
