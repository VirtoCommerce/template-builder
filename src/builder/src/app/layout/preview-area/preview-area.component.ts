import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BuilderState } from '@shared/routing';
import * as fromRoute from '@shared/routing';

@Component({
    selector: 'app-preview-area',
    templateUrl: './preview-area.component.html',
    styleUrls: ['./preview-area.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewAreaComponent implements OnInit {

    @HostBinding('class.desktop-50') desktop50: boolean = false;

    constructor(private store: Store<BuilderState>, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.store.select(fromRoute.isDesktop50).subscribe(
            x => { this.desktop50 = x; this.cdr.markForCheck(); }
        );
    }

}
