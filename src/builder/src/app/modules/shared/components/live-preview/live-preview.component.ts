import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { EventsBusService } from '@core/services';
import { AppConfig } from '@integration/services';

import { BuilderState } from '@shared/store';
import * as fromState from '@shared/store';
import * as fromRoute from '@shared/routing';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-live-preview',
    templateUrl: './live-preview.component.html',
    styleUrls: ['./live-preview.component.scss']
})
export class LivePreviewComponent implements OnInit {

    @ViewChild('frame', { static: false }) frame: ElementRef | undefined;

    private previewLoadedSource = new BehaviorSubject<boolean>(false);
    private previewLoaded$ = new Observable(observer => {
        this.previewLoadedSource.subscribe(result => {
            if (result) {
                observer.next();
                observer.complete();
            }
        });
    });


    isPresetPreviewMode$ = this.store.select(fromRoute.isPresetPreviewMode);
    previewPresetName$ = this.store.select(fromRoute.selectPresetParameter);
    previewMode$ = this.store.select(fromRoute.selectPreviewModeParameter);

    previewUrl!: SafeResourceUrl;
    url!: string;

    constructor(
        private store: Store<BuilderState>,
        private sanitizer: DomSanitizer,
        private eventBus: EventsBusService,
        private config: AppConfig
    ) { }

    ngOnInit(): void {

        // add
        // clone
        // hide
        // page - refresh whole page
        // preview
        // reload
        // remove
        // select
        // show
        // swap
        // update

        this.eventBus.on(() => true, msg => {
            switch (msg.type) {
                case 'preview-loaded':
                    this.previewLoadedSource.next(true);
                    break;
                default:
                    this.sendMessage(msg);
                    break;
            }
        });
        this.url = this.config.getValue('fullPreviewUrl');
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }

    private sendMessage(msg: any) {
        this.previewLoaded$.subscribe(() => {
            if (this.frame) {
                const frame = this.frame.nativeElement as HTMLIFrameElement;
                const message = { ...msg, source: 'builder' };
                frame.contentWindow?.postMessage(message, this.url);
            }
        });
    }
}
