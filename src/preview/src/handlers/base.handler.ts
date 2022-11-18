import { Renderer } from './../renderer';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { MessageHandler } from "./message.handler";
import { ServiceLocator } from '../service-locator';

export abstract class BaseHandler implements MessageHandler {

    abstract readonly key: string;
    protected get renderer(): Renderer {
        return ServiceLocator.getRenderer();
    }

    execute(msg: BaseMessage, list: BlockViewModel[]): BlockViewModel[] {
        this.removePreviewElement();
        if (msg.template && msg.template.content) {
            const newList = msg.template.content.map(x => this.createViewModel(x));
            const listToRender = this.compareLists(newList, list);
            const newElements = this.renderer.syncList(listToRender);
            if (msg.model) {
                this.renderer.addPreview(this.createViewModel(msg.model));
            }
            return this.executeInternal(msg, listToRender, newElements);
        }
        return list;
    }

    protected compareLists(newList: BlockViewModel[], list: BlockViewModel[]): BlockViewModel[] {
        const result = [];
        for (let i = 0; i < newList.length; i++) {
            const vm = list.find(x => x.hash == newList[i].hash);
            if (vm) {
                result.push(vm);
            } else {
                result.push(newList[i]);
            }
        }
        return result;
    }

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel[]): BlockViewModel[] {
        return list;
    }

    protected removePreviewElement() {
        this.renderer.clearPreview();
    }

    protected createViewModel(source: any): BlockViewModel {
        const result = new BlockViewModel();
        result.hash = this.generateHash(source);
        result.source = source;
        return result;
    }

    protected generateHash(section: any) {
        const value = JSON.stringify(section);
        return this.hashValue(value);
    }

    protected hashValue(value: string) {
        let hash = 0;
        if (value.length == 0) return hash;
        for (let i = 0; i < value.length; i++) {
            let ch = value.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash;
        }
        return hash;
    }

    // execute(msg: BaseMessage, list: BlockViewModel[]) {

    //     this.removePreviewElement();

    //     if (msg.template) {

    //     }
    //     msg.template


    //     let vm = this.getViewModel(msg, list);
    //     if (!vm) {
    //         vm = this.createViewModel(msg.section);
    //     }
    //     this.executeInternal(msg, list, vm);
    // }

    // protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) { }

    // protected reloadBlock(model: any): Promise<string> {
    //     return ServiceLocator.getHttp().post(model);
    // }

    // protected generateHash(section: any) {
    //     const value = JSON.stringify(section);
    //     return this.hashValue(value);
    // }

    // protected createViewModel(content: any, isPreview = false): BlockViewModel {
    //     const result = new BlockViewModel();
    //     Object.assign(result, {
    //         hash: this.generateHash(content),
    //         source: content,
    //         element: null,
    //         isPreview: isPreview,
    //         htmlString: null
    //     });
    //     return result;
    // }

    // protected getViewModel(msg: BaseMessage, list: BlockViewModel[]): BlockViewModel {
    //     if (!!msg.section) {
    //         const hash = this.generateHash(msg.section);
    //         return list.find(x => x.hash === hash);
    //     }
    //     return null;
    // }

    // protected clearPreview(list: BlockViewModel[]) {
    //     const listToRemove = list.map((item, index) => <any>{ item, index }).filter(x => x.item.isPreview);
    //     listToRemove.forEach(x => {
    //         list.splice(x.index, 1);
    //         x.item.element.remove();
    //     });
    // }

    // protected hashValue(value: string) {
    //     let hash = 0;
    //     if (value.length == 0) return hash;
    //     for (let i = 0; i < value.length; i++) {
    //         let ch = value.charCodeAt(i);
    //         hash = ((hash << 5) - hash) + ch;
    //         hash = hash & hash;
    //     }
    //     return hash;
    // }
}