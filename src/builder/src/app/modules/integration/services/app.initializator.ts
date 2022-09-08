import { ServerRequestDescriptor } from '@models/http';
import { Injectable } from '@angular/core';

import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { BuilderHttpClient } from './builder-http.client';
import { AppConfig } from './app.config';
import { DefaultConfig } from './app.default-config';

@Injectable({
    providedIn: 'root'
})
export class AppInitializator {

    constructor(
        private config: AppConfig,
        private http: BuilderHttpClient) { }

    init(): Promise<any> {
        // todo: dangerous! check that this is security
        const configUrl = this.config.getContext().location.params.configUrl || 'data/settings.json';
        return firstValueFrom(this.loadSettingsFrom(configUrl).pipe(
            tap(result => {
                this.config.initConfigWith(result);
            })
        ));
    }

    private loadSettingsFrom(url: string | ServerRequestDescriptor | ServerRequestDescriptor[], context: any = null): Observable<any> {
        const request = this.http.generateRequest(url, null, { ...this.config.getContext(), settings: context }); // should context be as settings?
        return this.http.doRequest(request).pipe(
            switchMap(config => this.initConfigProperties(config).pipe(
                switchMap(c => {
                    if (c.ref) {
                        return this.loadSettingsFrom(c.ref, c);
                    }
                    return of(c);
                })
            )),
            catchError(() => of(DefaultConfig)), // todo: not sure that it should be default config
        );
    }

    private initConfigProperties(config: any): Observable<any> {
        const keys = Object.keys(config).filter(x => config[x] && typeof config[x] === 'object' && config[x].init);
        if (keys.length > 0) {
            return this.initConfigProperty(config, keys.shift(), keys);
        }
        return of(config);
    }

    private initConfigProperty(config: any, key: string | undefined, tail: string[]): Observable<any> {
        if (key === undefined) {
            return of(config);
        }
        let requestDescriptor = config[key];
        const fallbackValue = requestDescriptor.fallbackValue || null;
        const initProperty = requestDescriptor.init;
        if (initProperty !== true) {
            requestDescriptor = requestDescriptor[initProperty];
        }
        const requests = this.http.generateRequest(requestDescriptor, null, { ...this.config.getContext(), settings: config });
        return this.http.doRequest(requests).pipe(
            tap(result => {
                config[key] = !result ? fallbackValue : result;
            }),
            catchError(error => {
                console.log(error);
                config[key] = null;
                return of(config);
            }),
            switchMap(() => this.initConfigProperty(config, tail.shift(), tail))
        );
    }
}
