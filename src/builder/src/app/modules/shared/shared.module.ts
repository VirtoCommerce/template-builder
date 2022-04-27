import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '@core/core.module';

import { COMPONENTS } from './components';

import { SharedEffects } from './store/effects';
import { sharedReducers } from './store/reducers';

const ALL_COMPONENTS = [
    ...COMPONENTS
];

@NgModule({
    declarations: ALL_COMPONENTS,
    exports: ALL_COMPONENTS,
    imports: [
        CommonModule,
        ReactiveFormsModule,

        EffectsModule.forFeature([SharedEffects]),
        StoreModule.forFeature('shared', sharedReducers /*, stateConfig.config */),


        CoreModule
    ]
})
export class SharedModule { }
