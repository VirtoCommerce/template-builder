import { MessageContent } from '../models';

export class MessagesService {

    constructor(private parentOrigin: string) { }

    loaded() {
        let name = window.location.search.substring(1).split('&').find(q => q.startsWith('name='));
        if (name) {
            name = name.substring(5);
        }
        this.send('loaded', { name });
    }

    renderComplete() {
        this.send('render-complete', null);
    }

    blockHover(model) {
        this.send('hover', { sectionId: model.id });
    }

    swapBlocks(args) {
        this.send('swap', { type: 'swap', ...args });
    }

    selectBlock(model: MessageContent) {
        this.send('select', model ? { sectionId: model.id } : null);
    }

    sendMessage(model) {
        this.send(model.type, model);
    }

    ping() {
        this.send('ping', null);
    }

    settings(model) {
        this.send('settings', { model });
    }

    private send(message: string, model) {
        const msg = { type: message, source: 'preview', ...model };
        // todo: only in debug mode
        if (message !== 'hover') {
            console.log('preview->builder:', msg)
        }
        window.parent.postMessage(msg, this.parentOrigin);
    }
}
