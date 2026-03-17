import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-chevron',
    templateUrl: './chevron.component.html',
    styleUrls: ['./chevron.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChevronComponent implements OnInit {

    @Input() opened = false;
    @Input() vertical = false;
    @Input() hoverable = true;

    constructor() { }

    ngOnInit(): void {
    }

}
