import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {

    @Input() icon: string | null = null;
    @Input() text: string | null = null;

    @Output() onClick = new EventEmitter<MouseEvent>();

    constructor() { }

    ngOnInit(): void {
    }

    raiseOnClick(event: MouseEvent) {
        this.onClick.emit(event);
    }
}
