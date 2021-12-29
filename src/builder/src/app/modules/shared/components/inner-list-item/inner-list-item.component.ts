import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-inner-list-item',
    templateUrl: './inner-list-item.component.html',
    styleUrls: ['./inner-list-item.component.scss']
})
export class InnerListItemComponent implements OnInit {

    @Input() icon: string | null = null;
    @Input() title: string = '';
    @Input() showPlus: boolean = false;
    @Input() showVisibility: boolean = false;
    @Input() visible: boolean = true;
    @Input() showDrag: boolean = false;

    @Output() itemClick = new EventEmitter<any>();
    @Output() plusClick = new EventEmitter<any>();
    @Output() visibleChanged = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void { }

    onItemClick(event: MouseEvent) {
        this.itemClick.emit();
    }

    onPlusClick(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.plusClick.emit();
    }

    onVisibleChanged(value: boolean) {
        this.visibleChanged.emit(value);
    }
}
