import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...CONTROLS
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
