import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { SectionsSchemasList } from '@editor/models';
import { SectionModel } from '@shared/models';
import { helpers } from '@editor/services';

@Component({
    selector: 'app-section-item',
    templateUrl: './section-item.component.html',
    styleUrls: ['./section-item.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({ height: 'auto' })),
            state('closed', style({ height: '0' })),
            transition('open => closed', [animate('1s')]),
            transition('closed => open', [animate('1s')])
        ])
    ]
})
export class SectionItemComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() sectionsSchemas!: SectionsSchemasList;
    @Input() blocksSchemas!: SectionsSchemasList;
    @Input() opened: boolean = false;

    @Output() itemClick = new EventEmitter<number | null>();
    @Output() addClick = new EventEmitter<never>();
    @Output() openChanged = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {

    }

    onItemClick(itemId: number | null = null) {
        this.itemClick.emit(itemId);
    }

    onAddClick() {
        this.addClick.emit();
    }

    getSectionIcon(): string | null {
        return this.sectionsSchemas[this.section.type]?.icon || null;
    }

    getSectionName(): string {
        return this.getItemName(this.section, this.sectionsSchemas);
    }

    getBlockName(block: SectionModel): string {
        return this.getItemName(block, this.blocksSchemas)
            || this.getItemName(block, this.sectionsSchemas);
    }

    onOpenChanged(isOpen: boolean) {
        this.openChanged.emit(isOpen);
    }

    private getItemName(item: SectionModel, schemas: SectionsSchemasList): string {
        return helpers.getSectionName(item, schemas);
    }

    hasChildren(): boolean {
        return !!this.sectionsSchemas[this.section.type]?.blocks?.length;
    }

    getBlockIcon(block: SectionModel): string | null {
        return this.blocksSchemas[block.type]?.icon || null;
    }
}
