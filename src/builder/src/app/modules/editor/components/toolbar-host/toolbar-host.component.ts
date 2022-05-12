import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NotificationsService } from '@core/services';
import * as router from '@shared/routing/actions';

@Component({
    selector: 'app-toolbar-host',
    templateUrl: './toolbar-host.component.html',
    styleUrls: ['./toolbar-host.component.scss']
})
export class ToolbarHostComponent implements OnInit {

    panels = [
        [
            {
                icon: 'settings',
                alias: 'theme-settings',
                title: 'Theme settings',
                type: 'outline'
            }
        ],
        [
            {
                icon: 'undo',
                alias: 'undo'
            },
            {
                icon: 'redo',
                alias: 'redo'
            }
        ],
        [
            {
                title: 'Save',
                alias: 'save',
                type: 'primary'
            }
        ]
    ];

    constructor(
        private store: Store,
        private notifications: NotificationsService
    ) { }

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        if (action === 'theme-settings') {
            // todo: move to effects
            this.store.dispatch(router.go({ path: ['/themes'] }));
        } else if (action === 'save') {
        } else if (action === 'undo') {
            this.notifications.demotr();
        } else if (action === 'redo') {
            this.notifications.demobl();
        }
    }

}
