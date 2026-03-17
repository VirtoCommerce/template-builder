import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { BuilderState } from '@shared/routing';
import * as fromRoute from '@shared/routing';

@Component({
    selector: 'app-preview-area',
    templateUrl: './preview-area.component.html',
    styleUrls: ['./preview-area.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewAreaComponent {

    private readonly store = inject(Store<BuilderState>);

    private readonly desktop50$ = toSignal(this.store.select(fromRoute.isDesktop50), { initialValue: false });

    @HostBinding('class.desktop-50') get desktop50() { return this.desktop50$(); }
}
