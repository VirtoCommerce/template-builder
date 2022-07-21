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

    getMaxListHeight(): string {
        return this.innerValue.length <= (this.descriptor.collapseThreshold || 4) || this.expanded || !!this.selectedFile
            ? 'inherit'
            : '12rem'
    }

    onReorderItems(event: CdkDragDrop<any>) {
        this.reorderItems(event.previousIndex, event.currentIndex);
    }

    // onBackClick() {
    //     if (this.selectedFile !== null) {
    //         this.selectFile(this.selectedFile);
    //     }
    // }

    getBackground(item: any) {
        return `url('${item.previewUrl}')`;
    }

    protected override getControlOptions() {
        const result = super.getControlOptions();
        if (!result.accept?.length) {
            result.accept = ['image/*'];
        }
        return result;
    }
}
