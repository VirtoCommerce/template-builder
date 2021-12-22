import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromEditor from '@editor/store';
import { editorActions } from '@editor/store';

import { actions } from './store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    availableTemplates$ = this.store$.select(fromEditor.selectAvailableTemplates);

    currentTemplate$ = this.store$.select(fromEditor.selectCurrentTemplate);
    currentTemplateName$ = this.store$.select(fromEditor.selectCurrentTemplateName);
    // currentItem$ = this.store$.select(fromEditor.selectItemToEdit);
    // itemDescriptors$ = this.store$.select(fromEditor.selectCurrentDescriptors);

    constructor(private store$: Store) { }

    ngOnInit() {
        this.store$.dispatch(actions.initApp());
    }

    templateSelected(templateKey: string) {
        this.store$.dispatch(editorActions.templateSelected({ templateKey }));
    }

    editItem(event: { sectionIndex: number, blockIndex: number | null }) {
        this.store$.dispatch(editorActions.editItem(event));
    }

    closePanels() {
        this.store$.dispatch(editorActions.completeEditItem());
    }

    panelOpened = false;
    editOpened = false;


    openPanel() {
        this.panelOpened = true;
    }
}
