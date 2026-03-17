import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { ChevronComponent } from '../chevron/chevron.component';

@Component({
    selector: 'app-collapsible-list-item',
    templateUrl: './collapsible-list-item.component.html',
    styleUrls: ['./collapsible-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, NgStyle, ChevronComponent]
})
export class CollapsibleListItemComponent {

    @Input() opened = false;
    @Input() expandable: boolean = false;
    @Input() hovered: boolean = false;
    @Input() highlight: boolean = false;

    @Output() openChanged = new EventEmitter<boolean>();

    onChevronClick() {
        this.openChanged.emit(!this.opened);
    }
}
