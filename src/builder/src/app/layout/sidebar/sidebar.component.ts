import { Component, HostBinding, OnInit } from '@angular/core';
import { tap } from 'rxjs';
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

    constructor(private store: Store<BuilderState>) {
        this.store.select(fromRoute.isFullscreenPreviewMode).subscribe(
            x => this.isHidden = x
        );
    }

    ngOnInit(): void { }
}
