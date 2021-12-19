// import { WindowRef } from '@shared/services';
// import { Injectable } from "@angular/core";
// import { firstValueFrom, Observable } from "rxjs";

// import { ApplicationContext } from '@app/models';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//     providedIn: 'root'
// })
// export class AppConfig {


//     constructor(private windowRef: WindowRef, private http: HttpClient) { }

//     init(): Observable<any> {
//         const configUrl = this.context.location.params.configUrl || 'data/settings.json';
//         return this.loadSettingsFrom(configUrl).pipe(
//             tap()
//         );
//     }

//     private _context: ApplicationContext | null = null;

//     private get context(): ApplicationContext {
//         if (!this._context) {
//             const params: any = {};
//             const searchParams = new URLSearchParams(this.windowRef.nativeWindow.location.search)
//             for (const p of <any>searchParams) {
//                 const allValues = searchParams.getAll(p[0]);
//                 params[p[0]] = allValues.length === 1 ? p[1] : allValues;
//             }
//             const { hash, href, host, protocol, pathname, origin } = this.windowRef.nativeWindow.location;
//             this._context = {
//                 location: {
//                     url: href, params: params, path: pathname,
//                     host, protocol, hash, origin
//                 }
//             };
//         }
//         return this._context;
//     }

//     private loadSettingsFrom(url: string): Observable<any> {
//         this.http.get(url).pipe();
//     }
// }
