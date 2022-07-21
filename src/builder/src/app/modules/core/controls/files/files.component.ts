import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FilesDescriptor } from '@models/controls';
import { BaseFilesComponent } from '../base-files.component';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent extends BaseFilesComponent<FilesDescriptor> {


    getMaxListHeight(): string {
        return this.innerValue.length <= (this.descriptor.collapseThreshold || 6) || this.expanded || !!this.selectedFile
        ? 'inherit'
        : 'calc((' + (this.descriptor.collapseCount || 4) + ' + .5) * (.5rem + 20px))'
    }

    onReorderItems(event: CdkDragDrop<any>) {
        this.reorderItems(event.previousIndex, event.currentIndex);
    }
}
