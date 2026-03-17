import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, inject } from '@angular/core';
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

    private readonly store = inject(Store<BuilderState>);
    private readonly cdr = inject(ChangeDetectorRef);

    @HostBinding('class.hidden') isHidden: boolean = false;
    @HostBinding('class.desktop-50') desktop50: boolean = false;

    constructor() {
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
