import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContext, SectionModel, SectionPropertyDescriptor } from '@shared/models';
// import { SectionsSchemasList } from '@editor/models';
import { helpers } from '@editor/services';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

    @Input() section!: SectionModel;
    @Input() descriptors: SectionPropertyDescriptor[] = [];
    @Input() context: ControlContext = {};

    // @Input() sectionsSchemas!: SectionsSchemasList | null;
    // @Input() blocksSchemas!: SectionsSchemasList | null;

    @Output() backClick = new EventEmitter<any>();
    @Output() deleteClick = new EventEmitter<any>();
    @Output() cloneClick = new EventEmitter<any>();
    @Output() sectionChanged = new EventEmitter<SectionModel>();

    constructor() { }

    ngOnInit(): void {
    }

    backButtonClick() {
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

    onDeleteClick(event: MouseEvent) {
        this.deleteClick.emit();
    }

    onCloneClick(event: MouseEvent) {
        this.cloneClick.emit();
    }
    onValueChanged(value: SectionModel) {
        this.sectionChanged.emit(value);
    }
}
