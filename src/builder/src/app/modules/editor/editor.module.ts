import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { EditorRoutesModule } from './editor-routes.module';
import { EditorServicesModule } from './editor-services.module';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';

import { EditorFeatureName, editorReducers, EFFECTS } from './store';

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

        StoreModule.forFeature(EditorFeatureName, editorReducers),
        EffectsModule.forFeature(EFFECTS),

        CoreModule,
        SharedModule,

        EditorServicesModule,
        EditorRoutesModule
    ]
})
export class EditorModule { }
