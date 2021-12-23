import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit } from '@angular/core';

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
    currentItem$ = this.store$.select(fromEditor.selectItemToEdit);
    itemDescriptors$ = this.store$.select(fromEditor.selectCurrentDescriptors);
    anyPanelOpened$ = this.store$.select(fromEditor.isAnyPanelOpened)
    addSectionOpened$ = this.store$.select(fromEditor.addSectionOpened);
    itemsForAdding$ = this.store$.select(fromEditor.selectAvailableSectionsForAdding);
    allSectionsSchemas$ = this.store$.select(fromEditor.selectAllSectionsSchemas);
    allBlocksSchemas$ = this.store$.select(fromEditor.selectAllBlocksSchemas);

    constructor(private store$: Store) { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.store$.dispatch(actions.closeAllPanels());
        }
    }

    ngOnInit() {
        this.store$.dispatch(actions.initApp());
    }

    templateSelected(templateKey: string) {
        this.store$.dispatch(editorActions.templateSelected({ templateKey }));
    }

    editItem(event: { sectionIndex: number, blockIndex: number | null }) {
        this.store$.dispatch(editorActions.editItem(event));
    }

    closeEditPanel() {
        this.store$.dispatch(editorActions.completeEditItem());
    }

    closeAddPanel() {
        this.store$.dispatch(editorActions.cancelAdding())
    }

    openAddSectionPanel(sectionIndex: number | boolean) {
        this.store$.dispatch(editorActions.showAddItemPanel({ sectionIndex }))
    }
}
