import { Component, OnInit } from '@angular/core';
import { TemplateModel, SectionsSchemasList } from '@editor/models';
import { SectionSchema } from '@shared/models';

// todo: remove it
import { SectionsServiceSimulator } from '../../services/sections.service-simulator';
import { TemplateServiceSimulator } from './../../services/template.service-simulator';

@Component({
    selector: 'app-template-editor-host',
    templateUrl: './template-editor-host.component.html',
    styleUrls: ['./template-editor-host.component.scss']
})
export class TemplateEditorHostComponent implements OnInit {

    addMode = false;
    editMode = false;
    context: any = {};

    template!: TemplateModel;
    sectionsSchemas!: SectionsSchemasList;
    sectionsSchemasList!: SectionSchema[];

    blocksSchemas = <any>{
        image: {
            name: 'main image',
            icon: 'article',
            displayNameProperty: 'name'
        },
        text: {
            name: 'Product title',
            icon: 'article',
            displayNameProperty: 'name'
        }
    };

    constructor(
        private templates: TemplateServiceSimulator,
        private sections: SectionsServiceSimulator
    ) {
        // todo: remove it
        this.template = this.templates.getTemplate();
        this.sectionsSchemas = this.sections.getSectionSchemas();
    }

    ngOnInit(): void {
        // todo: must be on sectionsSchemas setter / or selector
        this.sectionsSchemasList = Object.keys(this.sectionsSchemas).map(x => ({ ...this.sectionsSchemas[x], type: x }));
    }


    addButtonClick() {
        this.addMode = true;
    }

    // addBlockClick(sectionId: number) {
    //     this.addMode = true;
    // }

    onItemClick() {
        this.editMode = true;
    }

    closePanels() {
        this.addMode = false;
        this.editMode = false;
    }
}
