import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ContextMenuAction, ContextMenuActionType } from '@core/models';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {

    @Input() actions: ContextMenuAction[] | null = null;
    @Input() visible: boolean = false;
    @Input() getActions: (() => Promise<ContextMenuAction[]>) | null = null;

    @Output() onAction = new EventEmitter<ContextMenuActionType>();

    isOpen = false;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    getActionsList(): ContextMenuAction[] {
        if (!this.actions && this.getActions) {
            this.getActions().then(actions => {
                this.actions = actions;
                this.cdr.detectChanges();
            }).catch(() => {
                this.cdr.detectChanges();
            });
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
        if (action !== '|' && !action.inactive) {
            this.onAction.emit(action);
            this.hideActions();
        }
    }
}
