import { Injectable } from "@angular/core";
import { Clipboard } from '@angular/cdk/clipboard';

import { EnvironmentRef } from './environment.ref'
import { ClipboardModel } from '@core/models';

@Injectable({
    providedIn: 'root'
})
export class ClipboardService {
    constructor(
        private clipboard: Clipboard,
        private environment: EnvironmentRef
    ) { }

    copy(data: ClipboardModel) {
        this.clipboard.copy(JSON.stringify(data));
    }

    async getData(): Promise<ClipboardModel | null> {
        try {
            const data = await this.environment.navigator.clipboard.readText();
            if (!data) {
                return null;
            }
            try {
                const result = <ClipboardModel>JSON.parse(data);
                result.sourceContent = data;
                return result;
            } catch (error) {
                return <ClipboardModel>{ wrongData: true, sourceContent: data };
            }
        } catch (error) {
            return null; // can't access clipboard
        }
    }
}
