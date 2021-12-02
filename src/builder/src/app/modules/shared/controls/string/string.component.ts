import { BaseControlDirective } from './../base-control.directive';
import { Component } from '@angular/core';

import { StringDescriptor } from '@shared/models';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent extends BaseControlDirective<StringDescriptor> {

}
