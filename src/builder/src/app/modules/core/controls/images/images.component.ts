import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { ImagesDescriptor } from '@models/controls';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent extends BaseControlDirective<ImagesDescriptor> {

}
