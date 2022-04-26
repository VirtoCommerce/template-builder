import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SidebarComponent,
        children: [
            {
                path: 'pages',
                loadChildren: () => import('./modules/editor/editor.module').then(m => m.EditorModule)
            },
            {
                path: 'themes',
                loadChildren: () => import('./modules/theme/theme.module').then(m => m.ThemeModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'pages'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            // enableTracing: true // todo: remove enableTracing
        })

    ],
    exports: [RouterModule]
})
export class AppRoutesModule { }
