import { Injectable } from "@angular/core";

import { TemplateModel } from '@editor/models';
import { map, Observable, of } from "rxjs";

import * as appHelpers from './editor.helpers';

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
                const ids = <{ [key: string]: boolean }>{};
                template.content.forEach((section: any) => {
                    // todo: remove it
                    if (ids[section.id]) {
                        section.id = null;
                    }
                    section.id = appHelpers.generateSectionId(section);
                    ids[section.id] = true;

                    section.blocks?.forEach((block: any) => {
                        if (ids[block.id]) {
                            block.id = null;
                        }
                        block.id = appHelpers.generateSectionId(block);
                        ids[block.id] = true;
                    });
                });
                return template;
            })
        );
    }
}
