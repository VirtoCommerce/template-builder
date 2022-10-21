import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class CloneHandler extends BaseHandler {
    readonly key = 'clone';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        const source = this.getViewModel(msg.content.source, list);

        const model = { ...source.source, id: msg.content.destination };
        const clone = this.createViewModel(model);
        clone.htmlString = source.htmlString;
        clone.hidden = source.hidden;

        const index = list.indexOf(source);
        list.splice(index + 1, 0, clone);
        this.renderer.insert(clone, index + 1);
        setTimeout(() => {
            this.renderer.scrollTo(clone);
        }, 300);
    }
}