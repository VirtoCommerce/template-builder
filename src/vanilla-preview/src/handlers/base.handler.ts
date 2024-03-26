import { Renderer } from './../renderer';
import { BaseMessage, MessageContent } from "../models";
import { BlockViewModel } from "../block.view-model";
import { MessageHandler } from "./message.handler";
import { ServiceLocator } from '../service-locator';

export abstract class BaseHandler implements MessageHandler {

    abstract readonly key: string;
    protected get renderer(): Renderer {
        return ServiceLocator.getRenderer();
    }

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        let vm = this.getViewModel(msg.sectionId, list);
        if (!vm) {
            vm = this.createViewModel(msg);
        }
        this.executeInternal(msg, list, vm);
    }

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) { }

    protected reloadBlock(model: any): Promise<string> {
        return ServiceLocator.getHttp().post(model).catch((result) => {
            ServiceLocator.getMessages().sendMessage(result);
            return null;
        });
    }

    protected generateId(id: string) {
        if (id) {
            return `instance${id}`;
        }
        return 'preview-instance';
    }

    protected createViewModel(msg: BaseMessage, isPreview = false): BlockViewModel {
        const result = new BlockViewModel();
        Object.assign(result, {
            id: this.generateId(msg.section.id),
            source: msg.section,
            element: null,
            isPreview: isPreview,
            index: msg.index,
            htmlString: null,
            selected: false,
            hidden: !!msg.section.hidden
        });
        return result;
    }

    protected getViewModel(id: string, list: BlockViewModel[]): BlockViewModel {
        const internalId = this.generateId(id);
        return list.find(x => x.id === internalId);
    }

    protected deselectAll(list: BlockViewModel[]) {
        list.forEach(x => x.selected = false);
    }

    protected clearPreview(list: BlockViewModel[]) {
        const listToRemove = list.map((item, index) => <any>{ item, index }).filter(x => x.item.isPreview);
        listToRemove.forEach(x => {
            list.splice(x.index, 1);
            x.item.element.remove();
        });
    }
}