import { BaseHandler } from "./base.handler";
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";

export class SwapHandler extends BaseHandler {
    readonly key = 'swap';

    execute(msg: BaseMessage, list: BlockViewModel[]) {
        if (msg.sectionIds?.length) {
            const delta = msg.currentIndex > msg.newIndex ? -1 : 0;

            let firstUntouchedElement: BlockViewModel | null = null;
            for (let i = msg.newIndex + delta; i >= 0; i--) {
                if (msg.sectionIds.indexOf(list[i].source.id) === -1) {
                    firstUntouchedElement = list[i];
                    break;
                }
            }

            // remove dragged elements
            const elementsToPaste = list.filter(x => msg.sectionIds.indexOf(x.source.id) !== -1);
            for (let i = 0; i < msg.sectionIds.length; i++) {
                const index = list.findIndex(x => x.source.id === msg.sectionIds[i]);
                const vm = list[index];
                list.splice(index, 1);
                vm.element.remove();
            }

            // insert dragged elements
            for (let i = elementsToPaste.length - 1; i >= 0; i--) {
                const vm = elementsToPaste[i];
                list.splice(msg.newIndex, 0, vm);
                this.renderer.insert(vm, msg.newIndex);
            }
        } else {
            const vm = list[msg.currentIndex];
            list.splice(msg.currentIndex, 1);
            list.splice(msg.newIndex, 0, vm);
            if (list[msg.currentIndex].element.parentElement === list[msg.newIndex].element.parentElement) {
                vm.element.remove();
                this.renderer.insert(vm, msg.newIndex);
            }
        }
    }
}