import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContextMenuAction, ControlContext, SectionModel, SectionPropertyDescriptor, SectionSchema } from '@shared/models';
// import { SectionsSchemasList } from '@editor/models';
import { helpers } from '@editor/services';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() descriptors!: SectionSchema;
    @Input() context: ControlContext = {};

    // @Input() sectionsSchemas!: SectionsSchemasList | null;
    // @Input() blocksSchemas!: SectionsSchemasList | null;

    @Output() backClick = new EventEmitter<any>();
    // @Output() deleteClick = new EventEmitter<any>();
    // @Output() cloneClick = new EventEmitter<any>();
    // @Output() sectionChanged = new EventEmitter<SectionModel>();

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

    ngOnInit(): void { }

    onBackClick() {
        this.backClick.emit();
    }

    getTitle(): string {
        return '';
        // if (!!this.sectionsSchemas) {
        //     if (!!this.blocksSchemas) {
        //         return helpers.getSectionName(this.section, this.blocksSchemas)
        //             || helpers.getSectionName(this.section, this.sectionsSchemas);
        //     }
        //     return helpers.getSectionName(this.section, this.sectionsSchemas!);
        // }
        // return this.section.type;
    }

    // onDeleteClick(event: MouseEvent) {
    //     this.deleteClick.emit();
    // }

    // onCloneClick(event: MouseEvent) {
    //     this.cloneClick.emit();
    // }
    // onValueChanged(value: SectionModel) {
    //     this.sectionChanged.emit(value);
    // }
}
