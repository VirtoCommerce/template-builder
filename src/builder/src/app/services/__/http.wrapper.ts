import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RequestDescriptor, ResponseDescriptor, ValueDescriptorModel } from '@app/models';
import { appHelpers } from '@core/helpers';

@Injectable({
    providedIn: 'root'
})
export class HttpWrapper {

    constructor(private http: HttpClient) { }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }

    sendRequest<T>(request: RequestDescriptor): Observable<T> {
        if (!request) {
            return of(<any>null);
        }
        const { method, url, body, options } = request;

        if (!url) {
            return of(<any>null);
        }

        let result;

        const uppercaseMethod = method && method.toUpperCase();
        switch (uppercaseMethod) {
            case 'POST':
                result = this.http.post<T>(url, body, options);
                break;
            case 'GET':
            default:
                result = this.http.get<T>(url, options);
                break;
        }
        return result.pipe(
            map(response => {
                return this.mapResponseToResult(response, <ResponseDescriptor>request.response);
            }),
            catchError(error => {
                return of(<any>null);
            })
        );
    }

    generateRequest(request: string | RequestDescriptor, data: any = null): RequestDescriptor {
        if (!request) {
            return <any>null;
        }
        if (typeof request === 'string') {
            return {
                url: request,
                method: 'GET',
                body: null,
                options: {
                    responseType: 'json'
                }
            };
        }
        const result = {
            url: request.url,
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

    private mapResponseToResult(response: any, descriptor: ResponseDescriptor): any {
        if (!descriptor) {
            return response;
        }
        let result = response;
        if (!!result) {
            if (descriptor.result) {
                result = appHelpers.getValueByPath(result, descriptor.result);
                result = this.arrayCastByConfig(result, descriptor.isArray);
            }
        }
        if (!result) {
            return result;
        }

        if (descriptor.value && descriptor.value.length) {
            // todo: refactor this!
            const resultMapper = Array.isArray(result)
                ? (value: any[], arrayMapper: (s: any, t: any) => any) => (<any[]>value).map(v => arrayMapper(v, descriptor.value))
                : (value: any, elementMapper: (s: any, t: any) => any) => elementMapper(value, descriptor.value);
            const itemMapper = (typeof descriptor.value === 'string')
                ? (v: any, d: string) => appHelpers.getValueByPath(v, d)
                : (v: any, d: any) => this.getItemValue(v, d);

            result = resultMapper(result, itemMapper);

        }
        return result;
    }

    private getItemValue(item: any, descriptor: (string | ValueDescriptorModel)[]): any {
        const result: any = {};
        descriptor.forEach(p => {
            const [query, property, isArray] = typeof p === 'string' ? [p, p, null] : [p.query, p.key, p.isArray];
            const x = appHelpers.getValueByPath(item, query);
            result[property] = this.arrayCastByConfig(x, isArray);
        });
        return result;
    }

    private arrayCastByConfig(item: any, isArray: boolean | null = null): any {
        if (isArray === null) {
            return item;
        }
        if (Array.isArray(item) && !isArray) {
            if (item.length > 0) {
                return item[0];
            } else {
                return null;
            }
        } else if (!Array.isArray(item) && isArray) {
            return [item];
        }
        return item;
    }
}
