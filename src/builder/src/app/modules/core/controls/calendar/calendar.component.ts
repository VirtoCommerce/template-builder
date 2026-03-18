import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
    MatCalendar,
    MatDatepicker,
    MatDatepickerActions,
    MatDatepickerApply,
    MatDatepickerCancel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
} from 'ngv-datepicker';
import { MatInputModule } from '@angular/material/input';

import { BaseControlDirective } from '@core/controls/base-control.directive';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatCalendar,
        MatDatepicker,
        MatDatepickerActions,
        MatDatepickerApply,
        MatDatepickerCancel,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatNativeDateModule,
        MatInputModule,
    ]
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
