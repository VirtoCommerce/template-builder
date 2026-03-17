import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, IconComponent]
})
export class IconButtonComponent implements OnInit {

    @Input() icon?: string;
    @Input() text?: string;
    @Input() skin?: string;
    @Input() disabled: boolean = false;

    @Output() onClick = new EventEmitter<MouseEvent>();

    ngOnInit(): void {
    }

    raiseOnClick(event: MouseEvent) {
        this.onClick.emit(event);
    }
}
