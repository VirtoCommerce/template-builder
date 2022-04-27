import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

    constructor(private store: Store) { }

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        if (action === 'theme-settings') {
            this.store.dispatch(router.go({ path: ['/themes'] }));
        }
    }

}
