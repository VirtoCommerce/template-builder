import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BlockStatesList, SectionsSchemasList } from '@editor/models';
import { ReorderItemsModel } from '@core/models';
import { SectionModel } from '@models/document';

@Component({
    selector: 'app-section-children-list',
    templateUrl: './section-children-list.component.html',
    styleUrls: ['./section-children-list.component.scss']
})
export class SectionChildrenListComponent implements OnInit {

    currentHoverId: string | null = null;

    @Input() section!: SectionModel;
    @Input() blocksSchemas!: SectionsSchemasList;
    @Input() states!: BlockStatesList;

    @Output() itemClick = new EventEmitter<SectionModel>();
    @Output() checkChanged = new EventEmitter<{ blockId: string, selected: boolean }>();
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

    onItemSelectChanged(selected: boolean, blockId: string) {
        this.checkChanged.emit({ blockId, selected });
    }
}
