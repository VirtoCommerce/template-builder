import { Injectable } from '@angular/core';
import { BuilderHttpClient, EvaluatorService } from '@integration/services';
import { Observable } from 'rxjs';
import { ServerRequestDescriptor } from '@models/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: BuilderHttpClient, private evaluator: EvaluatorService) { }

    doRequest(request: ServerRequestDescriptor | string, context: any, data: any = null): Observable<any> {
        const targetRequest = this.evaluator.evaluate(request, context);
        const serverRequest = this.http.generateRequest(targetRequest, data);
        return this.http.doRequest(serverRequest);
    }
}
