import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { ImagesDescriptor } from '@shared/models';
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent extends BaseControlDirective<ImagesDescriptor> {

}
