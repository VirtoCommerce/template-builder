import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ThemeEditorHostComponent,
    PresetsPanelComponent,
    ToolbarHostComponent
 } from '@theme/components';

// import { AtmsListComponent, AtmsDetailsComponent } from '@atms/pages';
// import { ModulesInfo } from '..';

const routes: Routes = [
    {
        path: '',
        component: ThemeEditorHostComponent,
        data: { mode: 'theme' },
        children: [
            {
                path: 'presets',
                component: PresetsPanelComponent,
                data: { mode: 'presets' }
            },
        ]
    },
    {
        path: '',
        component: ToolbarHostComponent,
        outlet: 'toolbar'
    }
    // {
    //     path: ':id',
    //     component: AtmsDetailsComponent,
    //     data: { mode: ModulesInfo.common.details }
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
export class ThemeRoutesModule { }
