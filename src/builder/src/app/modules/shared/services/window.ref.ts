import { LocationContext } from '@shared/models';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WindowRef {
    get nativeWindow(): Window & { clipboardData: any } {
        return <any>window;
    }

    getLocationContext(): LocationContext {
        const params: any = {};
        const searchParams = new URLSearchParams(this.nativeWindow.location.search)
        for (const p of <any>searchParams) {
            const allValues = searchParams.getAll(p[0]);
            params[p[0]] = allValues.length === 1 ? p[1] : allValues;
        }
        const { hash, href, host, protocol, pathname, origin } = this.nativeWindow.location;
        const location = {
            url: href, params: params, path: pathname,
            host, protocol, hash, origin
        };
        return location;
    }
}
