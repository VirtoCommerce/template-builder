import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-collapsible-list-item',
    templateUrl: './collapsible-list-item.component.html',
    styleUrls: ['./collapsible-list-item.component.scss']
})
export class CollapsibleListItemComponent implements OnInit {

    @Input() icon: string | null = null;
    @Input() title: string = '';
    @Input() closable: boolean = false;
    @Input() showPlus: boolean = false;
    @Input() defaultCollapsed: boolean = true;
    @Input() collapseByArea: boolean = false;

    @Output() itemClick = new EventEmitter<any>();
    @Output() plusClick = new EventEmitter<any>();

    opened: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.opened = !this.defaultCollapsed;
    }

    toggle(event: MouseEvent) {
        event.stopPropagation();
        this.opened = !this.opened;
    }

    sectionClick(event: MouseEvent) {
        if (this.collapseByArea) {
            this.toggle(event);
        } else {
            this.itemClick.emit();
        }
    }

    onPlusClick() {
        this.plusClick.emit();
    }

}
