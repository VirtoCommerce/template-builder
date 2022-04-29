import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

import { SectionsSchemasList } from '@editor/models';

import schemas from './demo/schemas.json';

@Injectable({
    providedIn: 'root'
})
export class SectionsServiceSimulator {
    // todo: remove this service
    getSectionSchemas(): Observable<SectionsSchemasList> {
        return of(<SectionsSchemasList><any>schemas.sections);
    }
}
