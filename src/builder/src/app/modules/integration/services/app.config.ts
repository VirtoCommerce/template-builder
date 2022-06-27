import { Injectable } from '@angular/core';

import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

import { appHelpers } from '../helpers';

import { EnvironmentRef } from './environment.ref';
import { EvaluatorService } from './evaluator.service';
import { BuilderHttpClient } from './builder-http.client';

@Injectable({
    providedIn: 'root'
})
export class AppConfig {

    private readonly SESSION_ID = 'sessionId';
    private _context: any = null;

    private defaultConfig = {
        baseThemeName: 'default',
        themeName: 'default',
        waitPreviewResponseTimeout: 120000
    };

    private mergedConfig: any = {};
    private config: any = {};
    // get filename(): string {
    //     const result = this.evaluator.evaluateProperty(this.mergedConfig, 'filePath');
    //     if (result.indexOf('/') === -1) {
    //         return result;
    //     }
    //     return result.substr(result.lastIndexOf('/') + 1);
    // }
    // get filepath(): string {
    //     const result = this.evaluateProperty('filePath');
    //     if (result.indexOf('/') === -1) {
    //         return '/';
    //     }
    //     return result.substr(0, result.lastIndexOf('/') + 1);
    // }

    constructor(
        private env: EnvironmentRef,
        private cookies: CookieService,
        private http: BuilderHttpClient,
        private evaluator: EvaluatorService) { }

    private _hasBaseTheme: boolean | null = null;
    get hasBaseTheme(): boolean {
        if (this._hasBaseTheme === null) {
            return this.config.baseThemeName !== this.config.themeName;
        }
        return this._hasBaseTheme;
    }
    set hasBaseTheme(value: boolean) {
        this._hasBaseTheme = !!value;
    }

    get hasPage(): boolean {
        return true;
    }
    get contentType(): string {
        return this.config.contentType;
    }

    get readonlyMode(): boolean {
        const result = !this.getValue('saveTemplates');
        return result;
    }

    init(): Promise<any> {
        const configUrl = this.context.location.params.configUrl || 'data/settings.json';
        // todo: catch exceptions for each property
        this.mergedConfig = { ...this.defaultConfig };
        return firstValueFrom(this.loadSettingsFrom(configUrl).pipe(
            tap(result => {
                Object.keys(result).forEach(key => {
                    this.mergedConfig[key] = result[key];
                });
                this._context = null; // reset context to new values
                for (const property of Object.keys(this.mergedConfig)) {
                    Object.defineProperty(this.config, property, {
                        get: () => {
                            return this.evaluator.evaluateProperty(this.mergedConfig, property, this.context);
                        }
                    });
                }
            })
        ));
    }

    private loadSettingsFrom(url: string): Observable<any> {
        return this.http.get<any>(url).pipe(
            switchMap(config => this.initConfigProperties(config).pipe(
                switchMap(c => {
                    if (c.ref) {
                        return this.loadSettingsFrom(this.evaluator.evaluate(c.ref, this.context));
                    }
                    return of(c);
                })
            )),
            catchError(() => of(this.defaultConfig)),
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
        const request = this.evaluator.evaluate(config[key], config);
        if (!request) {
            console.error(config, key);
            if (tail.length > 0) {
                return this.initConfigProperty(config, tail.shift(), tail);
            }
            return of(config);
        }
        return this.http.doRequest(request).pipe(
            tap(result => {
                config[key] = result;
            }),
            catchError(error => {
                console.log(error);
                config[key] = null;
                return of(config);
            }),
            switchMap(() => tail.length > 0
                ? this.initConfigProperty(config, tail.shift(), tail)
                : of(config))
        );
    }

    getValue(property: OptionName, context: any = null) {
        if (!context) {
            return this.config[property];
        } else {
            const mergedContext = this.mergeContexts(context);
            return this.evaluator.evaluateProperty(this.mergedConfig, property, mergedContext);
        }
    }

    // evaluate(obj: any, context: any): any {
    //     return this.evaluateObject(obj, context);
    // }

    // private evaluateProperty(propertyName: string, context: any = null): any {
    //     const propertyValue = this.mergedConfig[propertyName];
    //     return this.evaluateObject(propertyValue, context);
    // }

    // private evaluateObject(value: any, additionalContext: any = null): any {
    //     if (!value && value !== false && value !== 0 && value !== '') {
    //         return null;
    //     }
    //     if (typeof value === 'string') {
    //         const context = this.mergeContexts(additionalContext);
    //         const result = appHelpers.template(value, context);
    //         return result;
    //     } else {
    //         if (Array.isArray(value)) {
    //             // todo: not tested
    //             const result = value.map(v => this.evaluateObject(v, additionalContext));
    //             return result;
    //         }
    //         if (typeof value === 'object') {
    //             const result: any = {};
    //             for (const key of Object.keys(value)) {
    //                 result[key] = this.evaluateObject(value[key], additionalContext);
    //             }
    //             return result;
    //         }
    //         return value;
    //     }
    // }

    private mergeContexts(additionalContext: any) {
        const result = { ...this.context, ...additionalContext };
        Object.defineProperty(result, 'sessionId', {
            get: () => {
                return this.getCurrentSessionId();
            }
        });
        // Object.defineProperty(result, 'pageFilename', {
        //     get: () => {
        //         return this.filename;
        //     }
        // });
        // Object.defineProperty(result, 'pageFilepath', {
        //     get: () => {
        //         return this.filepath;
        //     }
        // });
        return result;
    }

    private get context(): any {
        if (!this._context) {
            const params: any = {};
            const searchParams = new URLSearchParams(this.env.nativeWindow.location.search);
            for (const p of <any>searchParams) {
                const allValues = searchParams.getAll(p[0]);
                params[p[0]] = allValues.length === 1 ? p[1] : allValues;
            }
            const { hash, href, host, protocol, pathname, origin } = this.env.nativeWindow.location;
            this._context = {
                config: this.mergedConfig,
                settings: this.config,
                location: {
                    url: href, params: params, path: pathname,
                    host, protocol, hash, origin
                }
            };
        }
        return this._context;
    }

    getCurrentSessionId(): string {
        const result = this.cookies.check(this.SESSION_ID)
            ? this.cookies.get(this.SESSION_ID)
            : this.generatePrefixAndSetCookie();
        return result;
    }

    private generatePrefixAndSetCookie(): string {
        const result = appHelpers.generateUniqueString(10);
        this.cookies.set(this.SESSION_ID, result);
        return result;
    }
}

export type OptionName = 'templatesListUrl'
    | 'sectionsListUrl'
    | 'templateUrl'
    | 'saveTemplates'
    | 'settingsDataUrl'
    | 'settingsSchemaUrl'
    | 'saveSettings'
    | 'settingsPath'
    | 'defaultPreviewUrl';

// 'fullPreviewUrl'
//     | 'waitPreviewResponseTimeout'
//     | 'pageRequest'
//     | 'blocksSettingsRequest'
//     | 'settingsSchemaRequest'
//     | 'settingsDataRequest'
//     | 'uploadThemeDraftRequest'
//     | 'uploadThemeSettingsRequest'
//     | 'uploadPageRequest'
//     | 'uploadAssetsRequest'
//     | 'filePath'
//     | 'themeThumbUrl'
//     | 'assetsUrlTemplate'
//     | 'version'
//     | 'hasPage'
//     | 'links'
//     | 'onPageChanged'
//     | 'onThemeChanged'
//     | 'onThemeDraftChanged';


