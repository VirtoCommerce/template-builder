import { ServerRequestDescriptor } from '@models/http';
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

    // todo: check comments that it is true!
    private mergedConfig: any = {}; // 'config' in context, properties will be evaluated
    private settings: any = {}; // 'settings' in context, properties will not be evaluated

    constructor(
        private env: EnvironmentRef,
        private cookies: CookieService,
        private evaluator: EvaluatorService) { }

    initConfigWith(config: any) {
        Object.keys(config).forEach(key => {
            this.mergedConfig[key] = config[key];
        });
        this._context = null; // reset context to new values
        for (const property of Object.keys(this.mergedConfig)) {
            Object.defineProperty(this.settings, property, {
                get: () => {
                    return this.evaluator.evaluateProperty(this.mergedConfig, property, this.context);
                }
            });
        }
    }

    getValue(property: OptionName, context: any = null) {
        if (!context) {
            return this.settings[property];
        } else {
            const mergedContext = this.mergeContexts(context);
            return this.evaluator.evaluateProperty(this.mergedConfig, property, mergedContext);
        }
    }

    getContext(): any {
        return this.context;
    }

    private mergeContexts(additionalContext: any) {
        const result = { ...this.context, ...additionalContext };
        Object.defineProperty(result, 'sessionId', {
            get: () => {
                return this.getCurrentSessionId();
            }
        });
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
                settings: this.settings,
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
    | 'settingsDataRequest'
    | 'settingsSchemaRequest'
    | 'saveSettings'
    | 'settingsPath'
    | 'startPreviewPath'
    | 'uploadAssetsRequest'
    | 'fullPreviewUrl';

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


