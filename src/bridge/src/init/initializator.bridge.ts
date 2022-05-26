import { Environment } from '../environment';
import { ServiceLocator } from '../service-locator';

export class Initializator {
    preStart() {
        const builderUrl = window.location.search.substring(1).split('&').find(q => q.startsWith('ep='));
        if (!!builderUrl) {
            Environment.DesignerUrl = builderUrl.substring(3);
        }

        // ServiceLocator.getPreviewInteractor().init();
    }

    postStart() {
        // todo: must be on preview onload event
        ServiceLocator.getBuilderMessages().loadComplete();
    }
}