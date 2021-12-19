import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@editor/editor.module';

import { ConfigEffects, configReducer } from '@app/store';

import {
    // AppConfig,
    RefreshTokenInterceptor
} from '@app/services';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        StoreModule.forRoot({
            config: configReducer
        }),
        EffectsModule.forRoot([ConfigEffects]),
        StoreDevtoolsModule.instrument({
            name: 'Builder',
            maxAge: 25,
            // logOnly: environment.production,
            // actionsBlocklist: [
            //     ...actionsToIgnore
            // ]
        }),

        SharedModule,
        EditorModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor, multi: true
        },
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: (config: AppConfig) =>
        //         () => config.init(),
        //     deps: [AppConfig],
        //     multi: true
        // }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
