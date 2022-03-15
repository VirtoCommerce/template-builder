import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-actions-panel',
    templateUrl: './actions-panel.component.html',
    styleUrls: ['./actions-panel.component.scss']
})
export class ActionsPanelComponent implements OnInit {

    buttons = [
        {
            title: 'Save',
            alias: 'save',
            type: 'primary'
        }
    ];
    icons = [
        {
            icon: 'undo',
            alias: 'undo'
        },
        {
            icon: 'redo',
            alias: 'redo'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
