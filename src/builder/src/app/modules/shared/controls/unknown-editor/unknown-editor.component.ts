import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { BaseControlDescriptor } from '@shared/models';
import { WindowRef } from '@shared/services';

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
