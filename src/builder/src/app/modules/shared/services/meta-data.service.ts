import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetaDataService {

    constructor(private titleService: Title) { }

    setTitle(title: string | null) {
        const suffix = 'Template Builder - VirtoCommerce';
        if (!title) {
            this.titleService.setTitle(suffix);
        } else {
            this.titleService.setTitle(`${title} - ${suffix}`);
        }
    }
}
