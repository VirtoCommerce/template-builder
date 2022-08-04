import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

import { EvaluatorService } from '@integration/services';
import { ServerRequestDescriptor, ServerResponseDescriptor } from '@models/http';
import { appHelpers } from '@integration/helpers';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpClient extends HttpClient {

    private _defaultOpts = {
        nullWhenError: true
    };

    private cacheSize = 100;

    private _cache: Map<string, any> = new Map();

    constructor(handler: HttpHandler, private evaluator: EvaluatorService) { super(handler);}

    doRequest<T>(request: ServerRequestDescriptor | null, additionalOptions: any = null, context: any = null): Observable<T | null> {
        if (!request) {
            return of(null);
        }
        const { method, url, body, options } = request;
        const opts = { ...this._defaultOpts, ...additionalOptions};

        if (!url) {
            return of(null);
        }

        let result;

        const cacheKey = JSON.stringify({ method, url, body, options });
        if (this._cache.has(cacheKey)) {
            result = of(this._cache.get(cacheKey));
        } else {
            const uppercaseMethod = method && method.toUpperCase();
            switch (uppercaseMethod) {
                case 'POST':
                    result = super.post<T>(url, body, options);
                    break;
                case 'GET':
                default:
                    result = super.get<T>(url, options);
                    break;
            }
            result = result.pipe(
                tap(x => {
                    if(request.cacheable) {
                        this._cache.set(cacheKey, x);
                    }
                    if (this._cache.size > this.cacheSize) {
                        this._cache.delete(this._cache.keys().next().value);
                    }
                })
            );
        }
        result = result.pipe(
            map(response => {
                return this.mapResponseToResult(response, request.response || null, context);
            })
        );
        if (opts.nullWhenError) {
            result = result.pipe(
                catchError(error => {
                    console.log(error);
                    return of(null);
                })
            );
        }
        return result;
    }

    generateRequest(request: string | ServerRequestDescriptor | null, data: any = null, context: any = null): ServerRequestDescriptor | null {
        if (!request) {
            return null;
        }
        if (typeof request === 'string') {
            return {
                url: this.evaluator.evaluate(request, context || {}),
                method: 'GET',
                body: null,
                options: {
                    responseType: 'json'
                }
            };
        }
        const result = {
            url: this.evaluator.evaluate(request.url, context || {}),
            method: request.method || 'GET',
            body: request.body,
            response: request.response,
            options: {
                responseType: 'json',
                ...request.options
            }
        };

        if (!!request.form) {
            const form = new FormData();
            if (!!request.form.fileName) {
                form.append(request.form.name, data, request.form.fileName);
            } else {
                form.append(request.form.name, data);
            }
            result.body = form;
        } else if (!!data) {
            const form = new FormData();
            if (!!data.fileName) {
                form.append(data.name, data.value, data.fileName);
            } else {
                form.append(data.name, data.value);
            }
            result.body = form;
        }

        return result;
    }

    private mapResponseToResult(response: any, descriptor: ServerResponseDescriptor | null, context: any | null): any {
        if (!descriptor) {
            return response;
        }
        let result = response;
        if (!!result) {
            if (!!descriptor.selector) {
                const script = descriptor.selector;
                result = function(){ return eval(script); }.call({ ...context, response: result }); // todo: maybe here should be some additional data
            }
            if (descriptor.result) {
                result = appHelpers.getValueByPath(result, descriptor.result);
                result = appHelpers.arrayCastByConfig(result, descriptor.isArray);
            }
        }
        if (!result) {
            return result;
        }

        if (descriptor.value && descriptor.value.length) {
            // we need to get value from response
            // result may be array or object
            // response also may be array or object
            // so we need to get value from response by path or by object, where each property is path
            const resultMapper = Array.isArray(result)
                ? (value: any, arrayMapper: any) => (<any[]>value).map(v => arrayMapper(v, descriptor.value))
                : (value: any, elementMapper: any) => elementMapper(value, descriptor.value);
            const itemMapper = (typeof descriptor.value === 'string')
                ? (v: any, d: any) => appHelpers.getValueByPath(v, d)
                : (v: any, d: any) => appHelpers.getItemValue(v, d);

            result = resultMapper(result, itemMapper);

        }
        return result;
    }

}
