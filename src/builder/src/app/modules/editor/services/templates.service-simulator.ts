import { appHelpers } from '@core/services';
import { Injectable } from "@angular/core";

import { TemplateModel } from '@editor/models';
import { map, Observable, of } from "rxjs";

// todo: remove it
import catalog from './demo/catalog.json';
import page from './demo/page.json';
import home from './demo/home.json';
import empty from './demo/empty.json';

@Injectable({
    providedIn: 'root'
})
export class TemplatesServiceSimulator {
    // todo: remove this service
    getTemplate(alias: string): Observable<TemplateModel> {
        return of((function () {
            if (alias === 'page')
                return <any>page;
            if (alias === 'home')
                return <any>home;
            if (alias === 'empty')
                return <any>empty;
            return <any>catalog;
        })()).pipe(
            map(template => {
                template.content.forEach((section: any) => {
                    // todo: remove it
                    section.__id = section.__id || appHelpers.generateUniqueString(12)
                });
                return template;
            })
        );
    }
}
