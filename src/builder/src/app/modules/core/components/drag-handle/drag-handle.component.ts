import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-drag-handle',
    templateUrl: './drag-handle.component.html',
    styleUrls: ['./drag-handle.component.scss']
})
export class DragHandleComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    onClick(event: MouseEvent) {
        event.stopPropagation();
    }
}
