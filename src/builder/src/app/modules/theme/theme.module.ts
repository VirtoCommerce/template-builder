import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import { ThemeRoutesModule } from './theme-routes.module';

// import { ThemeFeatureName } from './store/selectors';
// import { EFFECTS } from './store/effects';
import { themeReducers } from './store';

import { COMPONENTS } from './components';
import { CONTROLS } from './controls';
import { ThemeDataEffects } from './store/data/effects';
import { ThemeDomainEffects } from './store/domain/effects';

// note: use it to store part of state to local storage
// import { CreateStorageProviders } from '@shared/services/state-helpers';
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
        SharedModule,

        EffectsModule.forFeature([ThemeDataEffects, ThemeDomainEffects]),
        // StoreModule.forFeature(ThemeFeatureName, themeReducers /*, stateConfig.config */),
        StoreModule.forFeature('themeEditor', themeReducers /*, stateConfig.config */),

        ThemeRoutesModule

    ]
})
export class ThemeModule { }
