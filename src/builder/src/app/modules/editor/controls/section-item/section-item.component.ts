import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations';

import { ContextMenuAction } from '@core/models';
import { SectionModel, SectionSchema } from '@models/document';
import { ContextMenuHelper } from '@editor/helpers';

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

    constructor(private helper: ContextMenuHelper) { }

    ngOnInit(): void {

    }

    onItemClick() {
        if (!!this.sectionSchema) {
            this.itemClick.emit();
        }
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
        return this.sectionSchema.icon || 'blur_on'; // todo: schema hasn't icon
    }

    getSectionName(): string {
        if (this.sectionSchema?.displayField) {
            return <string>this.section[this.sectionSchema.displayField] || this.section.type;
        }
        return this.section.type;
    }

    getItemActions: () => Promise<ContextMenuAction[]> = () => {
        const result = this.helper.getSectionsActions(this.section, !!this.sectionSchema.blocks?.length);
        return result;
    };
}
