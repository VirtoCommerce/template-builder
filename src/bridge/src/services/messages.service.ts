// import { MessageContent } from '../models';
// import { ServiceLocator } from '../service-locator';

// export class MessagesService {

//     constructor(private parentOrigin: string) { }

//     loadComplete() {
//         this.send('load-complete', null);
//     }

//     previewNavigated(template) {
//         this.send('template-changed', { template: template });
//     }

//     updateSection(section: any, templateName: string) {
//         this.sendToPreview('update-section', { section, templateName })
//     }

//     // renderComplete() {
//     //     this.send('render-complete', null);
//     // }

//     // blockHover(model) {
//     //     this.send('hover', { id: model.id });
//     // }

//     // swapBlocks(args) {
//     //     this.send('swap', { type: 'swap', ...args });
//     // }

//     // selectBlock(model: MessageContent) {
//     //     this.send('select', model ? { id: model.id } : null);
//     // }

//     // sendMessage(model) {
//     //     this.send(model.type, model);
//     // }

//     // ping() {
//     //     this.send('ping', null);
//     // }

//     // settings(model) {
//     //     this.send('settings', { model });
//     // }

//     private send(message: string, model: any) {
//         const msg = { type: message, ...model };
//         window.parent.postMessage(msg, this.parentOrigin);
//     }

//     private sendToPreview(message: string, model: any) {
//         const msg = { type: message, ...model };
//         const preview = <HTMLIFrameElement>document.getElementById('inner-preview');
//         preview.contentWindow.postMessage(msg, window.location.origin);
//     }
// }
