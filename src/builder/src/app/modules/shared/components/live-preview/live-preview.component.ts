import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';
import * as fromRoute from '@shared/routing';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-live-preview',
    templateUrl: './live-preview.component.html',
    styleUrls: ['./live-preview.component.scss']
})
export class LivePreviewComponent implements OnInit {

    isPresetPreviewMode$ = this.store.select(fromRoute.isPresetPreviewMode);
    previewPresetName$ = this.store.select(fromRoute.selectPresetParameter);
    previewMode$ = this.store.select(fromRoute.selectPreviewModeParameter);
    previewUrl$ = this.store.select(fromState.selectPreviewUrl).pipe(
        filter(url => !!url),
        map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
    );

    constructor(private store: Store<BuilderState>, private sanitizer: DomSanitizer) { }

    ngOnInit(): void { }

}
