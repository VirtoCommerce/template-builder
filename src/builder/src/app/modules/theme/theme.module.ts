import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { COMPONENTS } from './components';

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    exports: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ThemeModule { }
