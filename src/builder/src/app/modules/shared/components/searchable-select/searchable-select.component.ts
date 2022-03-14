import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// import { trigger, state, style, animate, transition } from '@angular/animations';

import { SearchableItemDescriptor } from '@shared/models';

@Component({
    selector: 'app-searchable-select',
    templateUrl: './searchable-select.component.html',
    styleUrls: ['./searchable-select.component.scss'],
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
export class SearchableSelectComponent implements OnInit {

    @Input() title: string = '';
    @Input() filter: string = '';
    @Input() filterPlaceholder: string = '';
    @Input() default?: SearchableItemDescriptor
    @Input() current?: SearchableItemDescriptor
    @Input() items: SearchableItemDescriptor[] = [];

    @Output() itemSelected = new EventEmitter<SearchableItemDescriptor>();
    @Output() filterChanged = new EventEmitter<string>();

    isOpen = false;
    parent: SearchableItemDescriptor | null = null;

    get currentLabel(): string {
        return this.current?.title || this.default?.title || '';
    }

    constructor() { }

    ngOnInit(): void {
    }

    close() {
        this.isOpen = false;
    }

    outsideClick(event: MouseEvent) {
        event.stopPropagation();
        this.close();
    }

    togglePopover() {
        this.isOpen = !this.isOpen;
    }

    updateFilter(event: Event) {
        const target = <HTMLInputElement>event.target;
        this.filterChanged.emit(target.value);
    }

    getItemName(item: SearchableItemDescriptor): string {
        return item.title;
    }

    showChildren(item: SearchableItemDescriptor) {
        if (item.hasChildren) {
            this.parent = item;
        } else {
            this.selectItem(item);
        }
    }

    selectItem(item: SearchableItemDescriptor) {
        this.itemSelected.emit(item);
        this.isOpen = false;
    }

    back() {
        this.parent = null;
    }
}
