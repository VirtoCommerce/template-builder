import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { SectionsSchemasList, TemplateModel } from '@editor/models';
import { SectionModel } from '@shared/models';

import { helpers } from '@editor/services';

@Component({
    selector: 'app-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateEditorComponent implements OnInit {

    @Input() template!: TemplateModel | null;
    @Input() sectionsSchemas!: SectionsSchemasList | null;
    @Input() blocksSchemas!: SectionsSchemasList | null;

    @HostBinding('class.inactive')
    @Input() inactive: boolean | null = false;
    @Output() addSectionClick = new EventEmitter<number | boolean>();
    @Output() editItem = new EventEmitter<{ sectionIndex: number, blockIndex: number | null }>();
    @Output() itemVisibleChanged = new EventEmitter<{ sectionIndex: number, blockIndex: number | null, value: boolean }>();

    openedItems: { [key: string]: boolean } = {};

    constructor() { }

    ngOnInit(): void { }

    addButtonClick() {
        this.addSectionClick.emit(true);
    }

    addBlockClick(sectionId: number) {
        this.addSectionClick.emit(sectionId);
    }

    onItemClick(sectionIndex: number, blockIndex: number | null) {
        this.editItem.emit({ sectionIndex, blockIndex });
    }

    isOpened(sectionId: string): boolean {
        return !!this.openedItems[sectionId];
    }

    onOpenChanged(event: MouseEvent, sectionId: string, isOpened: boolean) {
        event.stopPropagation();
        this.openedItems[sectionId] = isOpened;
    }

    onVisibleChanged(value: boolean, sectionIndex: number, blockIndex: number | null) {
        this.itemVisibleChanged.emit({ sectionIndex, blockIndex, value });
    }

    reorderSections(event: CdkDragSortEvent<SectionModel>) {
        console.log('reoderSections', event);
    }

    sectionDragStarted(event: any) {
        console.log('drag started', event);
    }

    sectionDragCompleted(event: any) {
        console.log('drag released', event);
    }

    blockDragStarted() {
        console.log('block drag started');
    }

    blockDragCompleted() {
        console.log('block drag released');
    }

    getTemplateName(): string {
        if (this.template && this.template.settings) {
            return <string>this.template.settings['name'];
        }
        return '[no name]';
    }

    getSectionIcon(section: SectionModel): string | null {
        if (this.sectionsSchemas && this.sectionsSchemas[section.type]) {
            return this.sectionsSchemas[section.type].icon;
        }
        return null; // todo: add default section icon
    }

    getBlockIcon(block: SectionModel): string | null {
        if (this.blocksSchemas && this.blocksSchemas[block.type]) {
            return this.blocksSchemas[block.type].icon;
        }
        return null; // todo: add default block icon
    }

    getSectionName(section: SectionModel): string {
        return this.getItemName(section, this.sectionsSchemas);
    }

    getBlockName(block: SectionModel): string {
        return this.getItemName(block, this.blocksSchemas)
            || this.getItemName(block, this.sectionsSchemas);
    }

    private getItemName(item: SectionModel, schemas: SectionsSchemasList | null): string {
        if (schemas) {
            return helpers.getSectionName(item, schemas);
        }
        return '[no name]';
    }

    hasChildren(section: SectionModel): boolean {
        return !!this.sectionsSchemas && this.sectionsSchemas[section.type] && !!this.sectionsSchemas[section.type]?.blocks?.length;
    }

}
