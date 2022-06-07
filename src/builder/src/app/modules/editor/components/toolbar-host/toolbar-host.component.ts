import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BuilderState } from '@editor/store/state';
import * as actions from '@editor/store/actions';
import * as selectors from '@editor/store/selectors';

@Component({
    selector: 'app-toolbar-host',
    templateUrl: './toolbar-host.component.html',
    styleUrls: ['./toolbar-host.component.scss']
})
export class ToolbarHostComponent implements OnInit {

    panels$ = this.store$.select(selectors.selectToolbarButtonsState);

    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        this.store$.dispatch(actions.executeToolbarAction({ action }));
    }

}
