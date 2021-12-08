import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@shared/controls';
import { CalendarDescriptor } from '@shared/models';

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

    raiseValueChanged(value: any) {
        console.log(value);
    }
}
