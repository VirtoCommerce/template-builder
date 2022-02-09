import { ServiceLocator } from './../service-locator';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { BaseHandler } from "../handlers/base.handler";

export class PreviewLoadedHandler extends BaseHandler {
    readonly key = 'preview-loaded';

    protected executeInternal(msg: BaseMessage) {
        try {            
            ServiceLocator.getBuilderMessages().previewNavigated(msg.model?.templateName);
            // msg.model.templates[0].name
        } catch (e) {
            console.log(e);
            ServiceLocator.getBuilderMessages().previewNavigated('');
        }
    }


}
