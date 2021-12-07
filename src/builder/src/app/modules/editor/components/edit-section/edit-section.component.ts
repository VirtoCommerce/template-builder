import { ControlContext } from './../../../shared/models/control.context';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionModel, SectionPropertyDescriptor } from '@shared/models';

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
    @Input() descriptors: SectionPropertyDescriptor[] = [
        {
            id: 'title',
            label: 'Title',
            type: 'string',
            placeholder: 'Enter title'
        },
        {
            id: 'extendedTitle',
            label: 'Extended title',
            type: 'string',
            multiline: true
        },
        {
            id: 'content',
            type: 'text',
            label: 'Content'
        },
        {
            id: 'singleValue',
            type: 'select'
        },
        {
            id: 'multipleValues',
            type: 'calendar'
        },
        {
            id: 'date',
            type: 'calendar'
        },
        {
            id: 'datetime',
            type: 'calendar'
        },
        {
            id: 'time',
            type: 'calendar'
        },
        {
            id: 'isChecked',
            type: 'checkbox'
        },
        {
            id: 'color',
            type: 'color'
        },
        {
            id: 'singleFile',
            type: 'files'
        },
        {
            id: 'multipleFiles',
            type: 'files'
        },
        {
            id: 'singleImage',
            type: 'images'
        },
        {
            id: 'multipleImages',
            type: 'images'
        },
        {
            id: 'singleInlineImage',
            type: 'images'
        },
        {
            id: 'multipleInlineImages',
            type: 'images'
        },
        {
            id: 'number',
            type: 'number'
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
