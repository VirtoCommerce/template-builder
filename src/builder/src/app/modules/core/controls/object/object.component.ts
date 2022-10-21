import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { ControlDescriptor, ObjectDescriptor } from '@models/controls';

import { ControlContext } from '@core/models';
import { coreHelpers, formsHelpers } from '@core/helpers';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent extends BaseControlDirective<ObjectDescriptor> {

    private subscription: Subscription | null = null;

    objectForm!: FormGroup;
    expanded = false;

    constructor() {
        super();
    }

    getTitle(): string {
        return (!!this.descriptor.displayField && this.controlValue[this.descriptor.displayField]) || this.descriptor.label || this.descriptor.title || '[no title]';
    }

    getDescriptors(): ControlDescriptor[] {
        return formsHelpers.mergeDescriptors(this.context.objects, this.descriptor);
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    getContext(): ControlContext {
        return { ...this.context, item: this.controlValue, parent: this.context /*, filter: null */ };
    }

    override setControlValue(value: any) {
        if (this.controlValue !== value || !this.objectForm) {
            const descriptors = this.getDescriptors();
            const v = value || coreHelpers.createDefaultObject(descriptors);
            super.setControlValue(v);
            this.objectForm = formsHelpers.generateForm(v, descriptors);
            this.unsubscribe();
            this.subscription = this.objectForm.valueChanges.subscribe(x => {
                this.onValueChanged(x);
            });
        }
    }

    override registerOnValueChanged(fn: any): void {
        this.onValueChanged = value => {
            this.controlValue = value;
            fn(value);
        };
    }

    private unsubscribe() {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}
