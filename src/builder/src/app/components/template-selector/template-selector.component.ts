import { MultipageSelectDescriptor } from '@core/models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { /* PageModelDescriptor, */ TemplateSchema } from '@editor/models';
import { TemplatesSchemasList } from '@app/models';

import { helpers } from '@editor/services';

@Component({
    selector: 'app-template-selector',
    templateUrl: './template-selector.component.html',
    styleUrls: ['./template-selector.component.scss']
})
export class TemplateSelectorComponent implements OnInit {

    templates: TemplatesSchemasList = {
        'catalog': <any>{
            name: 'Catalog',
            icon: ''
        },
        'cart': <any>{
            name: 'Cart',
            icon: 'cart'
        },
        'page': <any>{
            name: 'Page',
            icon: 'home'
        }
    };

    get items(): MultipageSelectDescriptor[] {
        return Object.keys(this.templates).map(key => ({
            title: this.templates[key].name,
            icon: this.templates[key].icon,
            hasChildren: this.templates[key].name === 'Page'
        }));
    }

    // private _currentTemplateName: string | null = null;

    // pagesFilter: string = '';
    // templatesFilter: string = '';
    // isOpen = false;
    // displayPages = false;

    // @Input() templates!: TemplatesSchemasList;
    // @Input() pages: any[] = [
    //     {
    //         name: 'Homepage',
    //         filename: ''
    //     },
    //     {
    //         name: 'About',
    //         filename: ''
    //     },
    // ];
    // @Input() get currentTemplateName(): string {
    //     return this._currentTemplateName || 'Select template';
    // }

    // set currentTemplateName(value: string | null) {
    //     this._currentTemplateName = value;
    // }

    // @Output() templateSelected = new EventEmitter<string>();
    // @Output() pageSelected = new EventEmitter<string>();

    // get filteredTemplates(): TemplatesSchemasList | null {
    //     return !this.templatesFilter || !this.templates
    //         ? this.templates
    //         : Object.keys(this.templates)
    //             .filter(key => this.getTemplateName(this.templates[key], key)
    //                             .toUpperCase()
    //                             .indexOf(this.templatesFilter.toUpperCase()) !== -1
    //             ).reduce((acc, key) => ({...acc, [key]: this.templates[key]}), {});
    // }

    // get filteredPages(): any[] {
    //     return !this.pagesFilter
    //         ? this.pages
    //         : this.pages.filter(x => x.name.toUpperCase().indexOf(this.pagesFilter.toUpperCase()) !== -1);
    // }

    // get currentFilter(): string {
    //     return this.displayPages ? this.pagesFilter : this.templatesFilter;
    // }

    // get placeholder(): string {
    //     return this.displayPages ? 'Enter page name' : 'Enter template name';
    // }

    constructor() { }

    ngOnInit(): void {
    }

    // togglePopover() {
    //     this.isOpen = !this.isOpen
    // }

    // templateButtonClick(item: TemplateSchema, key: string) {
    //     if (key === 'page') {
    //         this.displayPages = true;
    //     } else {
    //         this.selectItem();
    //         this.templateSelected.emit(key);
    //     }
    // }

    // pageButtonClick(item: any) {
    //     this.selectItem();
    //     this.currentTemplateName = item.name;
    // }

    // private selectItem() {
    //     this.close();
    //     this.pagesFilter = '';
    //     this.templatesFilter = '';
    // }

    // back() {
    //     this.displayPages = false;
    // }

    // close() {
    //     this.isOpen = false;
    // }

    // outsideClick(event: MouseEvent) {
    //     event.stopPropagation();
    //     this.close();
    // }

    // updateFilter(event: Event) {
    //     const target = <HTMLInputElement>event.target;
    //     if (this.displayPages) {
    //         this.pagesFilter = target.value;
    //     } else {
    //         this.templatesFilter = target.value;
    //     }
    // }

    // getTemplateName(item: TemplateSchema, key: string): string {
    //     return helpers.getTemplateName(item, key);
    // }
}
