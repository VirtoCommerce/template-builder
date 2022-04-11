import { SectionModel, SectionSchema } from '@shared/models';
import { TemplateModel } from './../../modules/editor/models/template.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    displayEditor = 'template';
    // displayEditor = 'theme-settings';

    constructor() { }

    ngOnInit(): void {
    }
}
