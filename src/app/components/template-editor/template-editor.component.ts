import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {

    @Input() template = {
        name: 'Homepage',
        sections: [
            {
                name: 'Cover with image',
                icon: 'blocks',
                blocks: [
                    { name: 'Image', icon: 'image' },
                    { name: 'text', icon: 'text' }
                ]
            },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' },
            { name: 'Cover with variations', icon: 'blocks' }
        ]
    };

    @HostBinding('class.inactive')
    @Input() inactive: boolean = false;
    @Output() addSectionClick = new EventEmitter<any>();
    @Output() editItem = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void { }

    addButtonClick() {
        this.addSectionClick.emit();
    }

    onItemClick() {
        this.editItem.emit();
    }

}
