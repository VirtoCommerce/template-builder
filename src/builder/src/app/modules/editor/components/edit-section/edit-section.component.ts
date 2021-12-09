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
        content: 'Section content',
        color: '#43ebaa'
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
            type: 'select',
            label: 'Select value',
            placeholder: 'Please select value',
            options: [
                { label: '[none]' },
                { label: 'First', value: 'first' },
                { label: 'Second', value: 'second' },
                { label: 'Third', value: 'third' },
                { label: 'Fourth', value: 'fourth' }
            ]
        },
        {
            id: 'valueInGroup',
            type: 'select',
            label: 'Select value (group)',
            options: [
                { label: '[none]' },
                { label: 'First', value: 'first', group: 'Units' },
                { label: 'Second', value: 'second', group: 'Units' },
                { label: 'Third', value: 'third', group: 'Units' },
                { label: 'Fourth', value: 'fourth', group: 'Units' },
                { label: 'First ten', value: 10, group: 'Dozens' },
                { label: 'Second dozen', value: 20, group: 'Dozens' },
                { label: 'Third dozen', value: 30, group: 'Dozens' },
                { label: 'Fourth dozen', value: 40, group: 'Dozens' }
            ]
        },
        {
            id: 'multipleValues',
            type: 'select',
            label: 'Select values',
            multiple: true,
            options: [
                { label: 'First', value: { id: 1, name: 'first' } },
                { label: 'Second', value: { id: 2, name: 'second' } },
                { label: 'Third', value: { id: 3, name: 'third' } },
                { label: 'Fourth', value: { id: 4, name: 'fourth' } }
            ]
        },
        {
            id: 'date',
            type: 'calendar',
            label: 'Choose a date'
        },
        {
            id: 'datetime',
            type: 'calendar',
            label: 'Choose a date and time',
            mode: 'datetime',
            showAmPm: true
        },
        {
            id: 'time',
            type: 'calendar',
            label: 'Choose a time',
            mode: 'time',
            showSeconds: true
        },
        {
            id: 'isChecked',
            type: 'checkbox',
            label: 'Check item'
        },
        {
            id: 'color',
            type: 'color',
            label: 'Choose color'
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
