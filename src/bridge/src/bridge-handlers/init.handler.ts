import { ServiceLocator } from './../service-locator';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { BaseHandler } from "../handlers/base.handler";

export class InitPreviewHandler extends BaseHandler {
    readonly key = 'init-preview';

    protected executeInternal(msg: BaseMessage) {
        ServiceLocator.getPreviewInteractor().setIFrameUrl(msg.data.url);
    }


}
