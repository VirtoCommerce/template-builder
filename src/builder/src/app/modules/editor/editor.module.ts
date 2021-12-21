import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';

import { EditorFeatureName, editorReducer, EFFECTS } from './store';

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

        StoreModule.forFeature(EditorFeatureName, editorReducer),
        EffectsModule.forFeature(EFFECTS),

        SharedModule
    ]
})
export class EditorModule { }
