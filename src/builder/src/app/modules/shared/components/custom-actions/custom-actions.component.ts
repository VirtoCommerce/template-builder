import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActionButtonDescriptor } from '@core/models';
import { ActionsDropdownComponent } from '@core/components/actions-dropdown/actions-dropdown.component';

@Component({
    selector: 'app-custom-actions',
    templateUrl: './custom-actions.component.html',
    styleUrls: ['./custom-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ActionsDropdownComponent]
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

    ngOnInit(): void {
    }

}
