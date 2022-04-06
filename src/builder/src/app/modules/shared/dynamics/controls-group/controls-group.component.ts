import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-controls-group',
    templateUrl: './controls-group.component.html',
    styleUrls: ['./controls-group.component.scss']
})
export class ControlsGroupComponent implements OnInit {

    @Input() label: string | null = null;
    @Input() opened: boolean = false;

    @Output() openedChanged = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    onOpenedChanged() {
        this.openedChanged.emit(!this.opened);
    }
}
