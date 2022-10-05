import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ActionButtonDescriptor } from '@core/models';
import { BuilderState } from '@shared/store';
import * as fromRoute from '@shared/routing';
import * as actions from '@shared/store/actions';
import { tap } from 'rxjs';

@Component({
    selector: 'app-preview-mode',
    templateUrl: './preview-mode.component.html',
    styleUrls: ['./preview-mode.component.scss']
})
export class PreviewModeComponent implements OnInit {

    // todo: should be in config
    previewModes: ActionButtonDescriptor[] = [
        {
            icon: 'desktop_windows',
            title: 'Desktop',
            alias: undefined
        },
        {
            icon: 'desktop_windows',
            title: 'Desktop 50/50',
            alias: 'desktop-50'
        },
        {
            icon: 'phone_iphone',
            title: 'Phone',
            alias: 'phone'
        },
        {
            icon: 'tablet_mac',
            title: 'Tablet',
            alias: 'tablet'
        },
        {
            icon: 'fullscreen',
            title: 'Full screen',
            alias: 'fullscreen'
        }
    ];

    currentMode$ = this.store.select(fromRoute.selectPreviewModeParameter);

    constructor(private store: Store<BuilderState>) { }

    ngOnInit(): void { }

    changePreviewMode(action: ActionButtonDescriptor) {
        this.store.dispatch(actions.changePreviewMode({ mode: action.alias || null }));
    }
}
