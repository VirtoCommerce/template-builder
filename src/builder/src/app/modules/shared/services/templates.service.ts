import { TemplateEntry } from '@shared/models';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {
    getTemplatesList(): Observable<TemplateEntry[]> {
        return of([
            {
                name: 'Catalog',
                alias: 'catalog',
                hasChildren: false
            },
            {
                name: 'Product',
                alias: 'product',
                hasChildren: false
            },
            {
                name: 'Cart',
                alias: 'cart',
                hasChildren: false
            },
            {
                name: 'Page',
                alias: 'page',
                hasChildren: true
            }
        ]);
    }
}
