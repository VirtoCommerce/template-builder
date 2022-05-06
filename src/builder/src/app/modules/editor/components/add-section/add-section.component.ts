import { ListHelpers } from '@core/services';
import { SectionSchema, ItemsGroup } from '@core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionsSchemasList } from '@editor/models';
import { Store } from '@ngrx/store';

import { BuilderState } from '@editor/store/state';

import * as actions from '@editor/store/actions';
import * as fromState from '@editor/store/selectors';

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {

    title$ = this.store.select(fromState.selectAddItemTitle)
    viewModel$ = this.store.select(fromState.selectAddItemContext);
    filter$ = this.store.select(fromState.selectCurrentSectionsFilter);

    constructor(private store: Store<BuilderState>) { }
    ngOnInit(): void { }

    onCancelClick() {
        this.store.dispatch(actions.closeAddItemPanel());
    }

    onToggleGroup(group: ItemsGroup<SectionSchema>) {
        this.store.dispatch(actions.toggleGroupAction({ groupId: group.name }));
    }

    onPreviewItem(item: SectionSchema) {
        this.store.dispatch(actions.previewItemAction({ item }))
    }

    onAddItem(schema: SectionSchema) {
        this.store.dispatch(actions.addItemAction({ schema }));
    }

    applySectionsFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.store.dispatch(actions.applySectionsFilter({ filter: value }));
    }
}
