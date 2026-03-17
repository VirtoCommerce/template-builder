import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { ActionButtonDescriptor } from '@core/models';
import { IconComponent } from '../icon/icon.component';
import { ChevronComponent } from '../chevron/chevron.component';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html',
    styleUrls: ['./actions-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButton, MatMenu, MatMenuTrigger, MatMenuItem, IconComponent, ChevronComponent]
})
export class ActionsDropdownComponent {

    isOpened = false;

    @Input() defaultTitle?: string;
    @Input() panelClass?: string;
    @Input() displayChevron = true;
    @Input() displayCurrent = true;
    @Input() active?: string;
    @Input() placeholder: ActionButtonDescriptor | null = null;
    @Input() actions: ActionButtonDescriptor[] = [];

    @Output() executeAction = new EventEmitter<ActionButtonDescriptor>()

    get activeItem(): ActionButtonDescriptor | null {
        return this.placeholder || this.actions.find(x => x.alias === this.active || (!x.alias && !this.active)) || null;
    }

    actionChoosed(action: ActionButtonDescriptor) {
        this.executeAction.emit(action);
    }
}
