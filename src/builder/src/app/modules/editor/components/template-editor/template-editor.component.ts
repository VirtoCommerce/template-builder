import { ContextMenuAction } from './../../../core/models/components/context-menu-action.model';
import { ReoderItemsModel } from './../../../core/models/ui/reorder-items.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragSortEvent, CdkDragStart, CdkDragRelease } from '@angular/cdk/drag-drop';

import { BuilderState } from '@editor/store/state';

import * as fromRoute from '@shared/routing';
import * as fromState from '@editor/store/selectors';
import * as actions from '@editor/store/actions';

import {
    SectionsSchemasList,
    TemplateModel
} from '@editor/models';
import { SectionModel, SectionSchema } from '@core/models';

import { helpers } from '@editor/services';

@Component({
    selector: 'app-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateEditorComponent implements OnInit {

    viewModel$ = this.store.select(fromState.editTemplateContext);

    templateName$ = this.store.select(fromState.selectCurrentTemplateName);
    templateParameter$ = this.store.select(fromRoute.selectTemplateParameter);

    constructor(private store: Store<BuilderState>) { }
    ngOnInit(): void { }

    addSectionClick() {
        this.store.dispatch(actions.showBlankSections({ sectionId: null }));
    }

    reorderSections(event: CdkDragSortEvent<SectionModel>) {
        this.store.dispatch(actions.sortItems({ options: { item: event.item.data, currentIndex: event.currentIndex, previousIndex: event.previousIndex } }))
    }
    sectionDragStarted(section: SectionModel) {
        this.store.dispatch(actions.startDragSection({ sectionId: section.id }));
    }
    sectionDragCompleted(section: SectionModel) {
        this.store.dispatch(actions.releaseDragSection({ sectionId: section.id }));
    }

    reorderBlocks(options: ReoderItemsModel) {
        this.store.dispatch(actions.sortItems({ options }))
    }

    onSectionClick(section: SectionModel) {
        this.store.dispatch(actions.editSectionAction({ sectionId: section.id }));
    }
    onBlockClick(section: SectionModel, block: SectionModel) {
        this.store.dispatch(actions.editBlockAction({ sectionId: section.id, blockId: block.id }));
    }
    addBlockClick(section: SectionModel) {
        this.store.dispatch(actions.showBlankSections({ sectionId: section.id }));
    }

    toggleSection(sectionId: string, template: string) {
        this.store.dispatch(actions.toggleSectionAction({ sectionId, template }));
    }

    onActionClick(event: string, section: SectionModel) {
        this.store.dispatch(actions.executeContextMenuAction({ action: event, source: 'list', section }));
    }

}
