import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionButtonDescriptor } from '@core/models';
import { Store } from '@ngrx/store';

import { AppConfig } from '@integration/services';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';
import * as actions from '@shared/store/actions';

@Component({
    selector: 'app-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultToolbarComponent implements OnInit {

    @Input() panels: ActionButtonDescriptor[][] | null = null;
    @Output() actionExecuted = new EventEmitter<string>();

    displayTemplateSelector: boolean;

    constructor(
        private store$: Store<BuilderState>,
        private appConfig: AppConfig
    ) {
        this.displayTemplateSelector = !this.appConfig.getValue('skipTemplates');
    }

    ngOnInit(): void {
    }

    onActionExecuted(item: string) {
        this.actionExecuted.emit(item);
    }
}
