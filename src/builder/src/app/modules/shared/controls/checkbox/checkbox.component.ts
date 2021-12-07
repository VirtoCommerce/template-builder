import { Component } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { CheckboxDescriptor } from '@shared/models';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseControlDirective<CheckboxDescriptor> {

}
