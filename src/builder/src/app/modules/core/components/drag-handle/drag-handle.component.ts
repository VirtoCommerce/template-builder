import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-drag-handle',
    templateUrl: './drag-handle.component.html',
    styleUrls: ['./drag-handle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragHandleComponent implements OnInit {

    @HostBinding('class.visible')
    @Input() visible = false;
    @Input() info: string = '';

    constructor() { }

    ngOnInit(): void {
    }

    onClick(event: MouseEvent) {
        event.stopPropagation();
    }
}
