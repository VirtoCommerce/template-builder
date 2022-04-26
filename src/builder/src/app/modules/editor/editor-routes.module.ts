import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    TemplateEditorHostComponent,
    // PresetsPanelComponent,
    ToolbarHostComponent
 } from '@editor/components';

// import { AtmsListComponent, AtmsDetailsComponent } from '@atms/pages';
// import { ModulesInfo } from '..';

const routes: Routes = [
    {
        path: '',
        component: TemplateEditorHostComponent,
        data: { mode: 'templates', toolbar: ToolbarHostComponent },
        children: [
            // {
            //     path: 'presets',
            //     component: PresetsPanelComponent,
            //     data: { mode: 'presets' }
            // },
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
