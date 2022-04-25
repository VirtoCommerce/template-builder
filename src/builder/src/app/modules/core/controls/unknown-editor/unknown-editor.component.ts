import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { BaseControlDescriptor } from '@core/models';
import { WindowRef } from '@core/services';

@Component({
  selector: 'app-unknown-editor',
  templateUrl: './unknown-editor.component.html',
  styleUrls: ['./unknown-editor.component.scss']
})
export class UnknownEditorComponent extends BaseControlDirective<BaseControlDescriptor> {

    constructor(private windowRef: WindowRef) {
        super();
    }
}
