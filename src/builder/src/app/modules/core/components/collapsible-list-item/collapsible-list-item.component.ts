import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf, NgClass, NgStyle } from '@angular/common';
import { ChevronComponent } from '../chevron/chevron.component';

@Component({
    selector: 'app-collapsible-list-item',
    templateUrl: './collapsible-list-item.component.html',
    styleUrls: ['./collapsible-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgClass, NgStyle, ChevronComponent]
})
export class CollapsibleListItemComponent implements OnInit {

    @Input() opened = false;
    @Input() expandable: boolean = false;
    @Input() hovered: boolean = false;
    @Input() highlight: boolean = false;

    @Output() openChanged = new EventEmitter<boolean>();

    ngOnInit(): void { }

    onChevronClick() {
        this.openChanged.emit(!this.opened);
    }
}
