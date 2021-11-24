import { ListHelpers } from '@shared/services';
import { SectionSchema, ItemsGroup } from '@shared/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {

    @Input() title: string = 'Add section';
    @Input() schemas: SectionSchema[] = [
        { type: 'text', icon: 'text', name: 'Simple text', group: 'Simple blocks are grouped in a single group with long name', groupIcon: 'text' },
        { type: 'image', icon: 'image', name: 'Simple image', group: 'Simple blocks are grouped in a single group with long name' },
        { type: 'carousel', icon: 'image', name: 'Carousel', group: 'Complex blocks', groupIcon: 'image' },
        { type: 'cards', icon: 'text', name: 'Cards (block name may be long or short)', group: 'Complex blocks' },
        { type: 'texts-list', icon: 'text', name: 'Texts list' },
        { type: 'table', icon: 'text', name: 'Table' }
    ];

    @Output() backClick = new EventEmitter<any>();

    groups: ItemsGroup<SectionSchema>[] = [];
    items: SectionSchema[] = [];

    constructor(private helper: ListHelpers) { }

    ngOnInit(): void {
        this.groupItems();
    }

    backButtonClick() {
        this.backClick.emit();
    }

    filterItems(filter: string) {
        if (!filter) {
            this.groupItems();
        }
        const result = this.helper.groupSections(this.schemas);
        const groups = result.map(x => ({ ...x, items: x.items.filter(_ => _.name.indexOf(filter) != -1) }));
        this.setGroups(groups);
    }

    private groupItems() {
        const result = this.helper.groupSections(this.schemas);
        this.setGroups(result);
    }

    private setGroups(groups: ItemsGroup<SectionSchema>[]) {
        this.groups = groups.filter(x => x.items.length && !x.noname);
        this.items = groups.find(x => x.noname)?.items || [];
    }
}
