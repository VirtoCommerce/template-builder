import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-overlap-panel',
    templateUrl: './overlap-panel.component.html',
    styleUrls: ['./overlap-panel.component.scss']
})
export class OverlapPanelComponent implements OnInit {

    @Input() title: string | null = null;
    @Output() backClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    backButtonClick() {
        this.backClick.emit();
    }

}
