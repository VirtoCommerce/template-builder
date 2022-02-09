import { MessageContent } from '../models';
import { ServiceLocator } from '../service-locator';

export class PreviewMessagesService {

    updateSection(section: any, templateName: string) {
        this.send('update-section', { section, templateName })
    }

    private send(message: string, model: any) {
        const msg = { type: message, ...model };
        const preview = <HTMLIFrameElement>document.getElementById('inner-preview');
        preview.contentWindow.postMessage(msg, window.location.origin);
    }
}
