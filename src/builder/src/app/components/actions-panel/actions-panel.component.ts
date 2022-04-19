import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActionButtonDescriptor } from '@shared/models';

@Component({
    selector: 'app-actions-panel',
    templateUrl: './actions-panel.component.html',
    styleUrls: ['./actions-panel.component.scss']
})
export class ActionsPanelComponent implements OnInit {

    @Input() panels!: ActionButtonDescriptor[][];

    @Output() actionExecuted = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    onActionExecuted(item: ActionButtonDescriptor) {
        this.actionExecuted.emit(item.alias);
    }
}
