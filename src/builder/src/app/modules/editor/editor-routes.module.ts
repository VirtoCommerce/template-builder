import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    TemplateEditorHostComponent,
    AddSectionComponent,
    EditSectionComponent,
    ToolbarHostComponent
 } from '@editor/components';

// import { AtmsListComponent, AtmsDetailsComponent } from '@atms/pages';
// import { ModulesInfo } from '..';

const routes: Routes = [
    {
        path: '',
        component: TemplateEditorHostComponent,
        data: { module: 'templates', toolbar: ToolbarHostComponent },
        children: [
            {
                path: 'create',
                component: AddSectionComponent,
                data: { module: 'templates', mode: 'create-section' }
            },
            {
                path: 'create/:sectionId',
                component: AddSectionComponent,
                data: { module: 'templates', mode: 'create-block' }
            },
            {
                path: ':sectionId',
                component: EditSectionComponent,
                data: { module: 'templates', mode: 'edit-section' }
            },
            {
                path: ':sectionId/:blockId',
                component: EditSectionComponent,
                data: { module: 'templates', mode: 'edit-block' }
            }
        ]
    },
    // {
    //     path: '',
    //     component: ToolbarHostComponent,
    //     outlet: 'toolbar'
    // }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class EditorRoutesModule { }
