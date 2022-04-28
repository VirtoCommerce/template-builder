import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';

import { ThemeRoutesModule } from './theme-routes.module';

import { themeReducers, ThemeFeatureName, EFFECTS } from './store';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';

// note: use it to store part of state to local storage
// import { CreateStorageProviders } from '@core/services/state-helpers';
// const stateConfig = CreateStorageProviders<reducer.ThemeState>('Theme', ThemeFeatureName, ['pageSize', 'starredFilters', 'zoom', 'center']);


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
        CoreModule,
        SharedModule,

        EffectsModule.forFeature([...EFFECTS]),
        StoreModule.forFeature(ThemeFeatureName, themeReducers /*, stateConfig.config */),

        ThemeRoutesModule

    ]
})
export class ThemeModule { }
