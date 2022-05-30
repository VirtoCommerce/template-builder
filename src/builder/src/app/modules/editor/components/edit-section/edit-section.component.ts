import { ContextMenuHelper } from './../../services/context-menu.helper';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BuilderState } from '@editor/store/state';
import { ContextMenuAction, ModelChangedEventArgs, ControlContext, SectionModel, SectionPropertyDescriptor, SectionSchema } from '@core/models';
// import { SectionsSchemasList } from '@editor/models';
import { helpers } from '@editor/services';
import { Store } from '@ngrx/store';

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

    onContextMenuAction(action: ContextMenuAction, section: SectionModel) {
        if (action !== '|') {
            this.store.dispatch(actions.executeContextMenuAction({ action: action.action, source: 'editor', section }));
        }
    }

    getItemActionsFactory(item: SectionModel): () => ContextMenuAction[] {
        return () => this.helper.getSectionsActions(item);
    }
}
