import { ServiceLocator } from './../service-locator';
import { BaseMessage } from "../models";
import { BlockViewModel } from "../block.view-model";
import { BaseHandler } from "../handlers/base.handler";

export class UpdateSectionHandler extends BaseHandler {
    readonly key = 'update-section';

    protected executeInternal(msg: BaseMessage) {
        try {
            // const template = msg.data.section;
            // const templateName = msg.data.templateName;
            // ServiceLocator.getMessages().updateSection(template, templateName);
            // msg.model.templates[0].name

            ServiceLocator.getPreviewInteractor().togglePreview();

        } catch (e) {
            console.log(e);
        }
    }


}
