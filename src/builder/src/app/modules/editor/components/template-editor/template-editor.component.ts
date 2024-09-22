import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragSortEvent } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { ContextMenuAction, ReorderItemsModel } from '@core/models';
import { SectionModel, SectionSchema } from '@models/document';

import { ContextMenuHelper } from '@editor/helpers';
import { BuilderState } from '@editor/store/state';

import * as fromRoute from '@shared/routing';
import * as fromState from '@editor/store/selectors';
import * as actions from '@editor/store/actions';
import { RFC_2822 } from 'moment';
import { BlockState } from '../../models';

@Component({
    selector: 'app-template-editor',
    templateUrl: './template-editor.component.html',
    styleUrls: ['./template-editor.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateEditorComponent implements OnInit {

    @ViewChild('container') container!: ElementRef<HTMLDivElement>;

    viewModel$ = this.store.select(fromState.editTemplateContext);

    hoveredSectionId$ = this.store.select(fromState.hoveredSectionId);
    templateName$ = this.store.select(fromState.selectCurrentTemplateName);

    addButtonTop = '0';
    addButtonOpacity = 0;
    currentInsertIndex = 0;
    currentHoverId: string | null = null;

    // templateKeyParameter$ = this.store.select(fromRoute.selectTemplateKeyParameter);

    constructor(private store: Store<BuilderState>, private helper: ContextMenuHelper) { }

    ngOnInit(): void { }

    addSectionClick() {
        this.store.dispatch(actions.showBlankSections({ sectionId: null, positionIndex: this.currentInsertIndex }));
    }

    onSettingsClick(schema: SectionSchema) {
        this.store.dispatch(actions.editSettings({ schema }))
    }

    reorderSections(event: CdkDragSortEvent<SectionModel>) {
        this.store.dispatch(actions.sortItems({ options: { item: event.item.data, currentIndex: event.currentIndex, previousIndex: event.previousIndex } }))
    }
    sectionDragStarted(section: SectionModel) {
        this.store.dispatch(actions.startDragSection({ sectionId: section.id }));
    }
    sectionDragCompleted(section: SectionModel) {
        this.store.dispatch(actions.releaseDragSection({ sectionId: section.id }));
    }

    reorderBlocks(options: ReorderItemsModel) {
        this.store.dispatch(actions.sortItems({ options }))
    }

    onSectionClick(section: SectionModel) {
        this.store.dispatch(actions.editSectionAction({ sectionId: section.id }));
    }

    onSectionHover(section: SectionModel) {
        this.store.dispatch(actions.hoverSection({ sectionId: section.id }));
    }

    onItemSelectChanged(selected: boolean, section: SectionModel, templateKey: string, vm: any) {
        console.log(vm);
        this.store.dispatch(actions.sectionStateChangedAction({ sectionId: section.id, templateKey, state: { selected } }));
    }

    onBlockSelectChanged(selected: boolean, blockId: string, sectionId: string, templateKey: string) {
        this.store.dispatch(actions.sectionStateChangedAction({ sectionId, templateKey, state: { blocks: { [blockId]: <BlockState>{ selected } } } }));
    }

    onBlockClick(section: SectionModel, block: SectionModel) {
        this.store.dispatch(actions.editBlockAction({ sectionId: section.id, blockId: block.id }));
    }
    addBlockClick(section: SectionModel) {
        this.store.dispatch(actions.showBlankSections({ sectionId: section.id, positionIndex: -1 }));
    }

    toggleSection(expanded: boolean, sectionId: string, templateKey: string) {
        this.store.dispatch(actions.sectionStateChangedAction({ sectionId, templateKey, state: { expanded } }));
    }

    onActionClick(event: string, section?: SectionModel, block?: SectionModel) {
        this.store.dispatch(actions.executeContextMenuAction({ action: event, source: 'list', section, block }));
    }

    getPageActions: () => Promise<ContextMenuAction[]> = () => {
        const result = this.helper.getPageActions();
        return result;
    };

    onMouseMove(args: MouseEvent) {
        let target = this.container.nativeElement;
        const rect = target.getBoundingClientRect();
        const top = args.clientY - rect.top;

        const w2 = rect.width / 2.0;
        this.addButtonOpacity = 1 - Math.abs(w2 - args.clientX - rect.left) / w2;

        if (top < 0) {
            this.currentInsertIndex = 0;
            this.addButtonTop = '-18px';
            return;
        }

        for (let i = 0; i < target.children.length; i++) {
            const childRect = target.children[i].getBoundingClientRect();
            const childTop = childRect.top - rect.top;
            const childBottom = childRect.bottom - rect.top;
            if (top >= childTop && top < childBottom + 10) {
                const m = (childBottom + childTop) / 2;
                const onTop = top < m;
                this.currentInsertIndex = onTop ? i : i + 1;
                const position = onTop ? childTop - 18 : childBottom - 14;
                this.addButtonTop = `${position}px`;
                return;
            }
        }

        this.currentInsertIndex = target.children.length;
        this.addButtonTop = `${rect.height - 14}px`;
    }

    onMouseLeave() {
        this.addButtonOpacity = 0;
    }
}
