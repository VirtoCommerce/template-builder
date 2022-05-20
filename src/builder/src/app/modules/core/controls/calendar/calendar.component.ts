import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { CalendarDescriptor } from '@core/models';

/**
 * source: https://h2qutc.github.io/angular-material-components/datetimepicker
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
export class CalendarComponent extends BaseControlDirective<CalendarDescriptor> implements OnDestroy {

    private _subscription: Subscription | null = null;

    form!: FormGroup;

    override ngOnInit() {
        super.ngOnInit();
        this.form = new FormGroup({
            time: new FormControl(this.controlValue),
            date: new FormControl(this.controlValue)
        });
        this._subscription = this.form.valueChanges.subscribe(value => {

            console.log(this.form, this.descriptor);
            if (this.descriptor.mode === 'time') {
                this.onValueChanged(value.time);
            } else {
                this.onValueChanged(value.date);
            }
        });
    }

    ngOnDestroy() {
        if (!!this._subscription) {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
    }

    selectDate(event: Date) {
        this.form.setValue({ time: event, date: event })
    }
}
