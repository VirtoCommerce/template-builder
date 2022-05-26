import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { EventsBusService } from '@core/services';

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

    @ViewChild('frame', { static: false }) frame: ElementRef | undefined;

    isPresetPreviewMode$ = this.store.select(fromRoute.isPresetPreviewMode);
    previewPresetName$ = this.store.select(fromRoute.selectPresetParameter);
    previewMode$ = this.store.select(fromRoute.selectPreviewModeParameter);
    // previewUrl$ = this.store.select(fromState.selectPreviewUrl).pipe(
    //     filter(url => !!url),
    //     map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
    // );

    constructor(
        private store: Store<BuilderState>,
        private sanitizer: DomSanitizer,
        private eventBus: EventsBusService
    ) { }

    ngOnInit(): void {
        this.eventBus.on(() => true, msg => {
            this.sendMessage(msg);
        });
    }

    private sendMessage(msg: any) {
        if (this.frame) {
            console.log(this.frame);
            const frame = this.frame.nativeElement as HTMLIFrameElement;
            // todo: url to config flow
            frame.contentWindow?.postMessage({ ...msg, source: 'builder' }, 'http://localhost:2082');
        }
    }
}
