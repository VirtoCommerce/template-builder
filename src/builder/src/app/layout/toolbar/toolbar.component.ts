import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as router from '@core/routing/actions';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

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

    // undoRedoButtons: ButtonDescriptor[] = [
    //     { icon: 'undo', hint: 'Undo last action', type: null },
    //     { icon: 'redo', hint: 'Redo canceled action', type: null }
    // ];

    // previewButtons: ButtonDescriptor[] = [
    //     { icon: 'screen', hint: '', type: null },
    //     { icon: 'tablet', hint: '', type: null },
    //     { icon: 'mobile', hint: '', type: null },
    //     { icon: 'preview', hint: '', type: null }
    // ];

    constructor(private store: Store) { }

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        if (action === 'theme-settings') {
            this.store.dispatch(router.go({ path: ['/themes'] }));
        }
    }

}
