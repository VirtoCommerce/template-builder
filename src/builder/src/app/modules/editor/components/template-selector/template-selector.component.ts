import { Component, Input, OnInit } from '@angular/core';
import { TemplateModelDescriptor, PageModelDescriptor } from '@editor/models';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-template-selector',
    templateUrl: './template-selector.component.html',
    styleUrls: ['./template-selector.component.scss'],
    animations: [
        // trigger(
        //     'templatesAnimation',
        //     [
        //         state('open', style({ transform: 'none' })),
        //         state('*', style({ transform: 'translate(-100%)' })),
        //         transition('open <=> *', animate('.2s ease-in')),
        //     ]
        // ),
        // trigger(
        //     'pagesAnimation',
        //     [
        //         transition(
        //             ':enter',
        //             [
        //                 style({ transform: 'translate(100%)' }),
        //                 animate('.2s ease-in', style({ transform: 'none' }))
        //             ]
        //         ),
        //         transition(
        //             ':leave',
        //             [
        //                 style({ transform: 'none' }),
        //                 animate('.2s ease-in', style({ transform: 'translate(100%)' }))
        //             ]
        //         )
        //     ]
        // )
    ]
})
export class TemplateSelectorComponent implements OnInit {

    isOpen = false;
    displayPages = false;

    @Input() templates: TemplateModelDescriptor[] = [
        {
            name: 'Page',
            filename: 'page.json',
            hasChildren: true
        },
        { name: 'Catalog', filename: 'catalog.json' },
        { name: 'Product', filename: 'product.json' },
        { name: 'Collections', filename: 'product.json' },
        { name: 'Cart', filename: 'product.json' },
        { name: 'Checkout', filename: 'product.json' },
        { name: 'Blog', filename: 'product.json' },
        { name: 'Article', filename: 'product.json' }
    ];

    @Input() pages: PageModelDescriptor[] = [
        {
            name: 'Homepage',
            filename: ''
        },
        {
            name: 'About',
            filename: ''
        },
    ];

    get filteredTemplates(): TemplateModelDescriptor[] {
        return !this.templatesFilter
            ? this.templates
            : this.templates.filter(x => x.name.toUpperCase().indexOf(this.templatesFilter.toUpperCase()) !== -1);
    }

    get filteredPages(): PageModelDescriptor[] {
        return !this.pagesFilter
            ? this.pages
            : this.pages.filter(x => x.name.toUpperCase().indexOf(this.pagesFilter.toUpperCase()) !== -1);
    }

    private _currentTemplateName: string = '';

    pagesFilter: string = '';
    templatesFilter: string = '';

    get currentFilter(): string {
        return this.displayPages ? this.pagesFilter : this.templatesFilter;
    }

    get placeholder(): string {
        return this.displayPages ? 'Enter page name' : 'Enter template name';
    }

    @Input() get currentTemplateName(): string {
        return this._currentTemplateName || 'Select template';
    }

    set currentTemplateName(value: string) {
        this._currentTemplateName = value;
    }

    constructor() { }

    ngOnInit(): void {
    }

    openPopover() {
        this.isOpen = !this.isOpen
    }

    templateButtonClick(item: TemplateModelDescriptor) {
        if (item.hasChildren) {
            this.displayPages = true;
        } else {
            this.selectItem(item);
        }
    }

    pageButtonClick(item: PageModelDescriptor) {
        this.selectItem(item);
    }

    private selectItem(item: PageModelDescriptor | TemplateModelDescriptor) {
        this.close();
        this.pagesFilter = '';
        this.templatesFilter = '';
        this.currentTemplateName = item.name;
    }

    back() {
        this.displayPages = false;
    }

    close() {
        this.isOpen = false;
    }

    updateFilter(event: Event) {
        const target = <HTMLInputElement>event.target;
        if (this.displayPages) {
            this.pagesFilter = target.value;
        } else {
            this.templatesFilter = target.value;
        }
    }

}
