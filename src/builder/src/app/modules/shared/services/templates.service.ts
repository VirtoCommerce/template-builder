import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { TemplateEntryList } from '@shared/models';

import home from './demo/home.json';
import catalog from './demo/catalog.json';
import product from './demo/product.json';
import cart from './demo/cart.json';
import page from './demo/page.json';
import empty from './demo/empty.json';
import wrong from './demo/wrong.json';
import notFound from './demo/404.json';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {
    getTemplatesList(): Observable<TemplateEntryList> {
        return of({
            'home': <any>home,
            'catalog': <any>catalog,
            'product': <any>product,
            'cart': <any>cart,
            'page': <any>page,
            'empty': <any>empty,
            'wrong': <any>wrong,
            '404': <any>notFound
        });
    }
}
