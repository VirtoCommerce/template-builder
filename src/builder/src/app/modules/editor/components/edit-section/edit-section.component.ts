import { Component, OnInit } from '@angular/core';
import { BuilderState } from '@editor/store/state';
import { Store } from '@ngrx/store';

import { ContextMenuAction, ModelChangedEventArgs  } from '@core/models';
import { SectionModel, SectionSchema } from '@models/document';
import { ContextMenuHelper } from '@editor/helpers';

import * as actions from '@editor/store/actions';
import * as fromState from '@editor/store/selectors';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSectionComponent implements OnInit {

    viewModel$ = this.store.select(fromState.selectEditSectionContext);
    sectionName$ = this.store.select(fromState.selectCurrentItemName);

    constructor(private store: Store<BuilderState>,
        private helper: ContextMenuHelper) { }

    ngOnInit(): void { }

    onBackClick() {
        this.store.dispatch(actions.closeEditItemPanel());
    }

    onModelChanged(args: ModelChangedEventArgs) {
        this.store.dispatch(actions.sectionChangedAction({ changes: args.changes }));
    }

    onContextMenuAction(action: ContextMenuAction, section: SectionModel, block: SectionModel) {
        if (action !== '|') {
            this.store.dispatch(actions.executeContextMenuAction({ action: action.action, source: 'editor', section, block }));
        }
    }

    getItemActionsFactory(item: SectionModel, schema: SectionSchema): () => Promise<ContextMenuAction[]> {
        return () => this.helper.getSectionsActions(item, !!schema.blocks?.length);
    }
}
