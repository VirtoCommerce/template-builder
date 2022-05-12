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

    isHover: boolean = false;

    @Input() section!: SectionModel;
    @Input() sectionSchema!: SectionSchema;

    @Output() actionClick = new EventEmitter<string>();
    @Output() itemClick = new EventEmitter();

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

    constructor() { }

    ngOnInit(): void {

    }

    onItemClick() {
        this.itemClick.emit();
    }

    onActionClick(event: ContextMenuAction) {
        if (event !== '|') {
            this.actionClick.emit(event.action);
        }
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
    }

}
