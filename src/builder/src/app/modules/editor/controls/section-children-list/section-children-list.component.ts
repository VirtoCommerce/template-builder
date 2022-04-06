import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SectionsSchemasList } from '@editor/models';
import { SectionModel } from '@shared/models';

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

    constructor() { }

    ngOnInit(): void {
    }

    reorderBlocks(event: CdkDragSortEvent<SectionModel>) { }

    onItemClick(block: SectionModel) {
        this.itemClick.emit(block);
    }

    onAddBlockClick() {
        this.addBlockClick.emit();
    }
}
