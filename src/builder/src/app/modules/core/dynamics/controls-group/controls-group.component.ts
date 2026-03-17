import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { ChevronComponent } from '@core/components/chevron/chevron.component';

@Component({
    selector: 'app-controls-group',
    templateUrl: './controls-group.component.html',
    styleUrls: ['./controls-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, MatRipple, ChevronComponent]
})
export class ControlsGroupComponent implements OnInit {

    @Input() label: string | null = null;
    @Input() opened: boolean = false;

    @Output() openedChanged = new EventEmitter<boolean>();

    ngOnInit(): void {
    }

    onOpenedChanged() {
        this.openedChanged.emit(!this.opened);
    }
}
