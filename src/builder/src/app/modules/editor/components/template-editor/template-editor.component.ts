import { TemplateModel } from '@editor/models';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {

    @Input() template!: TemplateModel;

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

    getTemplateName(): string {
        if (this.template && this.template.settings) {
            return this.template.settings.name;
        }
        return '[no name]';
    }
}
