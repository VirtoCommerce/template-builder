import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, CdkDragEnter, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';

import { BaseFilesComponent } from '../base-files.component';
import { ImagesDescriptor } from '@models/controls';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss']
})
export class ImagesComponent extends BaseFilesComponent<ImagesDescriptor> {

    sortMode: boolean = false;

    getMaxListHeight(): string {
        return this.innerValue.length <= (this.descriptor.collapseThreshold || 4) || this.expanded || this.sortMode
            ? 'inherit'
            : '12rem'
    }

    onReorderItems(event: CdkDragDrop<any>) {
        this.reorderItems(event.previousIndex, event.currentIndex);
    }

    onBackClick() {
        if (this.selectedFile !== null) {
            this.selectFile(this.selectedFile);
        }
    }

}
