import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { TemplateEntryList } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {
    getTemplatesList(): Observable<TemplateEntryList> {
        return of({
            'catalog': <any>{
                name: 'Catalog'
            },
            'product': <any>{
                name: 'Product'
            },
            'cart': <any>{
                name: 'Cart'
            },
            'page': <any>{
                name: 'Page'
            }
        });
    }
}
