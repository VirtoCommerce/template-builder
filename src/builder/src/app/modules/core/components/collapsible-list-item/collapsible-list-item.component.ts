import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-collapsible-list-item',
    templateUrl: './collapsible-list-item.component.html',
    styleUrls: ['./collapsible-list-item.component.scss']
})
export class CollapsibleListItemComponent implements OnInit {

    @Input() opened = false;
    @Input() expandable: boolean = false;


    // @Input() icon: string | null = null;
    // @Input() title: string = '';
    // @Input() closable: boolean = false;
    // @Input() showPlus: boolean = false;
    // @Input() showVisibility: boolean = false;
    // @Input() showDrag: boolean = false;
    // @Input() visible: boolean = true;
    // // @Input() defaultCollapsed: boolean = true;
    // @Input() collapseByArea: boolean = false;
    // @Input() opened: boolean = false;

    // @Output() itemClick = new EventEmitter<any>();
    // @Output() plusClick = new EventEmitter<any>();
    // @Output() openChanged = new EventEmitter<boolean>();
    @Output() visibleChanged = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
        // this.opened = !this.defaultCollapsed;
    }

    // toggle(event: MouseEvent) {
    //     event.stopPropagation();
    //     this.opened = !this.opened;
    //     this.openChanged.emit(this.opened);
    // }

    sectionClick(event: MouseEvent) {
        // if (this.collapseByArea) {
        //     this.toggle(event);
        // } else {
        //     this.itemClick.emit();
        // }
    }

    // onPlusClick(event: MouseEvent) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     this.plusClick.emit();
    // }

    onVisibleChanged(value: boolean) {
        this.visibleChanged.emit(value);
    }

}
