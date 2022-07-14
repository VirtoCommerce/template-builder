import { HttpErrorResponse } from '@angular/common/http';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FileUploadControl } from '@iplab/ngx-file-upload';
import { Subscription } from 'rxjs';

import { AppConfig } from '@integration/services';

import { ControlContext, AssetFile } from '@core/models';
import { ModalService, AssetsService } from '@core/services';
import { BaseControlDirective } from '@core/controls';
import { FilesDescriptor } from '@models/controls';

import { coreHelpers, formsHelpers } from '@core/helpers';

@Component({
    selector: 'app-files',
    templateUrl: './files.component.html',
    styleUrls: ['./files.component.scss']
})
export class FilesComponent extends BaseControlDirective<FilesDescriptor> {

    private subscription: Subscription | null = null;
    private elementSubscription: Subscription | null = null;

    elementForm: FormGroup | null = null;
    control!: FileUploadControl; // control used for d-n-d only
    selectedFile: AssetFile | null = null;
    expanded: boolean = false;
    innerValue: AssetFile[] = [];

    constructor(
        private modals: ModalService,
        private data: AssetsService,
        private cdr: ChangeDetectorRef) {
        super();
    }

    protected override initContent(): void {
        super.initContent();
        this.control = this.createUploadControl();

        this.innerValue = this.getValue();
        this.subscription = this.control.valueChanges.subscribe(items => {
            if (items && items.length) {
                const files = items.map((x, index) => this.convertValueToFile(x, index));
                this.uploadFiles(<any>items);
                this.innerValue.push(...files);
                this.raiseValueChanged();
                this.control.setValue([]); // reset control
            }
        });
    }

    reorderItems(event: CdkDragDrop<any>) {
        const value = this.innerValue;
        const item = value[event.previousIndex];
        value.splice(event.previousIndex, 1);
        value.splice(event.currentIndex, 0, item);
        this.raiseValueChanged();
        // this.control.setValue(value);
    }

    toggleList() {
        this.expanded = !this.expanded;
    }

    selectFile(file: AssetFile) {
        if (this.descriptor.element && this.descriptor.element.length) {
            this.unsubscribeElement();
            if (file === this.selectedFile) {
                this.selectedFile = null;
            } else {
                this.elementForm = formsHelpers.generateForm(file.data, this.descriptor.element);
                this.elementSubscription = this.elementForm.valueChanges.subscribe(value => {
                    (<any>this.selectedFile).data = value;
                    this.raiseValueChanged();
                });
                this.selectedFile = file;
            }
        }
    }

    deleteFile(file: AssetFile) {
        if (!this.descriptor.skipRemoveConfirmation) {
            this.modals.confirm(this.descriptor.removeMessage || 'Do you want to delete this item?').subscribe((data: any) => {
                if (data) {
                    this.deleteFileInternal(file);
                }
            });
        } else {
            this.deleteFileInternal(file);
        }
    }

    uploadItem(file: AssetFile, index: number) {
        if (!file.uploaded && !file.uploading) {
            file.uploading = true;
            file.error = null;
            const context = this.getContext(file, index);
            this.data.uploadAsset(file, this.descriptor, context, value => {
                file.progress = value;
            }).subscribe({
                next: (_) => {
                    // result of request is the same object as file
                    file.uploaded = true;
                    file.uploading = false;
                    file.previewUrl = this.data.getPreviewUrl(file, this.descriptor, context);
                    file.error = null;
                    this.raiseValueChanged();
                    this.cdr.detectChanges();
                },
                error: (error: HttpErrorResponse) => {
                    file.error = error.message;
                    file.uploading = false;
                    this.cdr.detectChanges();
                }
            });
        }
    }

    getMaxListHeight(): string {
        return this.innerValue.length <= (this.descriptor.collapseThreshold || 6) || this.expanded
            ? 'inherit'
            : 'calc((' + (this.descriptor.collapseCount || 4) + ' + .5) * (.5rem + 20px))'
    }

