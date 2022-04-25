import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-visibility-button',
    templateUrl: './visibility-button.component.html',
    styleUrls: ['./visibility-button.component.scss']
})
export class VisibilityButtonComponent implements OnInit {

    @Input() visible: boolean = true;
    @Output() visibleChanged = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    onVisibleChanged(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.visibleChanged.emit(!this.visible);
    }

}
