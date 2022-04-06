import { ListHelpers } from '@shared/services';
import { SectionSchema, ItemsGroup } from '@shared/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionsSchemasList } from '@editor/models';

@Component({
    selector: 'app-add-section',
    templateUrl: './add-section.component.html',
    styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {

    private _schemasList!: SectionsSchemasList;

    @Input() get schemasList(): SectionsSchemasList {
        return this._schemasList;
    }
    set schemasList(value: SectionsSchemasList) {
        this._schemasList = value;
        this.groupItems();
    }

    @Output() previewItem = new EventEmitter<SectionSchema>();
    @Output() addItem = new EventEmitter<SectionSchema>();
    @Output() cancelAdd = new EventEmitter();

    groups: ItemsGroup<SectionSchema>[] = [];
    items: SectionSchema[] = [];

    underPreview: SectionSchema | null = null; // todo: for tests purposes
    openedGroup: ItemsGroup<SectionSchema> | null = null;

    constructor(private helper: ListHelpers) { }

    ngOnInit(): void {
        this.groupItems();
    }

    filterItems(filter: string) {
        // if (!filter) {
        //     this.groupItems();
        // }
        // const result = this.helper.groupSections(this._schemasList);
        // const f = filter.toLowerCase();
        // const groups = result.map(x => ({ ...x, items: x.items.filter(_ => _.name.toLowerCase().indexOf(f) != -1) }));
        // this.setGroups(groups);
    }

    onPreviewItem(item: SectionSchema) {
        console.log('add-section');
        this.underPreview = item; // todo: for tests purposes
        this.previewItem.emit(item);
    }

    onAddItem(item: SectionSchema) {
        this.addItem.emit(item);
    }

    onGroupOpened(group: ItemsGroup<SectionSchema>) {
        if (group === this.openedGroup) {
            this.openedGroup = null;
        } else {
            this.openedGroup = group;
        }
    }

    raiseCancelAdd() {
        this.cancelAdd.emit();
    }

    private groupItems() {
        const list = Object.keys(this._schemasList).map(key => ({ ...this._schemasList[key], type: key }));
        const result = this.helper.groupSections(list);
        this.setGroups(result);
    }

    private setGroups(groups: ItemsGroup<SectionSchema>[]) {
        this.groups = groups.filter(x => x.items.length && !x.noname);
        this.items = groups.find(x => x.noname)?.items || [];
    }
}
