import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { BuilderState } from '@theme/store/state';
import * as actions from '@theme/store/actions';
import * as selectors from '@theme/store/selectors';

@Component({
    selector: 'app-toolbar-host',
    templateUrl: './toolbar-host.component.html',
    styleUrls: ['./toolbar-host.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarHostComponent implements OnInit {

    panels$ = this.store$.select(selectors.selectToolbarButtonsState);

    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        this.store$.dispatch(actions.executeAction({ action }));
    }

}
