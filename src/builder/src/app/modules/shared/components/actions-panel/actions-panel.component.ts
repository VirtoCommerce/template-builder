import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import { ActionButtonDescriptor } from '@core/models';
import { ActionButtonsComponent } from '@core/components/action-buttons/action-buttons.component';

@Component({
    selector: 'app-actions-panel',
    templateUrl: './actions-panel.component.html',
    styleUrls: ['./actions-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ActionButtonsComponent]
})
export class ActionsPanelComponent implements OnInit {

    @Input() panels!: ActionButtonDescriptor[][];

    @Output() actionExecuted = new EventEmitter<string>();

    ngOnInit(): void {
    }

    onActionExecuted(item: ActionButtonDescriptor) {
        this.actionExecuted.emit(item.alias);
    }
}
