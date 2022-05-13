import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarComponent } from './layout/sidebar/sidebar.component';

const routes: Routes = [
    // todo: default path processed in routing state in shared module.
    // todo: default path probably should be in the builder config
    // {
    //     path: '',
    //     redirectTo: '/pages',
    //     pathMatch: 'full'
    // },
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
        redirectTo: '/pages'
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
