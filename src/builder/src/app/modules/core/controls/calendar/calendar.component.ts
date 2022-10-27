import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { CalendarDescriptor } from '@models/controls';

/**
 * source: https://h2qutc.github.io/angular-material-components
 *
 * this component set current time in time mode when control value is null
 * todo: fix this behaviour
 * in this case event should not be fired
 */

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent extends BaseControlDirective<CalendarDescriptor> {

    raiseValueChanged(event: Date) {
        this.onValueChanged(event);
    }
}
