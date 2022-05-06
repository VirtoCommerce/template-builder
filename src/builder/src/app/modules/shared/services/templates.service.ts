import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { TemplateEntryList } from '@shared/models';

@Injectable({
    providedIn: 'root'
})
export class TemplatesService {
    getTemplatesList(): Observable<TemplateEntryList> {
        return of({
            'home': <any>{
                name: 'Home',
                previewUrl: 'https://st-storefront.dev.govirto.com',
                isDefault: true,
                sections: ["products-list", "latest-news", "text", "video", "images", "share", 'carousel', 'cards', 'promo'],
                settings: [
                    {
                        id: "displayType",
                        label: "Default display type",
                        type: "select",
                        default: "table",
                        options: [
                            {
                                "value": "grid",
                                "label": "Grid"
                            },
                            {
                                "value": "table",
                                "label": "Table"
                            }
                        ]
                    }
                ]
            },
            'catalog': <any>{
                name: 'Catalog',
                previewUrl: 'https://st-storefront.dev.govirto.com/c'
            },
            'product': <any>{
                name: 'Product',
                previewUrl: 'https://st-storefront.dev.govirto.com/p/baa4931161214690ad51c50787b1ed94'
            },
            'cart': <any>{
                name: 'Cart',
                previewUrl: 'https://st-storefront.dev.govirto.com/checkout'
            },
            'page': <any>{
                name: 'Page',
                previewUrl: 'https://st-storefront.dev.govirto.com'
            },
            'empty': <any>{
                name: 'Empty page',
                previewUrl: 'https://st-storefront.dev.govirto.com'
            }
        });
    }
}
