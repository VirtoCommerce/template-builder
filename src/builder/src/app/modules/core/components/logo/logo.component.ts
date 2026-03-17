import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit {

    @Input() version: string | null = null;

    constructor() { }

    ngOnInit(): void { }

}
