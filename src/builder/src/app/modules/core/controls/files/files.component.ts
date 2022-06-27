import { Component, OnInit } from '@angular/core';
import { FileUploadControl } from '@iplab/ngx-file-upload';

import { BaseControlDirective } from '@core/controls';
import { FilesDescriptor } from '@models/controls';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent extends BaseControlDirective<FilesDescriptor> {

    control!: FileUploadControl;

    protected override initContent(): void {
        super.initContent();
        this.control = new FileUploadControl({
            listVisible: true,
            accept: (this.descriptor.accept || '').split(','),
            discardInvalid: true,
            disabled: false,
            multiple: !!this.descriptor.multiple,
            native: false
        });
        let init = true; // todo: fix it
        const value = this.getValue();
        this.control.setValue(value);
        this.control.valueChanges.subscribe(x => {
            if (!init) {
                console.log(x);
            }
            init = false;
        });
    }

    private getValue(): File[] {
        let files = !this.controlValue
            ? this.descriptor.multiple
                ? []
                : null
            : this.controlValue;
        if (!files) {
            return [];
        }
        if (!Array.isArray(files)) {
            files = [files];
        }
        const result = files.map((x: string) => <File>{
            lastModified: 0,
            name: x.substring(x.lastIndexOf('/') + 1),
            webkitRelativePath: x
        });
        return result;
    }
}
