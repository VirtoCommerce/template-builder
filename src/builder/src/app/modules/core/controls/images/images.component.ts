import { AssetFile } from '@core/models';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { CdkDragDrop, CdkDragEnter, CdkDropList, CdkDropListGroup, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileUploadModule } from '@iplab/ngx-file-upload';

import { BaseFilesComponent } from '../base-files.component';
import { ImagesDescriptor } from '@models/controls';
import { ChevronComponent } from '@core/components/chevron/chevron.component';
import { IconComponent } from '@core/components/icon/icon.component';
import { DragHandleComponent } from '@core/components/drag-handle/drag-handle.component';
import { IconButtonComponent } from '@core/components/icon-button/icon-button.component';
import { ControlsListComponent } from '@core/dynamics/controls-list/controls-list.component';

@Component({
    selector: 'app-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, NgStyle, DragDropModule, MatProgressSpinnerModule,
              FileUploadModule, ChevronComponent, IconComponent, DragHandleComponent,
              IconButtonComponent, ControlsListComponent]
})
export class ImagesComponent extends BaseFilesComponent<ImagesDescriptor> {

    getMaxListHeight(): string {
        return this.innerValue.length <= (this.descriptor?.collapseThreshold || 4) || this.expanded || !!this.selectedFile
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

    getBackground(item: AssetFile) {
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
