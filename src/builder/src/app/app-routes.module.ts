import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// todo: remove it
import { TemplateEditorHostComponent } from '@editor/components';

const routes: Routes = [
    {
        path: 'pages',
        component: TemplateEditorHostComponent
        // loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule)
    },
    {
        path: 'themes',
        // component: ThemeEditorHostComponent
        loadChildren: () => import('./modules/theme/theme.module').then(m => m.ThemeModule)
    },
    {
        path: '**',
        redirectTo: 'pages'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [RouterModule]
})
export class AppRoutesModule { }
