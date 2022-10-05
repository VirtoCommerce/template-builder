import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BuilderState } from '@shared/routing';
import * as fromRoute from '@shared/routing';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    @HostBinding('class.hidden') isHidden: boolean = false;
    @HostBinding('class.desktop-50') desktop50: boolean = false;

    constructor(private store: Store<BuilderState>) {
        // note! this subscription can be unsubscribed
        this.store.select(fromRoute.isFullscreenPreviewMode).subscribe(
            x => this.isHidden = x
        );
        this.store.select(fromRoute.isDesktop50).subscribe(
            x => this.desktop50 = x
        );
    }

    ngOnInit(): void { }
}
