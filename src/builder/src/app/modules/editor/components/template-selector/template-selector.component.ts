import { Component, Input, OnInit } from '@angular/core';
import { PageModelDescriptor, TemplateModel, TemplatesList } from '@editor/models';
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

    @Input() templates!: TemplatesList;

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

    get filteredTemplates(): TemplatesList | null {
        return !this.templatesFilter || !this.templates
            ? this.templates
            : Object.keys(this.templates)
                .filter(key => this.getTemplateName(this.templates[key], key)
                                .toUpperCase()
                                .indexOf(this.templatesFilter.toUpperCase()) !== -1
                ).reduce((acc, key) => ({...acc, [key]: this.templates[key]}), {});
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

    togglePopover() {
        this.isOpen = !this.isOpen
    }

    templateButtonClick(item: TemplateModel, key: string) {
        if (key === 'page') {
            this.displayPages = true;
        } else {
            this.selectItem();
            this.currentTemplateName = this.getTemplateName(item, key);
        }
    }

    pageButtonClick(item: PageModelDescriptor) {
        this.selectItem();
        this.currentTemplateName = item.name;
    }

    private selectItem() {
        this.close();
        this.pagesFilter = '';
        this.templatesFilter = '';
    }

    back() {
        this.displayPages = false;
    }

    close() {
        this.isOpen = false;
    }

    outsideClick(event: MouseEvent) {
        event.stopPropagation();
        this.close();
    }

    updateFilter(event: Event) {
        const target = <HTMLInputElement>event.target;
        if (this.displayPages) {
            this.pagesFilter = target.value;
        } else {
            this.templatesFilter = target.value;
        }
    }

    getTemplateName(item: TemplateModel, key: string): string {
        if (item && item.settings && item.settings.name) {
            return item.settings.name;
        }
        return key || '[no name]';
    }
}
