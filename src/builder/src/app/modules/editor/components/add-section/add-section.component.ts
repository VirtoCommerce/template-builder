import { ItemsGroup } from '@core/models';
import { SectionSchema } from '@models/document';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { BuilderState } from '@editor/store/state';

import * as actions from '@editor/store/actions';
import * as fromState from '@editor/store/selectors';
import * as fromRoute from '@shared/routing/selectors';

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSectionComponent implements OnInit {

    private readonly store = inject(Store<BuilderState>);

    title$ = this.store.select(fromState.selectAddItemTitle)
    viewModel$ = this.store.select(fromState.selectAddItemContext);
    filter$ = this.store.select(fromState.selectCurrentSectionsFilter);
    isHalfScreen$ = this.store.select(fromRoute.isDesktop50);

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
