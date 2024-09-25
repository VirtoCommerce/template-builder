import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class SwapHandler extends BaseHandler {
    readonly key = 'swap';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        const vm = list[msg.currentIndex];
        list.splice(msg.currentIndex, 1);
        list.splice(msg.newIndex, 0, vm);
        if (list[msg.currentIndex].element.parentElement === list[msg.newIndex].element.parentElement) {
            vm.element.remove();
            this.renderer.insert(vm, msg.newIndex);
        }
    }
}