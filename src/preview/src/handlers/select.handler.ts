import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class SelectHandler extends BaseHandler {
    readonly key = 'select';
    
    protected override executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        this.renderer.scrollTo(vm);
    }
}