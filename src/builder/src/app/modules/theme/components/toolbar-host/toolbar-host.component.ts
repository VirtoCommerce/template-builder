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
                title: 'Cancel',
                alias: 'cancel'
            },
            {
                title: 'Save settings',
                alias: 'save',
                type: 'primary'
            }
        ]
    ];

    constructor(private store: Store) { }

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        if (action === 'cancel') {
            this.store.dispatch(router.go({ path: ['/pages'] })); // todo: execute theme action which will be run router action
        }
    }

}
