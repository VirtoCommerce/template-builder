import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { CollectionDescriptor } from '@models/controls';

import { ContextMenuAction, ControlContext } from '@core/models';
import { coreHelpers, formsHelpers } from '@core/helpers';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent extends BaseControlDirective<CollectionDescriptor> {

    private subscription: Subscription | null = null;

    hoverItem: any | null = null;
    openedItem: any | null = null;

    itemActions = [{
        action: 'duplicate',
        title: 'Duplicate',
        icon: 'file_copy',
        selected: false,
        inactive: false
    }, {
        action: 'delete',
        title: 'Delete',
        icon: 'delete_outline'
    }];

    form!: FormGroup;
    collectionFormArray!: FormArray;
    // expanded = false;

    // constructor() {
    //     super();
    // }

    // getTitle(): string {
    //     return (!!this.descriptor.displayField && this.controlValue[this.descriptor.displayField]) || this.descriptor.label || this.descriptor.title || '[no title]';
    // }

    toggle(item: any) {
        if (this.openedItem === item) {
            this.openedItem = null;
        } else {
            this.openedItem = item;
        }
    }

    getContext(item: FormGroup, index: number): ControlContext {
        return { ...this.context, item: this.controlValue, index, element: item.value, parent: this.context /*, filter: null */ };
    }

    override setControlValue(value: any): void {
        if (value !== this.controlValue || !this.form) {
            if (!value) {
                value = [];
            }
            if (!Array.isArray(value)) {
                value = [value];
            }
            super.setControlValue(value);
            this.collectionFormArray = formsHelpers.generateFormArray(value, this.descriptor.element);
            this.form = new FormGroup({ list: this.collectionFormArray });
        }
    }

    getTitle(item: any, index: number): string {
        return (!!this.descriptor.displayField && item[this.descriptor.displayField]) || `item ${index + 1}`;
    }

    addItem() {
        this.collectionFormArray.push(formsHelpers.generateForm(coreHelpers.createDefaultObject(this.descriptor.element), this.descriptor.element));
    }

    onActionClick(event: any) {
        console.log(event);
    }



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
