import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

import { SchemasList } from '@editor/models';

import schemas from './demo/schemas.json';

@Injectable({
    providedIn: 'root'
})
export class SchemasServiceSimulator {
    // todo: remove this service
    getSchemas(): Observable<SchemasList> {
        return of(<SchemasList><any>schemas);
    }
}
