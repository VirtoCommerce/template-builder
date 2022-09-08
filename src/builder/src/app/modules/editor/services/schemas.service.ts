import { Injectable } from "@angular/core";
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '@integration/services';
import { BuilderHttpClient } from '@integration/services';
import { SchemasList, SectionsSchemasList } from '@editor/models';

@Injectable({
    providedIn: 'root'
})
export class SchemasService {

    constructor(private http: BuilderHttpClient, private appConfig: AppConfig) { }

    getSchemas(): Observable<SchemasList | null> {
        const sectionsListUrl = this.appConfig.getValue('sectionsListUrl');
        const request = this.http.generateRequest(sectionsListUrl);
        return this.http.doRequest<SchemasList>(request);
    }
}
