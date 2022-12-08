import { Injectable } from '@angular/core';
import { BuilderHttpClient, EvaluatorService, AppConfig } from '@integration/services';
import { Observable } from 'rxjs';
import { ServerRequestDescriptor } from '@models/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: BuilderHttpClient) { }

    doRequest(request: ServerRequestDescriptor | string, context: any, data: any = null, httpServiceOptions: any = null): Observable<any> {
        const serverRequest = this.http.generateRequest(request, data, context);
        return this.http.doRequest(serverRequest, httpServiceOptions);
    }
}
