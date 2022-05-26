import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ContextMenuAction } from '@core/models';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {

    @Input() actions: ContextMenuAction[] | null = null;
    @Input() visible: boolean = false;
    @Input() getActions: (() => ContextMenuAction[]) | null = null;

    @Output() onAction = new EventEmitter<ContextMenuAction>();

    isOpen = false;

    constructor() { }

    ngOnInit(): void {
    }

    getActionsList() {
        if (!this.actions && this.getActions) {
            this.actions = this.getActions();
        }
        return this.actions || [];
    }

    showActions() {
        this.isOpen = true;
    }

    hideActions() {
        if (!!this.getActions) {
            this.actions = null;
        }
        this.isOpen = false;
    }

    gearClick(event: MouseEvent) {
        event.stopPropagation();
        this.showActions();
    }

    outsideClick(event: MouseEvent) {
        event.stopPropagation();
        this.hideActions();
    }

    raiseOnAction(action: ContextMenuAction) {
        this.onAction.emit(action);
        this.hideActions();
    }
}
