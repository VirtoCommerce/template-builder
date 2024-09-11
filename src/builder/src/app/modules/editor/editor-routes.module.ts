import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    TemplateEditorHostComponent,
    AddSectionComponent,
    EditSectionComponent,
    ToolbarHostComponent
 } from '@editor/components';

// import { AtmsListComponent, AtmsDetailsComponent } from '@atms/pages';
import { EditorModuleInfo } from '@models/modules';

const routes: Routes = [
    {
        path: '',
        component: TemplateEditorHostComponent,
        data: { module: EditorModuleInfo.name, toolbar: ToolbarHostComponent },
        children: [
            {
                path: 'add/:insertIndex',
                component: AddSectionComponent,
                data: { module: EditorModuleInfo.name, mode: 'add-section' }
            },
            {
                path: 'add/:sectionId/:insertIndex',
                component: AddSectionComponent,
                data: { module: EditorModuleInfo.name, mode: 'add-block' }
            },
            {
                path: 'settings',
                component: EditSectionComponent,
                data: { module: EditorModuleInfo.name, mode: EditorModuleInfo.mode.editSettings /* used in routing selectors */ }
            },
            {
                path: 'settings/:settingsType',
                component: EditSectionComponent,
                data: { module: EditorModuleInfo.name, mode: EditorModuleInfo.mode.editSettings /* used in routing selectors */ }
            },
            {
                path: ':sectionId',
                component: EditSectionComponent,
                data: { module: EditorModuleInfo.name, mode: 'edit-section' }
            },
            {
                path: ':sectionId/:blockId',
                component: EditSectionComponent,
                data: { module: EditorModuleInfo.name, mode: 'edit-block' }
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
