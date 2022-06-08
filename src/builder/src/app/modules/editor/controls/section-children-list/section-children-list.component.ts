import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SectionsSchemasList } from '@editor/models';
import { SectionModel, ReorderItemsModel } from '@core/models';

@Component({
    selector: 'app-section-children-list',
    templateUrl: './section-children-list.component.html',
    styleUrls: ['./section-children-list.component.scss']
})
export class SectionChildrenListComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() blocksSchemas!: SectionsSchemasList;

    @Output() itemClick = new EventEmitter<SectionModel>();
    @Output() addBlockClick = new EventEmitter();
    @Output() reorderBlocks = new EventEmitter<ReorderItemsModel>();
    @Output() executeAction = new EventEmitter<{ action: string, block: SectionModel }>();

    constructor() { }

    ngOnInit(): void {
    }

    onReorderBlocks(event: CdkDragSortEvent<SectionModel>) {
        this.reorderBlocks.emit({ item: event.item.data, currentIndex: event.currentIndex, previousIndex: event.previousIndex, parent: this.section });
    }

    onItemClick(block: SectionModel) {
        this.itemClick.emit(block);
    }

    onAddBlockClick() {
        this.addBlockClick.emit();
    }

    onActionExecuted(action: string, block: SectionModel) {
        this.executeAction.emit({ action, block });
    }
}
