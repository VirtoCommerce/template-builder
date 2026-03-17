import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-icon-with-preview',
    templateUrl: './icon-with-preview.component.html',
    styleUrls: ['./icon-with-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconWithPreviewComponent implements OnInit {

    isOpen = false;

    constructor() { }

    ngOnInit(): void { }

}
