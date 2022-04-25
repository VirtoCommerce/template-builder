import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '@core/core.module';

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
        DragDropModule,

        StoreModule.forFeature(EditorFeatureName, editorReducer),
        EffectsModule.forFeature(EFFECTS),

        CoreModule
    ]
})
export class EditorModule { }
