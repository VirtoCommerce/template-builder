import { MessageContent } from '../models';
import { ServiceLocator } from '../service-locator';

export class BuilderMessagesService {

    constructor(private parentOrigin: string) { }

    loadComplete() {
        this.send('load-complete', null);
    }

    previewNavigated(template) {
        this.send('template-changed', { template: template });
    }

    private send(message: string, model: any) {
        const msg = { type: message, ...model };
        window.parent.postMessage(msg, this.parentOrigin);
    }
}
