import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ContextMenuAction } from '@shared/models';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

    @Input() actions!: ContextMenuAction[];
    @Input() isHover: boolean = false;

    @Output() onAction = new EventEmitter<ContextMenuAction>();

    isOpen = false;

    constructor() { }

    ngOnInit(): void {
    }

    showActions() {
        this.isOpen = true;
    }

    hideActions() {
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
