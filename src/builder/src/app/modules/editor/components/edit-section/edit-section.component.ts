import { ControlContext } from './../../../shared/models/control.context';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionModel, BaseControlDescriptor } from '@shared/models';

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

    @Input() section: SectionModel = {
        __id: 'randomid',
        __index: 1,
        name: 'Edit section',
        type: 'headline',
        title: 'Headline',
        content: 'Section content'
    };

    @Input() context: ControlContext = {};
    @Input() descriptors: BaseControlDescriptor[] = [
        {
            id: 'title',
            type: 'string'
        },
        {
            id: 'content',
            type: 'text'
        }
    ];

    @Output() backClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    backButtonClick() {
        this.backClick.emit();
    }

}
