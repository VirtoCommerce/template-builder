import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-drag-handle',
    templateUrl: './drag-handle.component.html',
    styleUrls: ['./drag-handle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgStyle, IconComponent]
})
export class DragHandleComponent implements OnInit {

    @HostBinding('class.visible')
    @Input() visible = false;
    @Input() info: string = '';

    ngOnInit(): void {
    }

    onClick(event: MouseEvent) {
        event.stopPropagation();
    }
}