    getContext(item: AssetFile, index: number): ControlContext {
        const element = this.convertFileToValue(item);
        return {
            ...this.context,
            item: this.controlValue,
            index,
            element,
            file: item,
            parent: this.context
        };
    }

    protected override destroyContent(): void {
        this.unsubscribe();
        this.unsubscribeElement();
    }

    private deleteFileInternal(file: AssetFile) {
        if (this.selectedFile === file) {
            this.selectedFile = null;
        }
        this.innerValue.splice(this.innerValue.indexOf(file), 1);
        this.raiseValueChanged();
    }

    private unsubscribe() {
        if (!!this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    private unsubscribeElement() {
        if (!!this.elementSubscription) {
            this.elementSubscription.unsubscribe();
            this.elementSubscription = null;
        }
    }

    private raiseValueChanged() {
        const value = this.convertFilesToValue(<any>this.innerValue);
        this.onValueChanged(value);
    }

    private getValue(): AssetFile[] {
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
        const result = files.map((x: any, index: number) => this.convertValueToFile(x, index));
        return result;
    }

    private convertValueToFile(item: any, index: number): AssetFile {
        // here item is a custom model or string
        let result: AssetFile;
        if (typeof item === 'string') {
            result = <AssetFile>{
                lastModified: 0,
                name: item.startsWith('data:') ? '[inline data]' : item.substring(item.lastIndexOf('/') + 1),
                webkitRelativePath: item,
                url: item,
                uploaded: true
            };
        } else if (item instanceof File) {
            result = <AssetFile>item;
            // here result is a single model item with data property and default File properties
            if (this.descriptor.element && this.descriptor.element.length) {
                // need to generate 'data' property
                result.data = coreHelpers.createDefaultObject(this.descriptor.element);
            }
        } else {
            result = <AssetFile>{
                lastModified: 0,
                name: item[this.descriptor.filenameField || 'filename']
                    || item[this.descriptor.urlField || 'url'].substring(item[this.descriptor.urlField || 'url'].lastIndexOf('/') + 1),
                webkitRelativePath: item[this.descriptor.urlField || 'url'],
                data: item,
                url: item[this.descriptor.urlField || 'url'],
                uploaded: true
            };
        }
        const context = this.getContext(result, index);
        result.previewUrl = this.data.getPreviewUrl(result, this.descriptor, context);
        return result;
    }

    private uploadFiles(items: Array<AssetFile>) {
        items.forEach((x: AssetFile, index: number) => {
            this.uploadItem(x, index);
        });
    }

    private createUploadControl(): FileUploadControl {
        return new FileUploadControl({
            listVisible: false,
            accept: (this.descriptor.accept || '').split(','),
            discardInvalid: true,
            disabled: false,
            multiple: !!this.descriptor.multiple,
            native: false
        });
    }

    private convertFilesToValue(items: AssetFile[]): any {

        if (!items || !items.length) {
            return null;
        }

        const singleFile = !this.descriptor.multiple;
        let result = items.map(x => this.convertFileToValue(x));

        if (singleFile) {
            result = result[0];
        }

        return result;
    }

    private convertFileToValue(item: AssetFile): any {
        const hasElement = !!this.descriptor.element && this.descriptor.element.length > 0;
        const propertiesSet = this.descriptor.urlField || this.descriptor.filenameField;


        let result: any = {};

        // no property names set, no element
        if (!hasElement && !propertiesSet) {
            result = item.url || item.name; // return url
        }

        // property names set, no element
        // no property names set, has element
        // property names set, has element
        else if (hasElement || propertiesSet) {
            result = <any>{  // return an object with url, filename and other data
                [this.descriptor.filenameField || 'filename']: item.name,
                ...(item.data || {}),
                [this.descriptor.urlField || 'url']: item.url || item.webkitRelativePath || item.name
            };
        }

        return result;
    }
}
