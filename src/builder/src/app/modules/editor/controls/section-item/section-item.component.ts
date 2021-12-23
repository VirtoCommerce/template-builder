import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { SectionsSchemasList } from '@editor/models';
import { SectionModel } from '@shared/models';

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

    @Output() itemClick = new EventEmitter<number | null>();
    @Output() addClick = new EventEmitter<never>();

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

    private getItemName(item: SectionModel, schemas: SectionsSchemasList): string {
        const schema = schemas[item.type];
        if (!!schema) {
            if (schema.displayNameProperty) {
                const result = item[schema.displayNameProperty];
                if (!!result) {
                    return <string>result;
                }
            }
        }
        const result = <string>item['name'];
        if (!!result) {
            return result;
        }
        return item.type;
    }

    hasChildren(): boolean {
        return !!this.sectionsSchemas[this.section.type]?.blocks;
    }

    getBlockIcon(block: SectionModel): string | null {
        return this.blocksSchemas[block.type]?.icon || null;
    }
}
