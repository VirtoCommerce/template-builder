import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent implements OnInit {

    @Input() icon?: string;
    @Input() text?: string;
    @Input() skin?: string;
    @Input() disabled: boolean = false;

    @Output() onClick = new EventEmitter<MouseEvent>();

    constructor() { }

    ngOnInit(): void {
    }

    raiseOnClick(event: MouseEvent) {
        this.onClick.emit(event);
    }
}
