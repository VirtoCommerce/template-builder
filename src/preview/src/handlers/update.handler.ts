import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class UpdateHandler extends BaseHandler {
    readonly key = 'changed';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        vm.source = msg.section;
        this.reloadBlock(vm.source).then((result: string) => {
            if (result) {
                vm.htmlString = result;
                this.renderer.update(vm);
            }
            // var $: any = window['jQuery'];
            // $(".carousel-block").carousel();
        });
    }
}