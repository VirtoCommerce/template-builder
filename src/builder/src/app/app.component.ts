import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromEditor from '@editor/store';

import { actions } from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    panelOpened = false;
    editOpened = false;

    availableTemplates$ = this.store$.select(fromEditor.selectAvailableTemplates);

    constructor(private store$: Store) { }

    ngOnInit() {
        this.store$.dispatch(actions.initApp());
    }

    openPanel() {
        this.panelOpened = true;
    }

    openEdit() {
        this.editOpened = true;
    }

    closePanels() {
        this.panelOpened = false;
        this.editOpened = false;
    }
}
