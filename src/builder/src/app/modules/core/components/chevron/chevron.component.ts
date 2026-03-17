import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-chevron',
    templateUrl: './chevron.component.html',
    styleUrls: ['./chevron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass, IconComponent]
})
export class ChevronComponent implements OnInit {

    @Input() opened = false;
    @Input() vertical = false;
    @Input() hoverable = true;

    ngOnInit(): void {
    }

}
