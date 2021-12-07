import { Component, OnInit } from '@angular/core';

import { BaseControlDirective } from '@shared/controls';
import { CalendarDescriptor } from '@shared/models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseControlDirective<CalendarDescriptor> {
}
