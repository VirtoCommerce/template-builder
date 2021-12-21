import { TemplateModel } from '@editor/models';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss']
})
export class TemplateEditorComponent implements OnInit {

    @Input() template!: TemplateModel | null;

    @HostBinding('class.inactive')
    @Input() inactive: boolean = false;
    @Output() addSectionClick = new EventEmitter<any>();
    @Output() editItem = new EventEmitter<{ sectionIndex: number, blockIndex: number | null }>();

    constructor() { }

    ngOnInit(): void { }

    addButtonClick() {
        this.addSectionClick.emit();
    }

    onItemClick(sectionIndex: number, blockIndex: number | null) {
        this.editItem.emit({ sectionIndex, blockIndex });
    }

    getTemplateName(): string {
        if (this.template && this.template.settings) {
            return this.template.settings.name;
        }
        return '[no name]';
    }
}
