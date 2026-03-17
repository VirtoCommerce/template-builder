import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActionButtonDescriptor } from '@core/models';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
    selector: 'app-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, IconButtonComponent]
})
export class ActionButtonsComponent implements OnInit {

    @Input() actions: ActionButtonDescriptor[] = [];

    @Output() onClick = new EventEmitter<ActionButtonDescriptor>();

    ngOnInit(): void {
    }

    raiseOnClick(action: ActionButtonDescriptor) {
        this.onClick.emit(action);
    }
}
