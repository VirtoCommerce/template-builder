import { ModalService } from './../../services/modal.service';
import { Component } from '@angular/core';
import { FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BaseControlDirective } from '@core/controls';
import { CollectionDescriptor } from '@models/controls';

import { ContextMenuAction, ContextMenuActionType, ControlContext } from '@core/models';
import { coreHelpers, formsHelpers } from '@core/helpers';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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

    toggle(item: any) {
        if (this.openedItem === item) {
            this.openedItem = null;
        } else {
            this.openedItem = item;
        }
    }

    constructor(private modals: ModalService) {
        super();
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
            this.unsubscribe();
            this.subscription = this.form.valueChanges.subscribe(x => {
                this.onValueChanged(x.list);
            });
        }
    }

    getTitle(item: any, index: number): string {
        return (!!this.descriptor.displayField && item[this.descriptor.displayField]) || `item ${index + 1}`;
    }

    addItem() {
        const item = formsHelpers.generateForm(
            coreHelpers.createDefaultObject(this.descriptor.element),
            this.descriptor.element
        );
        this.collectionFormArray.push(item);
        this.openedItem = item;
    }

    onActionClick(event: ContextMenuActionType, item: AbstractControl, index: number) {
        if (event.action === 'duplicate') {
            const newItem = formsHelpers.generateForm(item.value, this.descriptor.element);
            this.collectionFormArray.insert(index + 1, newItem);
            this.openedItem = newItem;
        } else if (event.action === 'delete') {
            if (!this.descriptor.skipRemoveConfirmation) {
                this.modals.confirm(this.descriptor.removeMessage || 'Do you want to delete this item?').subscribe((data: any) => {
                    if (data) {
                        this.collectionFormArray.removeAt(index);
                    }
                });
            } else {
                this.collectionFormArray.removeAt(index);
            }
        }
    }

    reorderItems(event: CdkDragDrop<any>) {
        const item = this.collectionFormArray.at(event.previousIndex);
        this.collectionFormArray.removeAt(event.previousIndex);
        this.collectionFormArray.insert(event.currentIndex, item);
    }

    private unsubscribe() {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}
