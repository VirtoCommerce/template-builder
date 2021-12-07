import { Component } from '@angular/core';
import { BaseControlDirective } from '@shared/controls';
import { SelectDescriptor } from '@shared/models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseControlDirective<SelectDescriptor> {

}
