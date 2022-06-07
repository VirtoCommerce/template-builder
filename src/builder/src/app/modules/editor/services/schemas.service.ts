import { Injectable } from "@angular/core";
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppConfig } from '@shared/services';
import { SmartHttpClient } from '@core/services';
import { SchemasList, SectionsSchemasList } from '@editor/models';

@Injectable({
    providedIn: 'root'
})
export class SchemasService {

    constructor(private http: SmartHttpClient) { }

    getSchemas(): Observable<SchemasList> {
        return this.http.get<SchemasList>(AppConfig.sectionsListUrl);
    }
}
