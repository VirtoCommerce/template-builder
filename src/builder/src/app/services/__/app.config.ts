import { Injectable } from '@angular/core';

import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

// import { appHelpers } from '@core/helpers';
import { EnvironmentRef } from '@core/services';
import { HttpWrapper } from '@app/services/__';
import { ApplicationContext, ConfigModel } from '@app/models';

// import { IEditorConfig } from '@editor/di/editor.config';
// import { IThemeConfig } from '@themes/di/theme.config';

@Injectable({
    providedIn: 'root'
})
export class AppConfig /* implements IThemeConfig /*, IEditorConfig  */{

    private context!: ApplicationContext;

    config!: ConfigModel;

    constructor(private http: HttpWrapper, private windowRef: EnvironmentRef) { }

    init(): Promise<any> {

        console.log('init app');
        this.initAppContext();

        const configUrl = this.context.location.params.configUrl || 'data/settings.json';
        return firstValueFrom(
            this.http.get<ConfigModel>(configUrl).pipe(
                tap(config => {
                    console.log('config loaded');
                    this.config = config;
                })
            )
        );
    }

    private initAppContext() {
        const params: any = {};
        const searchParams = new URLSearchParams(this.windowRef.nativeWindow.location.search)
        for (const p of <any>searchParams) {
            const allValues = searchParams.getAll(p[0]);
            params[p[0]] = allValues.length === 1 ? p[1] : allValues;
        }
        const { hash, href, host, protocol, pathname, origin } = this.windowRef.nativeWindow.location;
        const location = {
            url: href, params: params, path: pathname,
            host, protocol, hash, origin
        };
        this.context = {
            location
        };
    }
}
