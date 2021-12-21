import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-section-item',
    templateUrl: './section-item.component.html',
    styleUrls: ['./section-item.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({ height: 'auto' })),
            state('closed', style({ height: '0' })),
            transition('open => closed', [animate('1s')]),
            transition('closed => open', [animate('1s')])
        ])
    ]
})
export class SectionItemComponent implements OnInit {

    @Input() section: any;

    @Output() itemClick = new EventEmitter<number | null>();

    constructor() { }

    ngOnInit(): void {

    }

    onItemClick(itemId: number | null = null) {
        this.itemClick.emit(itemId);
    }
}
