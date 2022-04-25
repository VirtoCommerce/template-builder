import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';
// import { SectionsSchemasList } from '@editor/models';
import { ContextMenuAction, SectionModel, SectionSchema } from '@core/models';
import { helpers } from '@editor/services';

@Component({
    selector: 'app-section-item',
    templateUrl: './section-item.component.html',
    styleUrls: ['./section-item.component.scss'],
    // animations: [
    //     trigger('openClose', [
    //         state('open', style({ height: 'auto' })),
    //         state('closed', style({ height: '0' })),
    //         transition('open => closed', [animate('1s')]),
    //         transition('closed => open', [animate('1s')])
    //     ])
    // ]
})
export class SectionItemComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() sectionSchema!: SectionSchema;
    // @Input() blocksSchemas!: SectionsSchemasList;
    @Input() opened: boolean = false;
    @Input() draggable: boolean = true;

    @Output() itemClick = new EventEmitter();
    @Output() openChanged = new EventEmitter<boolean>();
    @Output() visibleChanged = new EventEmitter<{ sectionIndex: number, blockIndex: number | null, value: boolean }>();

    itemActions = [
        <ContextMenuAction>{
            action: 'hide',
            title: 'Hide',
            icon: 'visibility',
            selected: false,
            inactive: false
        },
        <ContextMenuAction>'|',
        <ContextMenuAction>{
            action: 'copy',
            title: 'Copy',
            icon: 'content_copy',
            selected: false,
            inactive: false
        },
        <ContextMenuAction>{
            action: 'paste-before',
            title: 'Paste before',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        <ContextMenuAction>{
            action: 'paste-after',
            title: 'Paste after',
            icon: 'content_paste',
            selected: false,
            inactive: false
        },
        <ContextMenuAction>{
            action: 'duplicate',
            title: 'Duplicate',
            icon: 'file_copy',
            selected: false,
            inactive: false
        },
        <ContextMenuAction>'|',
        <ContextMenuAction>{
            action: 'delete',
            title: 'Delete',
            icon: 'delete_outline',
            selected: false,
            inactive: false
        }
    ];

    isHover: boolean = false;

    constructor() { }

    ngOnInit(): void {

    }

    onItemClick() {
        this.itemClick.emit();
    }

    getSectionIcon(): string | null {
        if (!this.sectionSchema) {
            return null; // todo: unknown schema icon
        }
        return this.sectionSchema.icon || null; // todo: schema hasn't icon
    }

    getSectionName(): string {
        if (this.sectionSchema.displayNameProperty) {
            return <string>this.section[this.sectionSchema.displayNameProperty] || this.section.type;
        }
        return this.section.type;
        // return this.getItemName(this.section, this.sectionsSchemas);
    }

    getBlockName(block: SectionModel): string {
        return '';
        // return this.getItemName(block, this.blocksSchemas)
        //     || this.getItemName(block, this.sectionsSchemas);
    }

    onOpenChanged(isOpen: boolean) {
        this.openChanged.emit(isOpen);
    }

    private getItemName(item: SectionModel, schemas: any /* SectionsSchemasList */): string {
        return helpers.getSectionName(item, schemas);
    }

    hasChildren(): boolean {
        return false;
        // return !!this.sectionsSchemas[this.section.type]?.blocks?.length;
    }

    getBlockIcon(block: SectionModel): string | null {
        return null;
        // return this.blocksSchemas[block.type]?.icon || null;
    }

    onVisibleChanged(value: boolean, blockIndex: number | null) {
        this.visibleChanged.emit({ sectionIndex: this.section.__index, blockIndex, value });
    }

    blockDragStarted() {
        console.log('block drag started');
    }

    blockDragCompleted() {
        console.log('block drag released');
    }
}
