import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActionButtonDescriptor } from '@core/models';

@Component({
    selector: 'app-custom-actions',
    templateUrl: './custom-actions.component.html',
    styleUrls: ['./custom-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomActionsComponent implements OnInit {

    actions: ActionButtonDescriptor[] = [
        {
            icon: 'desktop_windows',
            title: 'Edit code',
            alias: ''
        },
        {
            icon: 'phone_iphone',
            title: 'Edit languages',
            alias: ''
        },
        {
            icon: 'tablet_mac',
            title: 'View documentations',
            alias: ''
        },
        {
            icon: 'fullscreen',
            title: 'Get support',
            alias: ''
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
