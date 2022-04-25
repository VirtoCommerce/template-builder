import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chevron',
    templateUrl: './chevron.component.html',
    styleUrls: ['./chevron.component.scss']
})
export class ChevronComponent implements OnInit {

    @Input() opened = false;
    @Input() vertical = false;

    constructor() { }

    ngOnInit(): void {
    }

}
