import { Component } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { CheckboxDescriptor } from '@core/models';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseControlDirective<CheckboxDescriptor> {
    raiseValueChanged(value: boolean) {
        this.onValueChanged(value);
    }
}
