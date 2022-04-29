import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// import { trigger, state, style, animate, transition } from '@angular/animations';

import { MultipageSelectDescriptor } from '@core/models';

@Component({
    selector: 'app-multipage-select',
    templateUrl: './multipage-select.component.html',
    styleUrls: ['./multipage-select.component.scss'],
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
export class MultipageSelectComponent implements OnInit {

    @Input() title: string = '';
    @Input() filter: string = '';
    @Input() filterPlaceholder: string = '';
    @Input() default?: MultipageSelectDescriptor;
    @Input() current: MultipageSelectDescriptor | null = null;
    @Input() items: MultipageSelectDescriptor[] | null = [];

    @Output() itemSelected = new EventEmitter<MultipageSelectDescriptor>();
    @Output() filterChanged = new EventEmitter<string>();

    isOpen = false;
    parent: MultipageSelectDescriptor | null = null;

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

    getItemName(item: MultipageSelectDescriptor): string {
        return item.title;
    }

    showChildren(item: MultipageSelectDescriptor) {
        if (item.hasChildren) {
            this.parent = item;
        } else {
            this.selectItem(item);
        }
    }

    selectItem(item: MultipageSelectDescriptor) {
        this.itemSelected.emit(item);
        this.isOpen = false;
    }

    back() {
        this.parent = null;
    }
}
