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
}
