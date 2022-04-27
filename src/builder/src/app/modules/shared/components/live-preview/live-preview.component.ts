import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoute from '@shared/routing';
import { BuilderState } from '@shared/store';

@Component({
    selector: 'app-live-preview',
    templateUrl: './live-preview.component.html',
    styleUrls: ['./live-preview.component.scss']
})
export class LivePreviewComponent implements OnInit {

    isPreviewMode$ = this.store.select(fromRoute.isPreviewMode);
    previewPresetName$ = this.store.select(fromRoute.selectPresetParameter);

    constructor(private store: Store<BuilderState>) { }

    ngOnInit(): void {
    }

}
