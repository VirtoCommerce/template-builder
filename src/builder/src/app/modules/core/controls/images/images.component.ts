import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragEnter, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';

import { BaseFilesComponent } from '../base-files.component';
import { ImagesDescriptor } from '@models/controls';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss']
})
export class ImagesComponent extends BaseFilesComponent<ImagesDescriptor> {
    getMaxListHeight(): string {
        return this.innerValue.length <= (this.descriptor.collapseThreshold || 6) || this.expanded
            ? 'inherit'
            : 'calc((' + (this.descriptor.collapseCount || 4) + ' + .5) * (.5rem + 20px))'
    }

    @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList> | null = null;
    @ViewChild('listGroup') listGroupElRef: ElementRef | null = null;
    @ViewChild(CdkDropList) placeholder: CdkDropList | null = null;
    // @ViewChild('dragPlaceholder') dragPlaceholderElRef: ElementRef | null = null;

    public target: CdkDropList | null = null;
    public targetIndex: number | null = null;
    public source: CdkDropList | null = null;
    public sourceIndex: number | null = null;

    ngAfterViewInit() {
        if (this.placeholder) {
            let phElement = this.placeholder.element.nativeElement;
            phElement.style.display = 'none';
            phElement.parentNode!.removeChild(phElement);
        }
    }

    dropped() {
        if (!this.target) return;

        const parent: HTMLElement = this.listGroupElRef!.nativeElement;
        const phElement: HTMLElement = this.placeholder!.element.nativeElement;
        const phElementIndex = __indexOf(parent.children, phElement);

        phElement.style.display = 'none';
        parent.removeChild(phElement);
        parent.appendChild(phElement);

        parent.insertBefore(
            this.source!.element.nativeElement,
            parent.children[this.sourceIndex!]
        );

        console.log(this.sourceIndex, ' => ', phElementIndex);

        if (this.sourceIndex != phElementIndex) {
            this.reorderItems(this.sourceIndex!, phElementIndex)
            // moveItemInArray(this.items, this.sourceIndex, phElementIndex);
        }

        this.target = null;
        this.targetIndex = null;
        this.source = null;
        this.sourceIndex = null;
    }

    entered({ item, container }: CdkDragEnter) {
        const phElement: HTMLElement = this.placeholder!.element.nativeElement;
        const dropElement: HTMLElement = container.element.nativeElement;
        const prevTarget: CdkDropList = this.target!;
        const prevTargetIndex: number = this.targetIndex!;
        this.target = container;

        const dropElementIsTheSource: boolean = !dropElement.parentNode;
        const prevAndCurrentTargetAreTheSame: boolean = this.target === prevTarget;
        if (dropElementIsTheSource || prevAndCurrentTargetAreTheSame) {
            return;
        }

        this.targetIndex = __indexOf(dropElement.parentNode!.children, dropElement);

        if (!this.source) {
            this.source = item.dropContainer;
            this.sourceIndex = __indexOf(
                dropElement.parentNode!.children,
                item.dropContainer.element.nativeElement
            );
            const sourceElement: HTMLElement = this.source.element.nativeElement;

            this.fixPhElementStyling(phElement, sourceElement);

            sourceElement.parentNode!.removeChild(sourceElement);
        }

        const index: number = prevTargetIndex ?? this.sourceIndex;
        const insertAfter: boolean = index < this.targetIndex;

        this.listGroupElRef!.nativeElement.insertBefore(
            phElement,
            insertAfter ? dropElement.nextSibling : dropElement
        );
    }

    dragReleased() {
        const phElementPositionWasChanged: boolean = !!this.source;
        if (phElementPositionWasChanged) {
            // this.dragPlaceholderElRef!.nativeElement.style.transform = 'none';
            // this.dragPlaceholderElRef!.nativeElement.parentNode.removeChild(
            //     this.dragPlaceholderElRef!.nativeElement
            // );
            // this.placeholder!.element.nativeElement.appendChild(
            //     this.dragPlaceholderElRef!.nativeElement
            // );
        }
    }

    private fixPhElementStyling(
        phElement: HTMLElement,
        sourceElement: HTMLElement
    ) {
        phElement.style.width = sourceElement.clientWidth - 6 + 'px';
        phElement.style.height = sourceElement.clientHeight - 6 + 'px';

        const size = Array.from(sourceElement.classList).find((c) =>
            c.startsWith('content-item-c')
        );

        phElement.style.display = '';
        const oldSize = Array.from(phElement.classList).find((c) =>
            c.startsWith('content-item-c')
        );
        if (oldSize) {
            phElement.classList.remove(oldSize);
        }
        if (size) {
            phElement.classList.add(size);
        }
    }
}

function __indexOf(collection: any, node: any) {
    return Array.prototype.indexOf.call(collection, node);
}
