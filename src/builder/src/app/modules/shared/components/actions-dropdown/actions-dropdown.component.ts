import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButtonDescriptor } from '@shared/models';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html',
    styleUrls: ['./actions-dropdown.component.scss']
})
export class ActionsDropdownComponent implements OnInit {

    isOpened = false;

    @Input() defaultTitle?: string;
    @Input() displayChevron = true;
    @Input() displayCurrent = true;
    @Input() active?: ActionButtonDescriptor;
    @Input() actions: ActionButtonDescriptor[] = [];

    @Output() executeAction = new EventEmitter<ActionButtonDescriptor>()

    constructor() { }

    ngOnInit(): void { }

    actionChoosed(action: ActionButtonDescriptor) {
        if (this.displayCurrent) {
            this.active = action;
        }
        this.executeAction.emit(action);
    }
}
