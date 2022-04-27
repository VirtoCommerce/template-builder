import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutesModule } from './app-routes.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { EditorModule } from '@editor/editor.module';
import { ThemeModule } from '@theme/theme.module';
import { EDITOR_SERVICE } from '@editor/di';

import { PlatformService } from '@app/services';
import { AppEffects } from '@app/store';
import { initialState as initialRoute } from '@shared/routing';
import { RoutingEffects } from '@shared/routing/effects';
import { RouterSerializer } from '@shared/routing/serializer';

import {
    AppConfig,
    RefreshTokenInterceptor
} from '@app/services';

import { AppComponent } from './app.component';
import { LAYOUT_COMPONENTS } from './layout';
import { APP_COMPONENTS } from './components';

@NgModule({
    declarations: [
        AppComponent,
        ...LAYOUT_COMPONENTS,
        ...APP_COMPONENTS
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        AppRoutesModule,

        StoreModule.forRoot({
            router: routerReducer
            // config: configReducer
        }, {
            initialState: {
                router: initialRoute
            }
        }),
        StoreRouterConnectingModule.forRoot({
            serializer: RouterSerializer
        }),
        EffectsModule.forRoot(
            [AppEffects, RoutingEffects]
        ),
        StoreDevtoolsModule.instrument({
            name: 'Builder',
            maxAge: 25,
            // logOnly: environment.production,
            // actionsBlocklist: [
            //     ...actionsToIgnore
            // ]
        }),

        CoreModule,
        SharedModule,
        EditorModule,
        ThemeModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptor, multi: true
        },
        { provide: EDITOR_SERVICE, useClass: PlatformService },
        {
            provide: APP_INITIALIZER,
            useFactory: (config: AppConfig) =>
                () => config.init(),
            deps: [AppConfig],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
