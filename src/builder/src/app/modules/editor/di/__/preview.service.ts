import { Injectable } from '@angular/core';

import { SectionModel } from '@core/models';

@Injectable({
    providedIn: 'root'
})
export class PreviewInteractionService {
    sectionChanged(section: SectionModel) {
        // const element = document.getElementById(frameId);
        // if (element != null) {
        //     const target = (<HTMLIFrameElement>element).contentWindow;
        //     if (!!target) {
        //         const message = { type: type, content: model };
        //         try {
        //             // todo: only in debug mode
        //             // console.log('builder->preview:', message)
        //             target.postMessage(message, this.appConfig.getValue('fullPreviewUrl'));
        //         } catch (error) {
        //             console.error('Preview unavailable. Reason: ', error);
        //         }
        //     }
        // }
    }
}


