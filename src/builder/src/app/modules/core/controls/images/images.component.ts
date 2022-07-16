import { Component } from '@angular/core';
import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';

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

    dragEntered(event: CdkDragEnter<number>) {
        // const drag = event.item;
        // const dropList = event.container;
        // const dragIndex = drag.data;
        // const dropIndex = dropList.data;

        // const phContainer = dropList.element.nativeElement!;
        // const phElement = phContainer.querySelector('.cdk-drag-placeholder')!;
        // phContainer.removeChild(phElement);
        // phContainer.parentElement!.insertBefore(phElement, phContainer);

        // this.reorderItems(dragIndex, dropIndex);
    }
}
