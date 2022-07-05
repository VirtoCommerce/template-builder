import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { CollectionDescriptor } from '@models/controls';

import { ControlContext } from '@core/models';
import { coreHelpers, formsHelpers } from '@core/helpers';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent extends BaseControlDirective<CollectionDescriptor> {

    // private subscription: Subscription | null = null;

    // objectForm!: FormGroup;
    // expanded = false;

    // constructor() {
    //     super();
    // }

    // getTitle(): string {
    //     return (!!this.descriptor.displayField && this.controlValue[this.descriptor.displayField]) || this.descriptor.label || this.descriptor.title || '[no title]';
    // }

    // toggle() {
    //     this.expanded = !this.expanded;
    // }

    // getContext(): ControlContext {
    //     return { ...this.context, item: this.controlValue, parent: this.context /*, filter: null */ };
    // }

    // override setControlValue(value: any) {
    //     if (this.controlValue !== value || !this.objectForm) {
    //         const v = value || coreHelpers.createDefaultObject(this.descriptor.element);
    //         super.setControlValue(v);
    //         this.objectForm = formsHelpers.generateForm(v, this.descriptor.element);
    //         this.unsubscribe();
    //         this.subscription = this.objectForm.valueChanges.subscribe(x => {
    //             this.onValueChanged(x);
    //         });
    //     }
    // }

    // override registerOnValueChanged(fn: any): void {
    //     this.onValueChanged = value => {
    //         this.controlValue = value;
    //         fn(value);
    //     };
    // }

    // private unsubscribe() {
    //     if (!!this.subscription) {
    //         this.subscription.unsubscribe();
    //         this.subscription = null;
    //     }
    // }
}
