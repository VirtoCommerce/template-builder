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
        data: { module: 'theme', toolbar: ToolbarHostComponent },
        children: [ { path: 'presets', component: PresetsPanelComponent, data: { module: 'theme', mode: 'presets' } } ]
    }
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
