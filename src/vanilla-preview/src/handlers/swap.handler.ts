import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class SwapHandler extends BaseHandler {
    readonly key = 'swap';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        const vm = list[msg.section.currentIndex];
        list.splice(msg.section.currentIndex, 1);
        list.splice(msg.section.newIndex, 0, vm);
        if (list[msg.section.currentIndex].element.parentElement === list[msg.section.newIndex].element.parentElement) {
            vm.element.remove();
            this.renderer.insert(vm, msg.section.newIndex);
        }
    }
}