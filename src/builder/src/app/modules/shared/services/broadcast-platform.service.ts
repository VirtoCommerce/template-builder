import { Injectable } from "@angular/core";
import { EventsBusService } from "@app/modules/core/services";
import { Store } from "@ngrx/store";

import * as actions from "@editor/store/actions";

@Injectable({
    providedIn: 'root'
})
export class BroadcastPlatformService {
    private channel = new BroadcastChannel('vc-module-content-channel');

    constructor(eventsBus: EventsBusService, private store: Store) {
        eventsBus.on(args => args.target === 'platform', (data: any) => {
            this.channel.postMessage(data.payload);
        });

        this.channel.onmessage = (event) => {
            this.store.dispatch(actions.getTemplatePublishStatusSuccess({
                templateKey: event.data.templateKey,
                hasChanges: event.data.hasChanges,
                published: event.data.published
            }));
        };
    }
}
