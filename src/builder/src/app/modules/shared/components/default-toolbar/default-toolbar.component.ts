import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButtonDescriptor } from '@core/models';

@Component({
    selector: 'app-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss']
})
export class DefaultToolbarComponent implements OnInit {

    @Input() panels: ActionButtonDescriptor[][] | null = null;
    @Output() actionExecuted = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void {
    }

    onActionExecuted(item: string) {
        this.actionExecuted.emit(item);
    }
}
