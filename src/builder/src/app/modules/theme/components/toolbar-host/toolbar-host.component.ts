import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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

    private readonly store$ = inject(Store<BuilderState>);

    panels$ = this.store$.select(selectors.selectToolbarButtonsState);

    ngOnInit(): void {
    }

    onActionExecuted(action: string) {
        this.store$.dispatch(actions.executeAction({ action }));
    }

}
