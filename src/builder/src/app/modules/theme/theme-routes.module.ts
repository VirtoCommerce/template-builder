import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemeEditorHostComponent, PresetsPanelComponent } from '@theme/components';

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
