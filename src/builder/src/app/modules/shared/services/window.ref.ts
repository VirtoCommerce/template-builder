import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WindowRef{
    get nativeWindow(): Window & { clipboardData: any } {
        return <any>window;
    }
}
