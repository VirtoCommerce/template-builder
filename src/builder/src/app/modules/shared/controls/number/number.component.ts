import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { NumberDescriptor } from '@shared/models';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent extends BaseControlDirective<NumberDescriptor> {

}
