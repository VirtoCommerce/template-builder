import { Component, OnInit } from '@angular/core';
import { ActionButtonDescriptor } from '@core/models';

@Component({
    selector: 'app-preview-mode',
    templateUrl: './preview-mode.component.html',
    styleUrls: ['./preview-mode.component.scss']
})
export class PreviewModeComponent implements OnInit {

    previewModes: ActionButtonDescriptor[] = [
        {
            icon: 'desktop_windows',
            title: 'Desktop',
            alias: 'desktop'
        },
        {
            icon: 'phone_iphone',
            title: 'Phone',
            alias: 'phone'
        },
        {
            icon: 'tablet_mac',
            title: 'Tablet',
            alias: 'tablet'
        },
        {
            icon: 'fullscreen',
            title: 'Full screen',
            alias: 'fullscreen'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
