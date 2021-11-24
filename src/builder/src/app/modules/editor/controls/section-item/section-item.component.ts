import { Component, Input, OnInit } from '@angular/core';

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

    constructor() { }

    ngOnInit(): void {

    }

}
