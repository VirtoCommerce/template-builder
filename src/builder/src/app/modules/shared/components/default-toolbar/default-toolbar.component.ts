import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActionButtonDescriptor } from '@core/models';
import { Store } from '@ngrx/store';

import { AppConfig } from '@integration/services';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';
import * as actions from '@shared/store/actions';
import { PreviewModeComponent } from '@shared/components/preview-mode/preview-mode.component';
import { TemplateSelectorComponent } from '@shared/components/template-selector/template-selector.component';
import { ActionsPanelComponent } from '@shared/components/actions-panel/actions-panel.component';

@Component({
    selector: 'app-default-toolbar',
    templateUrl: './default-toolbar.component.html',
    styleUrls: ['./default-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, PreviewModeComponent, TemplateSelectorComponent, ActionsPanelComponent]
})
export class DefaultToolbarComponent implements OnInit {

    private readonly appConfig = inject(AppConfig);

    @Input() panels: ActionButtonDescriptor[][] | null = null;
    @Output() actionExecuted = new EventEmitter<string>();

    displayTemplateSelector: boolean = !this.appConfig.getValue('skipTemplates');

    ngOnInit(): void {
    }

    onActionExecuted(item: string) {
        this.actionExecuted.emit(item);
    }
}
