import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButtonDescriptor } from '@core/models';
import { Store } from '@ngrx/store';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';

@Component({
    selector: 'app-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss']
})
export class DefaultToolbarComponent implements OnInit {

    @Input() panels: ActionButtonDescriptor[][] | null = null;
    @Output() actionExecuted = new EventEmitter<string>();

    templates$ = this.store$.select(fromState.selectTemplatesEntries);

    constructor(private store$: Store<BuilderState>) { }

    ngOnInit(): void {
    }

    onActionExecuted(item: string) {
        this.actionExecuted.emit(item);
    }
}
