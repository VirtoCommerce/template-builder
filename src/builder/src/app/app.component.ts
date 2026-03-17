import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import * as actions from '@shared/store/actions';
import * as sharedSelectors from '@shared/store/selectors';
import * as editorSelectors from '@editor/store/selectors';
import * as themeSelectors from '@theme/store/selectors';
import { BuilderState as SharedState } from '@shared/store';
import { BuilderState as EditorState } from '@editor/store';
import { BuilderState as ThemeState } from '@theme/store';

import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { PreviewAreaComponent } from './layout/preview-area/preview-area.component';
import { FullscreenLoaderComponent } from './layout/fullscreen-loader/fullscreen-loader.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, AsyncPipe, RouterOutlet, ToolbarComponent, PreviewAreaComponent, FullscreenLoaderComponent]
})
export class AppComponent implements OnInit {

    private store$ = inject(Store<SharedState & EditorState & ThemeState>);

    isHttpLoading$ = this.store$.select(sharedSelectors.isHttpLoading);
    isEditorLoading$ = this.store$.select(editorSelectors.isLoading);
    isThemeLoading$ = this.store$.select(themeSelectors.isLoading);

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            // todo: useful feature, must be implemented
            // this.store$.dispatch(actions.closeAllPanels());
        }
    }

    ngOnInit() { }
}
