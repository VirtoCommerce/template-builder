import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations';

import { ContextMenuAction } from '@core/models';
import { SectionModel, SectionSchema } from '@models/document';
import { ContextMenuHelper, helpers } from '@editor/helpers';

@Component({
    selector: 'app-section-item',
    templateUrl: './section-item.component.html',
    styleUrls: ['./section-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    isIconHover: boolean = false;

    @Input() section!: SectionModel;
    @Input() sectionSchema!: SectionSchema;
    @Input() hasContextMenu: boolean = false;
    @Input() selectable: boolean = true;
    @Input() selected: boolean = false;

    @Output() actionClick = new EventEmitter<string>();
    @Output() itemClick = new EventEmitter();
    @Output() itemHover = new EventEmitter();
    @Output() itemSelectChanged = new EventEmitter();

    get displayCheckbox(): boolean {
        return (this.isIconHover && this.selectable) || this.selected;
    }

    constructor(private helper: ContextMenuHelper) { }

    ngOnInit(): void {

    }

    onItemClick(event: MouseEvent) {
        if (!!this.sectionSchema) {
            this.itemClick.emit();
        }
    }

    onCheckboxClick(event: MouseEvent) {
        event.stopPropagation();
    }

    onCheckboxValueChanged(value: boolean) {
        this.itemSelectChanged.emit(value);
    }

    onActionClick(event: ContextMenuAction) {
        if (event !== '|') {
            this.actionClick.emit(event.action);
        }
    }

    onItemHover() {
        this.itemHover.emit();
    }

    getSectionIcon(): string | null {
        if (!this.sectionSchema) {
            return null; // todo: unknown schema icon
        }
        return this.sectionSchema.icon || 'blur_on'; // todo: schema hasn't icon
    }

    getSectionName(): string {
        return helpers.getSectionName(this.section, this.sectionSchema);
        // if (this.sectionSchema?.displayField) {
        //     return <string>this.section[this.sectionSchema.displayField] || <string>this.section['name'] || this.section.type;
        // }
        // return <string>this.section['name'] || this.section.type;
    }

    getItemActions: () => Promise<ContextMenuAction[]> = () => {
        const result = this.helper.getSectionsActions(this.section, !!this.sectionSchema?.blocks?.length);
        return result;
    };
}
