import { Injectable } from '@angular/core';
import { BuilderHttpClient, EvaluatorService } from '@integration/services';
import { Observable } from 'rxjs';
import { ServerRequestDescriptor } from '@models/http';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: BuilderHttpClient, private evaluator: EvaluatorService) { }

    getData(request: ServerRequestDescriptor, context: any): Observable<any> {
        const targetRequest = this.evaluator.evaluate(request, context);
        return this.http.doRequest(targetRequest);
    }
}
