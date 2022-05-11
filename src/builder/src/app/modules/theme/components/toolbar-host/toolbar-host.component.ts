import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as actions from '@theme/store/actions';

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
                alias: 'cancel',
                type: 'secondary'
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
        this.store.dispatch(actions.executeAction({ action }));
    }

}
