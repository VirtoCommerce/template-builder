import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit } from '@angular/core';

import { SectionModel, SectionSchema } from '@models/document';

// import * as fromEditor from '@editor/store';
// import { editorActions } from '@editor/store';

import * as actions from '@shared/store/actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private store$: Store) { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            // todo: useful feature, must be implemented
            // this.store$.dispatch(actions.closeAllPanels());
        }
    }

    ngOnInit() { }
}
