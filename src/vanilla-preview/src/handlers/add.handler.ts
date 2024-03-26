import { ServiceLocator } from './../service-locator';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { BaseHandler } from "./base.handler";

export class AddHandler extends BaseHandler {
    readonly key = 'add';

    protected executeInternal(msg: BaseMessage, list: BlockViewModel[], vm: BlockViewModel) {
        this.clearPreview(list);
        const index = vm.index || null;
        if (index === null) {
            list.push(vm);
        } else {
            list.splice(index, 0, vm);
        }
        vm.selected = true;
        this.reloadBlock(vm.source).then(result => {
            vm.htmlString = result;
            if (index === null) {
                this.renderer.add(vm);
            } else {
                this.renderer.insert(vm, index);
            }
            this.renderer.select(vm);
        });
    }
}
