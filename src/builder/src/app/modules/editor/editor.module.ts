import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';

import { SharedModule } from '@shared/shared.module';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';

@NgModule({
    declarations: [
        ...COMPONENTS,
        ...CONTROLS
    ],
    exports: [
        COMPONENTS
    ],
    imports: [
        CommonModule,
        OverlayModule,
        SharedModule
    ]
})
export class EditorModule { }
