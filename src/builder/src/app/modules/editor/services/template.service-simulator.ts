import { Injectable } from "@angular/core";

import { TemplateModel } from '@editor/models';
import { Observable, of } from "rxjs";

// todo: remove it
import catalog from './demo/catalog.json';
import page from './demo/page.json';

@Injectable({
    providedIn: 'root'
})
export class TemplateServiceSimulator {
    // todo: remove this service
    getTemplate(alias: string): Observable<TemplateModel> {
        return of((function () {
            if (alias === 'page')
                return <any>page;
            return <any>catalog;
        })());
    }
}
