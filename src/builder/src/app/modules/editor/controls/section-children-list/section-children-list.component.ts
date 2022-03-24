import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { SectionsSchemasList } from '@app/models';
import { SectionModel } from '@shared/models';

@Component({
    selector: 'app-section-children-list',
    templateUrl: './section-children-list.component.html',
    styleUrls: ['./section-children-list.component.scss']
})
export class SectionChildrenListComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() blocksSchemas!: SectionsSchemasList;

    constructor() { }

    ngOnInit(): void {
    }

    reorderBlocks(event: CdkDragSortEvent<SectionModel>) {

    }
}
