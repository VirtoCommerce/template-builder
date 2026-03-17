import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ActionButtonDescriptor } from '@core/models';
import { IconComponent } from '../icon/icon.component';
import { ChevronComponent } from '../chevron/chevron.component';

@Component({
    selector: 'app-actions-dropdown',
    templateUrl: './actions-dropdown.component.html',
    styleUrls: ['./actions-dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, MatButtonModule, MatMenuModule, IconComponent, ChevronComponent]
})
export class ActionsDropdownComponent implements OnInit {

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

    ngOnInit(): void { }

    actionChoosed(action: ActionButtonDescriptor) {
        this.executeAction.emit(action);
    }
}
