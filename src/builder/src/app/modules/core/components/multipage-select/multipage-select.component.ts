import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgScrollbar } from 'ngx-scrollbar';
import { MultipageSelectDescriptor } from '@core/models';
import { ChevronComponent } from '../chevron/chevron.component';
import { SeparatorComponent } from '../separator/separator.component';
import { IconComponent } from '../icon/icon.component';

// import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-multipage-select',
    templateUrl: './multipage-select.component.html',
    styleUrls: ['./multipage-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgFor, OverlayModule, NgScrollbar, ChevronComponent, SeparatorComponent, IconComponent],
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

    @Input() panelClass: string = '';

    @Input() titleText: string | null = null;
    @Input() filter: string | null = null;
    @Input() filterPlaceholder: string = '';
    @Input() default?: MultipageSelectDescriptor;
    @Input() current: MultipageSelectDescriptor | null = null;
    @Input() parentItems: MultipageSelectDescriptor[] | null = [];
    @Input() childrenItems: MultipageSelectDescriptor[] | null = null;

    @Output() itemSelected = new EventEmitter<MultipageSelectDescriptor>();
    @Output() filterChanged = new EventEmitter<string>();
    @Output() backClick = new EventEmitter();

    isOpen = false;

    get currentLabel(): string {
        return this.current?.title || this.default?.title || '';
    }

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

    selectItem(item: MultipageSelectDescriptor) {
        this.itemSelected.emit(item);
        if (!item.hasChildren) {
            this.isOpen = false;
        }
    }

    back() {
        this.backClick.emit();
    }
}
