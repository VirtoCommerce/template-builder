import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit } from '@angular/core';

import * as actions from '@shared/store/actions';
import * as sharedSelectors from '@shared/store/selectors';
import * as editorSelectors from '@editor/store/selectors';
import * as themeSelectors from '@theme/store/selectors';
import { BuilderState as SharedState } from '@shared/store';
import { BuilderState as EditorState } from '@editor/store';
import { BuilderState as ThemeState } from '@theme/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    isHttpLoading$ = this.store$.select(sharedSelectors.isHttpLoading);
    isEditorLoading$ = this.store$.select(editorSelectors.isLoading);
    isThemeLoading$ = this.store$.select(themeSelectors.isLoading);

    constructor(private store$: Store<SharedState & EditorState & ThemeState>) { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            // todo: useful feature, must be implemented
            // this.store$.dispatch(actions.closeAllPanels());
        }
    }

    ngOnInit() { }
}
