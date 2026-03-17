import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { CalendarDescriptor } from '@models/controls';
import moment from 'moment';
import * as chrono from 'chrono-node';

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
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent extends BaseControlDirective<CalendarDescriptor> {

    private parseDate(value: Date | string | undefined | null): Date | null {
        if (value && typeof value === 'string') {
            return chrono.parseDate(value) ?? null;
        }
        return (value as Date) ?? null;
    }

    protected override descriptorChanged(): void {
        if (this.descriptor) {
            this.descriptor.minDate = this.parseDate(this.descriptor?.minDate);
            this.descriptor.maxDate = this.parseDate(this.descriptor?.maxDate);
        }
    }

    raiseValueChanged(event: Date) {
        this.onValueChanged(event);
    }
}
