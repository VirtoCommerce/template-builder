import { Injectable } from "@angular/core";
import { Clipboard } from '@angular/cdk/clipboard';

import { ClipboardModel } from '@core/models';

@Injectable({
    providedIn: 'root'
})
export class ClipboardService {
    constructor(private clipboard: Clipboard) { }

    copy(data: ClipboardModel) {
        this.clipboard.copy(JSON.stringify(data));
    }

    async getData(): Promise<ClipboardModel | null> {
        console.log(Date.now());
        try {
            const data = await navigator.clipboard.readText();
            if (!data) {
                return null;
            }
            const result = <ClipboardModel>JSON.parse(data);
            console.log(Date.now());
            return result;
        } catch (error) {
            return <ClipboardModel>{ wrongData: true };
        }
    }
}
