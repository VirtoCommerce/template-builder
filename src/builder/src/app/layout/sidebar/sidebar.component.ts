import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BuilderState } from '@shared/routing';
import * as fromRoute from '@shared/routing';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

    @HostBinding('class.hidden') isHidden: boolean = false;
    @HostBinding('class.desktop-50') desktop50: boolean = false;

    constructor(private store: Store<BuilderState>, private cdr: ChangeDetectorRef) {
        // note! this subscription can be unsubscribed
        this.store.select(fromRoute.isFullscreenPreviewMode).pipe(takeUntilDestroyed()).subscribe(
            x => { this.isHidden = x; this.cdr.markForCheck(); }
        );
        this.store.select(fromRoute.isDesktop50).pipe(takeUntilDestroyed()).subscribe(
            x => { this.desktop50 = x; this.cdr.markForCheck(); }
        );
    }

    ngOnInit(): void { }
}
