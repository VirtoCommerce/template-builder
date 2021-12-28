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
    @Input() schemas: SectionSchema[] | null = [];

    @Output() backClick = new EventEmitter<any>();
    @Output() previewItem = new EventEmitter<SectionSchema>();
    @Output() addItem = new EventEmitter<SectionSchema>();

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
        const result = this.helper.groupSections(this.schemas || []);
        const f = filter.toLowerCase();
        const groups = result.map(x => ({ ...x, items: x.items.filter(_ => _.name.toLowerCase().indexOf(f) != -1) }));
        this.setGroups(groups);
    }

    onPreviewItem(item: SectionSchema) {
        this.previewItem.emit(item);
    }

    onAddItem(item: SectionSchema) {
        this.addItem.emit(item);
    }

    private groupItems() {
        const result = this.helper.groupSections(this.schemas || []);
        this.setGroups(result);
    }

    private setGroups(groups: ItemsGroup<SectionSchema>[]) {
        this.groups = groups.filter(x => x.items.length && !x.noname);
        this.items = groups.find(x => x.noname)?.items || [];
    }
}
