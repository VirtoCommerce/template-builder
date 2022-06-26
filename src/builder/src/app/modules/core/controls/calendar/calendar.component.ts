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
export class CalendarComponent extends BaseControlDirective<CalendarDescriptor> { // implements OnDestroy {

    // private _subscription: Subscription | null = null;

    // // todo: find the way to avoid form using
    // form!: FormGroup;

    // override ngOnInit() {
    //     super.ngOnInit();
    //     this.form = new FormGroup({
    //         internalDate: new FormControl(this.controlValue)
    //     });
    //     this._subscription = this.form.valueChanges.subscribe((value: any) => {
    //         this.onValueChanged(value.internalDate);
    //     });
    // }

    // ngOnDestroy() {
    //     if (!!this._subscription) {
    //         this._subscription.unsubscribe();
    //         this._subscription = null;
    //     }
    // }

    raiseValueChanged(event: Date) {
        // console.log(event);
        this.onValueChanged(event);
    }
}
