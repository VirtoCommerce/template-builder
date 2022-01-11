import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

import { SectionsSchemasList, TemplateModel } from '@editor/models';
import { SectionModel } from '@shared/models';

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

    onOpenChanged(sectionId: string, isOpened: boolean) {
        this.openedItems[sectionId] = isOpened;
    }

    onVisibleChanged(value: { sectionIndex: number, blockIndex: number | null, value: boolean }) {
        this.itemVisibleChanged.emit(value);
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

    getTemplateName(): string {
        if (this.template && this.template.settings) {
            return <string>this.template.settings['name'];
        }
        return '[no name]';
    }
}
