import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActionButtonDescriptor } from '@core/models';

@Component({
    selector: 'app-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsComponent implements OnInit {

    @Input() actions: ActionButtonDescriptor[] = [];

    @Output() onClick = new EventEmitter<ActionButtonDescriptor>();

    constructor() { }

    ngOnInit(): void {
    }

    raiseOnClick(action: ActionButtonDescriptor) {
        this.onClick.emit(action);
    }
}
