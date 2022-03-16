import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-actions-panel',
    templateUrl: './actions-panel.component.html',
    styleUrls: ['./actions-panel.component.scss']
})
export class ActionsPanelComponent implements OnInit {

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
                title: 'Save',
                alias: 'save',
                type: 'primary'
            }
        ]
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
