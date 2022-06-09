import { Component, OnInit } from '@angular/core';
import { TemplateModel, SectionsSchemasList } from '@editor/models';
import { SectionSchema } from '@core/models';

@Component({
    selector: 'app-template-editor-host',
    templateUrl: './template-editor-host.component.html',
    styleUrls: ['./template-editor-host.component.scss']
})
export class TemplateEditorHostComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
