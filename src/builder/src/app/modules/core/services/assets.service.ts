import { from, map, tap } from 'rxjs';
import { AssetsRequest, ServerRequestDescriptor } from '@models/index';
import { AppConfig, EvaluatorService } from '@integration/services';
import { Injectable } from '@angular/core';
import { FilesDescriptor } from '@models/controls';
import { AssetFile } from '../models';
import { DataService } from './data.service';
import { Observable, of } from 'rxjs';

import { appHelpers } from '@integration/helpers';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {

    constructor(
        private data: DataService,
        private appConfig: AppConfig,
        private evaluator: EvaluatorService) { }

    uploadAsset(file: AssetFile, descriptor: FilesDescriptor, context: any, progress: (value: number) => void): Observable<any> {
        // todo: progress not works
        file.assetName = file.name;
        let request = this.getRequest(descriptor, context);
        if (!request || request === 'inline') {
            // in this case we create data-url
            return from(new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(<string>reader.result);
                reader.onerror = error => reject(error);
            })).pipe(
                map(dataUrl => {
                    file.url = dataUrl;
                    return file;
                })
            );
        }
        if (!!request.randomizeAssetName) {
            file.assetName = this.randomizeAssetName(file.name);
            request = this.getRequest(descriptor, context);
        }
        return this.data.doRequest(<AssetsRequest>request, context, file, { nullWhenError: false }).pipe(
            map(response => {
                const req = <AssetsRequest>request;
                if (req.resultTemplate) {
                    file.url = this.evaluator.evaluate(req.resultTemplate, { ...context, response });
                } else {
                    file.url = response;
                }
                return file;
            })
        );
    }

    getPreviewUrl(file: AssetFile, descriptor: FilesDescriptor, context: any): string | null {
        if (!file.url) {
            return null;
        }
        const absoluteOrRelativeUrl = file.url;
        if (['http://', 'https://', '//', 'data:'].find(x => absoluteOrRelativeUrl.startsWith(x))) {
            return absoluteOrRelativeUrl;
        }
        const request = this.getRequest(descriptor, context);
        if (request && typeof request !== 'string' && request.previewTemplate) {
            return this.evaluator.evaluate(request.previewTemplate, { ...file, url: absoluteOrRelativeUrl });
        }
        return file.url;
    }

    private getRequest(descriptor: FilesDescriptor, context: any): AssetsRequest | 'inline' | null {
        let request = descriptor.uploadAssetsRequest;
        if (!request) {
            request = this.appConfig.getValue('uploadAssetsRequest', context);
        }
        if (!!request && typeof request === 'string' && request !== 'inline') {
            // in this case request is a name of config property
            request = <AssetsRequest>this.appConfig.getValue(<any>request, context);
        }
        return <any>request;
    }

    private randomizeAssetName(name: string): string {
        const parts = name.split('.');
        const extension = parts.pop();
        const uniqueName = `${parts.join('.')}_${appHelpers.generateUniqueString(10)}.${extension}`;
        const safeName = encodeURIComponent(uniqueName);
        return safeName;
    }
}
