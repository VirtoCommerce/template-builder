import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-collapsible-list-item',
    templateUrl: './collapsible-list-item.component.html',
    styleUrls: ['./collapsible-list-item.component.scss']
})
export class CollapsibleListItemComponent implements OnInit {

    @Input() opened = false;
    @Input() expandable: boolean = false;

    @Output() openChanged = new EventEmitter<boolean>();
    @Output() visibleChanged = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void { }

    onChevronClick() {
        this.opened = !this.opened;
        this.openChanged.emit(this.opened);
    }

    onVisibleChanged(value: boolean) {
        this.visibleChanged.emit(value);
    }

}
