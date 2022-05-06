import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    TemplateEditorHostComponent,
    AddSectionComponent,
    EditSectionComponent,
    ToolbarHostComponent
 } from '@editor/components';

// import { AtmsListComponent, AtmsDetailsComponent } from '@atms/pages';
import { ModuleInfo } from './module.info';

const routes: Routes = [
    {
        path: '',
        component: TemplateEditorHostComponent,
        data: { module: ModuleInfo.name, toolbar: ToolbarHostComponent },
        children: [
            {
                path: 'add',
                component: AddSectionComponent,
                data: { module: ModuleInfo.name, mode: 'add-section' }
            },
            {
                path: 'add/:sectionId',
                component: AddSectionComponent,
                data: { module: ModuleInfo.name, mode: 'add-block' }
            },
            {
                path: ':sectionId',
                component: EditSectionComponent,
                data: { module: ModuleInfo.name, mode: 'edit-section' }
            },
            {
                path: ':sectionId/:blockId',
                component: EditSectionComponent,
                data: { module: ModuleInfo.name, mode: 'edit-block' }
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
