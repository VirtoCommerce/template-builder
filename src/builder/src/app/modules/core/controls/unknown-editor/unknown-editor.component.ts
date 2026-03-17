import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@core/controls';
import { BaseControlDescriptor } from '@models/controls';

@Component({
  selector: 'app-unknown-editor',
  templateUrl: './unknown-editor.component.html',
  styleUrls: ['./unknown-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnknownEditorComponent extends BaseControlDirective<BaseControlDescriptor> {
}
